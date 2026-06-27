import { Request, Response } from "express";
import {
  compareEmbeddings,
  generateEmbedding,
  groupEmbeddings,
  semanticSearch,
} from "./embeddings.service";
import {
  EmbeddingsValidationError,
  validateCompareEmbeddingsDto,
  validateGenerateEmbeddingDto,
  validateGroupEmbeddingsDto,
  validateSemanticSearchDto,
} from "./embeddings.validators";

function sendEmbeddingsError(
  res: Response,
  error: unknown,
  message: string,
) {
  if (error instanceof EmbeddingsValidationError) {
    return res.status(400).json({
      message: "Invalid embeddings request",
      error: error.message,
    });
  }

  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";
  console.error(`${message}:`, error);

  return res.status(500).json({
    message,
    error: errorMessage,
  });
}

export async function generateEmbeddingController(
  req: Request,
  res: Response,
) {
  try {
    const dto = validateGenerateEmbeddingDto(req.body);
    return res.status(200).json(await generateEmbedding(dto));
  } catch (error) {
    return sendEmbeddingsError(res, error, "Failed to generate embedding");
  }
}

export async function compareEmbeddingsController(
  req: Request,
  res: Response,
) {
  try {
    const dto = validateCompareEmbeddingsDto(req.body);
    return res.status(200).json(await compareEmbeddings(dto));
  } catch (error) {
    return sendEmbeddingsError(res, error, "Failed to compare embeddings");
  }
}

export async function semanticSearchController(req: Request, res: Response) {
  try {
    const dto = validateSemanticSearchDto(req.body);
    return res.status(200).json(await semanticSearch(dto));
  } catch (error) {
    return sendEmbeddingsError(res, error, "Failed to run semantic search");
  }
}

export async function groupEmbeddingsController(req: Request, res: Response) {
  try {
    const dto = validateGroupEmbeddingsDto(req.body);
    return res.status(200).json(await groupEmbeddings(dto));
  } catch (error) {
    return sendEmbeddingsError(res, error, "Failed to group embeddings");
  }
}
