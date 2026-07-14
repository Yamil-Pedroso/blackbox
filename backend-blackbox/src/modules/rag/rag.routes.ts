import { Router } from "express";
import { ragAssistantController, ragQueryController } from "./rag.controller";

const router = Router();

router.post("/rag/query", ragQueryController);
router.post("/rag/assistant", ragAssistantController);

export default router;
