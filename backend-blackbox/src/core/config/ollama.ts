import OpenAI from "openai";
import { chromium } from "playwright";
import * as cheerio from "cheerio";
import axios from "axios";
import { env } from "./env";

const ollama = new OpenAI({
  baseURL: env.ollama_base_url ?? "http://127.0.0.1:11434/v1",
  apiKey: "ollama",
});

const MODEL = env.ollama_model ?? "llama3.2";

const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
};

function extractWebsiteText(url: string, html: string) {
  const $ = cheerio.load(html);

  $("script, style, img, input, svg, iframe, noscript").remove();

  return {
    url,
    title: $("title").text().trim() || "Untitled",
    text: $("body").text().replace(/\s+/g, " ").trim(),
  };
}

async function scrapeStaticWebsite(url: string) {
  const response = await axios.get<string>(url, {
    headers: browserHeaders,
    timeout: 30000,
  });

  return extractWebsiteText(url, response.data);
}

async function scrapeDynamicWebsite(url: string) {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForTimeout(1000);

    return extractWebsiteText(url, await page.content());
  } finally {
    await browser.close();
  }
}

async function scrapeWebsite(url: string) {
  try {
    const staticWebsite = await scrapeStaticWebsite(url);

    if (staticWebsite.text.length > 200) {
      return staticWebsite;
    }

    return await scrapeDynamicWebsite(url);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Executable doesn't exist")
    ) {
      throw new Error(
        "Playwright browser is not installed. Static scraping failed or returned too little content. Run `npx playwright install chromium` inside backend-blackbox for dynamic sites.",
      );
    }

    throw error;
  }
}

export async function summarizeWebsite(url: string) {
  const startedAt = performance.now();

  console.log("Ollama route hit:", url);

  const website = await scrapeWebsite(url);

  console.log("Scrape completed:", {
    title: website.title,
    textLength: website.text.length,
  });

  const response = await ollama.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `
You are an expert website summarizer.

Create:
- A short overview
- Key points
- Main purpose of the website

Keep the answer concise and professional.
        `,
      },
      {
        role: "user",
        content: `
URL: ${website.url}
Title: ${website.title}

Website Content:
${website.text.slice(0, 3000)}
        `,
      },
    ],
    max_tokens: 250,
    temperature: 0.3,
  });

  const finishedAt = performance.now();

  return {
    url: website.url,
    title: website.title,
    content: website.text.slice(0, 3000),
    summarizedWebsite: response.choices[0].message.content,
    metrics: {
      model: MODEL,
      durationMs: Math.round(finishedAt - startedAt),
      promptTokens: response.usage?.prompt_tokens ?? null,
      completionTokens: response.usage?.completion_tokens ?? null,
      totalTokens: response.usage?.total_tokens ?? null,
    },
  };
}
