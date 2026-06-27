import { Router } from "express";
import {
  compareEmbeddingsController,
  generateEmbeddingController,
  groupEmbeddingsController,
  semanticSearchController,
} from "./embeddings.controller";

const router = Router();

router.post("/embeddings/generate", generateEmbeddingController);
router.post("/embeddings/compare", compareEmbeddingsController);
router.post("/embeddings/search", semanticSearchController);
router.post("/embeddings/group", groupEmbeddingsController);

export default router;
