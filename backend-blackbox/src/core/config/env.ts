import dotenv from "dotenv";

dotenv.config();

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  app: {
    port: Number(process.env.PORT ?? 3010),
    nodeEnv: process.env.NODE_ENV ?? "development",
  },

  database: {
    mongoUri: required(process.env.MONGO_URI, "MONGO_URI"),
  },

  stripe: {
    secretKey: required(process.env.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY"),
    webhookSecret: required(
      process.env.STRIPE_WEBHOOK_SECRET,
      "STRIPE_WEBHOOK_SECRET",
    ),
    successUrl: required(process.env.STRIPE_SUCCESS_URL, "STRIPE_SUCCESS_URL"),
    cancelUrl: required(process.env.STRIPE_CANCEL_URL, "STRIPE_CANCEL_URL"),
  },

  openai: {
    apiKey: required(process.env.OPENAI_API_KEY, "OPENAI_API_KEY"),
  },
};
