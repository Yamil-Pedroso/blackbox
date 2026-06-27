import { chromium } from "playwright";
import * as cheerio from "cheerio";
import axios from "axios";

const headers = {
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
    headers,
    timeout: 30000,
  });

  return extractWebsiteText(url, response.data);
}

async function scrapeDynamicWebsite(url: string) {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForTimeout(3000);

    return extractWebsiteText(url, await page.content());
  } finally {
    await browser.close();
  }
}

export async function scrapeWebsite(url: string) {
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

export async function fetchWebsiteContents(url: string): Promise<string> {
  const response = await axios.get(url, { headers });
  const $ = cheerio.load(response.data);
  const title = $("title").text() || "No title found";
  $("script, style, img, input").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  return (title + "\n\n" + text).slice(0, 2000);
}

export async function fetchWebsiteLinks(url: string): Promise<string[]> {
  const response = await axios.get(url, { headers });
  const $ = cheerio.load(response.data);
  const links: string[] = [];
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href) links.push(href);
  });
  return links;
}
