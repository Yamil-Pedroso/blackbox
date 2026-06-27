import { Router } from "express";
import {
  predictionPathController,
  predictionTreeController,
  predictTokensController,
} from "./tokenPrediction.controller";

const router = Router();

router.post("/token-prediction/predict", predictTokensController);
router.post("/token-prediction/tree", predictionTreeController);
router.post("/token-prediction/path", predictionPathController);

export default router;
