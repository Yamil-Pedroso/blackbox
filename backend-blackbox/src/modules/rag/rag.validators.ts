import { RagQueryDto } from "./rag.dto";

export class RagValidationError extends Error {}

function assertText(value: unknown, field: string, minLength: number) {
  if (typeof value !== "string" || value.trim().length < minLength) {
    throw new RagValidationError(
      `${field} must be a string with at least ${minLength} characters`,
    );
  }

  return value.trim();
}

function numberInRange(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
  field: string,
) {
  const numberValue = typeof value === "number" ? value : fallback;

  if (!Number.isFinite(numberValue) || numberValue < min || numberValue > max) {
    throw new RagValidationError(`${field} must be between ${min} and ${max}`);
  }

  return Math.round(numberValue);
}

export function validateRagQueryDto(body: unknown): RagQueryDto {
  const payload = body as Record<string, unknown>;
  const sourceText = assertText(payload.sourceText, "sourceText", 120);
  const question = assertText(payload.question, "question", 8);
  const chunkSize = numberInRange(payload.chunkSize, 90, 40, 220, "chunkSize");
  const overlap = numberInRange(payload.overlap, 18, 0, 80, "overlap");
  const topK = numberInRange(payload.topK, 4, 1, 8, "topK");

  if (overlap >= chunkSize) {
    throw new RagValidationError("overlap must be smaller than chunkSize");
  }

  return {
    sourceText,
    question,
    sourceTitle:
      typeof payload.sourceTitle === "string" && payload.sourceTitle.trim()
        ? payload.sourceTitle.trim()
        : "Untitled source",
    chunkSize,
    overlap,
    topK,
  };
}
