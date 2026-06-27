import OpenAI from "openai";
import { env } from "./env";

export const openai = new OpenAI({
  apiKey: env.openai.apiKey,
});

export const openaiLLM = new OpenAI({
  apiKey: env.openai_api_key_llm,
});
