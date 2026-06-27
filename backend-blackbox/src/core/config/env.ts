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

  database_llm: {
    mongoUri: required(process.env.MONGODB_URI_LLM, "MONGODB_URI_LLM"),
  },

  postgres_host: required(process.env.POSTGRES_HOST, "POSTGRES_HOST"),
  postgres_port: Number(required(process.env.POSTGRES_PORT, "POSTGRES_PORT")),
  postgres_user: required(process.env.POSTGRES_USER, "POSTGRES_USER"),
  postgres_password: required(
    process.env.POSTGRES_PASSWORD,
    "POSTGRES_PASSWORD",
  ),
  postgres_database: required(process.env.POSTGRES_DB, "POSTGRES_DB"),

  node_env: process.env.NODE_ENV || "development",
  client_url: required(process.env.CLIENT_URL, "CLIENT_URL"),

  openai_api_key_llm: required(
    process.env.OPENAI_API_KEY_LLM,
    "OPENAI_API_KEY_LLM",
  ),

  hf_api_key: required(process.env.HF_API_KEY, "HF_API_KEY"),

  pipeline_provider: required(
    process.env.PIPELINE_PROVIDER,
    "PIPELINE_PROVIDER",
  ),

  embeddings_provider: required(
    process.env.EMBEDDINGS_PROVIDER,
    "EMBEDDINGS_PROVIDER",
  ),

  embeddings_model: required(process.env.EMBEDDINGS_MODEL, "EMBEDDINGS_MODEL"),

  token_inference_provider: required(
    process.env.TOKEN_INFERENCE_PROVIDER,
    "TOKEN_INFERENCE_PROVIDER",
  ),

  token_inference_model: required(
    process.env.TOKEN_INFERENCE_MODEL,
    "TOKEN_INFERENCE_MODEL",
  ),

  token_prediction_provider: required(
    process.env.TOKEN_PREDICTION_PROVIDER,
    "TOKEN_PREDICTION_PROVIDER",
  ),

  ollama_base_url: required(process.env.OLLAMA_BASE_URL, "OLLAMA_BASE_URL"),
  ollama_model: required(process.env.OLLAMA_MODEL, "OLLAMA_MODEL"),
};
