import {
  GenerateTokenInferenceDto,
  TokenizeTextDto,
} from "./tokenInference.dto";

export class TokenInferenceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenInferenceValidationError";
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TokenInferenceValidationError(
      "Input must be an object",
    );
  }

  return value as Record<string, unknown>;
}

function requiredText(
  input: Record<string, unknown>,
  field: string,
): string {
  const value = input[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new TokenInferenceValidationError(
      `${field} must be a non-empty string`,
    );
  }

  if (value.length > 5_000) {
    throw new TokenInferenceValidationError(
      `${field} cannot exceed 5000 characters`,
    );
  }

  return value.trim();
}

function numberSetting(
  input: Record<string, unknown>,
  field: string,
  fallback: number,
  minimum: number,
  maximum: number,
): number {
  const rawValue = input[field];

  if (rawValue === undefined || rawValue === "") {
    return fallback;
  }

  const value =
    typeof rawValue === "string" ? Number(rawValue) : rawValue;

  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < minimum ||
    value > maximum
  ) {
    throw new TokenInferenceValidationError(
      `${field} must be between ${minimum} and ${maximum}`,
    );
  }

  return value;
}

export function validateGenerateTokenInferenceDto(
  value: unknown,
): GenerateTokenInferenceDto {
  const input = asRecord(value);
  const maxNewTokens = numberSetting(
    input,
    "maxNewTokens",
    80,
    1,
    1_000,
  );

  if (!Number.isInteger(maxNewTokens)) {
    throw new TokenInferenceValidationError(
      "maxNewTokens must be an integer",
    );
  }

  return {
    prompt: requiredText(input, "prompt"),
    maxNewTokens,
    temperature: numberSetting(input, "temperature", 0.7, 0, 2),
    topP: numberSetting(input, "topP", 0.95, 0, 1),
  };
}

export function validateTokenizeTextDto(value: unknown): TokenizeTextDto {
  const input = asRecord(value);
  return { text: requiredText(input, "text") };
}
