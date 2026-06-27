import { Request, Response } from "express";
import {
  buildPredictionPath,
  buildPredictionTree,
  predictTokens,
} from "./tokenPrediction.service";
import {
  TokenPredictionValidationError,
  validateTokenPredictionDto,
} from "./tokenPrediction.validators";

function sendError(res: Response, error: unknown, message: string) {
  if (error instanceof TokenPredictionValidationError) {
    return res.status(400).json({
      message: "Invalid token prediction request",
      error: error.message,
    });
  }

  console.error(`${message}:`, error);
  return res.status(500).json({
    message,
    error:
      error instanceof Error
        ? error.message
        : "An unexpected error occurred",
  });
}

export async function predictTokensController(req: Request, res: Response) {
  try {
    const dto = validateTokenPredictionDto(req.body);
    return res.status(200).json(await predictTokens(dto));
  } catch (error) {
    return sendError(res, error, "Failed to predict tokens");
  }
}

export async function predictionTreeController(req: Request, res: Response) {
  try {
    const dto = validateTokenPredictionDto(req.body);
    return res.status(200).json(await buildPredictionTree(dto));
  } catch (error) {
    return sendError(res, error, "Failed to build prediction tree");
  }
}

export async function predictionPathController(req: Request, res: Response) {
  try {
    const dto = validateTokenPredictionDto(req.body);
    return res.status(200).json(await buildPredictionPath(dto));
  } catch (error) {
    return sendError(res, error, "Failed to build prediction path");
  }
}
