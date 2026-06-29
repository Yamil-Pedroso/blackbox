import { Router } from "express";
import { ragQueryController } from "./rag.controller";

const router = Router();

router.post("/rag/query", ragQueryController);

export default router;
