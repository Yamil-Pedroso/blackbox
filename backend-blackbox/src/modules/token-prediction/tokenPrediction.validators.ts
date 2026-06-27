import { TokenPredictionDto } from "./tokenPrediction.dto";

const supportedModels = new Set([
  "educational-local",
  "gpt-4.1-mini",
  "gpt-4o-mini",
]);

export class TokenPredictionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenPredictionValidationError";
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TokenPredictionValidationError("Input must be an object");
  }

  return value as Record<string, unknown>;
}

export function validateTokenPredictionDto(
  value: unknown,
): TokenPredictionDto {
  const input = asRecord(value);

  if (typeof input.prompt !== "string" || !input.prompt.trim()) {
    throw new TokenPredictionValidationError(
      "prompt must be a non-empty string",
    );
  }

  if (input.prompt.length > 3_000) {
    throw new TokenPredictionValidationError(
      "prompt cannot exceed 3000 characters",
    );
  }

  const model =
    typeof input.model === "string" && input.model.trim()
      ? input.model.trim()
      : "educational-local";

  if (!supportedModels.has(model)) {
    throw new TokenPredictionValidationError(
      `model must be one of: ${Array.from(supportedModels).join(", ")}`,
    );
  }

  const topK =
    typeof input.topK === "string" ? Number(input.topK) : input.topK ?? 10;

  if (
    typeof topK !== "number" ||
    !Number.isInteger(topK) ||
    topK < 2 ||
    topK > 20
  ) {
    throw new TokenPredictionValidationError(
      "topK must be an integer between 2 and 20",
    );
  }

  return {
    prompt: input.prompt.trim(),
    model,
    topK,
  };
}
