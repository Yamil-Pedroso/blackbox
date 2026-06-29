import express from "express";
import cors from "cors";

import openaiRoutes from "./modules/openai/openai.routes";
import ollamaRoutes from "./modules/ollama/ollama.routes";
import MultimodalSdkAiRoutes from "./modules/multimodal-sdk-ai/multimodal_sdk_ai.routes";
import PipelinesRoutes from "./modules/pipelines/pipelines.routes";
import TokenizerRoutes from "./modules/tokenizer/tokenizer.routes";
import TransformersRoutes from "./modules/transformers/transformers.routes";
import quantizationRoutes from "./modules/quantization/quantization.routes";
import EmbeddingsRoutes from "./modules/embeddings/embeddings.routes";
import TokenInferenceRoutes from "./modules/token-inference/tokenInference.routes";
import TokenPredictionRoutes from "./modules/token-prediction/tokenPrediction.routes";
import RagRoutes from "./modules/rag/rag.routes";
import bookingAppRoutes from "./modules/booking-app/index";
import aiPaletteRoutes from "./modules/ai/ai-palette/ai-palette.routes";
import aiImagePaletteRoutes from "./modules/ai/ai-image-palette/ai-image-palette.routes";

import { env } from "./core/config/env";

export const app = express();

const allowedOrigins = env.cors_origins
  .split(",")
  .map((origin) => origin.trim());

// 1. CORS una sola vez
app.use(
  cors({
    origin(origin, callback) {
      console.log("CORS Origin received:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);

// 2. Stripe webhook ANTES de express.json()
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// 3. JSON parser para todas las demás rutas
app.use(express.json());

// 4. Routes
app.use("/api/v1", openaiRoutes);
app.use("/api/v1", ollamaRoutes);
app.use("/api/v1", MultimodalSdkAiRoutes);
app.use("/api/v1", PipelinesRoutes);
app.use("/api/v1", TokenizerRoutes);
app.use("/api/v1", TransformersRoutes);
app.use("/api/v1", quantizationRoutes);
app.use("/api/v1", EmbeddingsRoutes);
app.use("/api/v1", TokenInferenceRoutes);
app.use("/api/v1", TokenPredictionRoutes);
app.use("/api/v1", RagRoutes);

app.use("/api", bookingAppRoutes);
app.use("/api/ai", aiPaletteRoutes);
app.use("/api/ai", aiImagePaletteRoutes);

// 5. Health/test route
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from the backend!" });
});
