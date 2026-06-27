import { Router } from "express";
import {
  generateTokenInferenceController,
  streamTokenInferenceController,
  tokenizeTextController,
} from "./tokenInference.controller";

const router = Router();

router.post("/token-inference/generate", generateTokenInferenceController);
router.get("/token-inference/stream", streamTokenInferenceController);
router.post("/token-inference/tokenize", tokenizeTextController);

export default router;
