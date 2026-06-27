import { Router } from "express";
import {
  transformerDemoController,
  transformerExplainController,
} from "./transformers.controller";

const router = Router();

router.post("/transformers/explain", transformerExplainController);
router.post("/transformers/demo", transformerDemoController);

export default router;
