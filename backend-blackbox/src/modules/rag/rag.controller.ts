import { Request, Response } from "express";
import { runRagQuery } from "./rag.service";
import { RagValidationError, validateRagQueryDto } from "./rag.validators";

export async function ragQueryController(req: Request, res: Response) {
  try {
    const dto = validateRagQueryDto(req.body);
    return res.status(200).json(await runRagQuery(dto));
  } catch (error) {
    if (error instanceof RagValidationError) {
      return res.status(400).json({
        message: "Invalid RAG request",
        error: error.message,
      });
    }

    console.error("RAG query error:", error);

    return res.status(500).json({
      message: "Failed to run RAG query",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
