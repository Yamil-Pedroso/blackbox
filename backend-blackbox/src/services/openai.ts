import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../config/config.env"),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
