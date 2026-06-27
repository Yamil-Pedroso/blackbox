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
import bookingAppRoutes from "./modules/booking-app/index";
import aiPaletteRoutes from "./modules/ai/ai-palette/ai-palette.routes";
import aiImagePaletteRoutes from "./modules/ai/ai-image-palette/ai-image-palette.routes";
export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://blackbox-one-olive.vercel.app",
];

// 🔥 1️⃣ STRIPE WEBHOOK FIRST (raw body)
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// 2️⃣ CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// 3️⃣ JSON parser AFTER webhook
app.use(express.json());

// 4️⃣ Routes
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
app.use("/api", TransformersRoutes);
app.use("/api", bookingAppRoutes);
app.use("/api/ai", aiPaletteRoutes);
app.use("/api/ai", aiImagePaletteRoutes);
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
