import { Request, Response } from "express";
import { explainTransformer, runTransformerDemo } from "./transformers.service";
import {
  validateTransformerDemoDto,
  validateTransformerExplainDto,
} from "./transformers.validators";

function sendTransformerError(res: Response, error: unknown, message: string) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const isValidationError =
    errorMessage.includes("required") ||
    errorMessage.includes("must be") ||
    errorMessage.includes("Request body");

  return res.status(isValidationError ? 400 : 500).json({
    message,
    error: errorMessage,
  });
}

export async function transformerExplainController(
  req: Request,
  res: Response,
) {
  try {
    const dto = validateTransformerExplainDto(req.body);
    return res.json(await explainTransformer(dto));
  } catch (error) {
    console.error("Transformer explain error:", error);
    return sendTransformerError(res, error, "Failed to explain transformer topic");
  }
}

export async function transformerDemoController(req: Request, res: Response) {
  try {
    const dto = validateTransformerDemoDto(req.body);
    return res.json(await runTransformerDemo(dto));
  } catch (error) {
    console.error("Transformer demo error:", error);
    return sendTransformerError(res, error, "Failed to run transformer demo");
  }
}
