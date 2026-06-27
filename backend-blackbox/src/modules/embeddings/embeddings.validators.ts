import {
  CompareEmbeddingsDto,
  GenerateEmbeddingDto,
  GroupEmbeddingsDto,
  SemanticSearchDto,
} from "./embeddings.dto";

const MAX_TEXT_LENGTH = 5_000;
const MAX_COLLECTION_SIZE = 50;

export class EmbeddingsValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmbeddingsValidationError";
  }
}

function asBody(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new EmbeddingsValidationError("Request body must be an object");
  }

  return value as Record<string, unknown>;
}

function requiredText(
  body: Record<string, unknown>,
  field: string,
): string {
  const value = body[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new EmbeddingsValidationError(`${field} must be a non-empty string`);
  }

  if (value.length > MAX_TEXT_LENGTH) {
    throw new EmbeddingsValidationError(
      `${field} cannot exceed ${MAX_TEXT_LENGTH} characters`,
    );
  }

  return value.trim();
}

function requiredTextArray(
  body: Record<string, unknown>,
  field: string,
  minimumItems: number,
): string[] {
  const value = body[field];

  if (!Array.isArray(value)) {
    throw new EmbeddingsValidationError(`${field} must be an array`);
  }

  if (value.length < minimumItems) {
    throw new EmbeddingsValidationError(
      `${field} must contain at least ${minimumItems} items`,
    );
  }

  if (value.length > MAX_COLLECTION_SIZE) {
    throw new EmbeddingsValidationError(
      `${field} cannot contain more than ${MAX_COLLECTION_SIZE} items`,
    );
  }

  return value.map((item, index) => {
    if (typeof item !== "string" || !item.trim()) {
      throw new EmbeddingsValidationError(
        `${field}[${index}] must be a non-empty string`,
      );
    }

    if (item.length > MAX_TEXT_LENGTH) {
      throw new EmbeddingsValidationError(
        `${field}[${index}] cannot exceed ${MAX_TEXT_LENGTH} characters`,
      );
    }

    return item.trim();
  });
}

export function validateGenerateEmbeddingDto(
  body: unknown,
): GenerateEmbeddingDto {
  const data = asBody(body);
  return { text: requiredText(data, "text") };
}

export function validateCompareEmbeddingsDto(
  body: unknown,
): CompareEmbeddingsDto {
  const data = asBody(body);

  return {
    textA: requiredText(data, "textA"),
    textB: requiredText(data, "textB"),
  };
}

export function validateSemanticSearchDto(
  body: unknown,
): SemanticSearchDto {
  const data = asBody(body);

  return {
    query: requiredText(data, "query"),
    documents: requiredTextArray(data, "documents", 1),
  };
}

export function validateGroupEmbeddingsDto(
  body: unknown,
): GroupEmbeddingsDto {
  const data = asBody(body);
  return { texts: requiredTextArray(data, "texts", 2) };
}
