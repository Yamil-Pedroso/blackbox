import {
  TransformerDemoDto,
  TransformerExplainDto,
  TransformerTopic,
} from "./transformers.dto";

const topics: TransformerTopic[] = [
  "transformer",
  "llm-flow",
  "encoder-decoder",
  "self-attention",
  "multi-head-attention",
  "positional-encoding",
  "feed-forward-network",
  "add-and-norm",
  "token-prediction",
];

function asBody(value: unknown) {
  if (!value || typeof value !== "object") {
    throw new Error("Request body must be an object");
  }

  return value as Record<string, unknown>;
}

function requiredString(body: Record<string, unknown>, field: string) {
  const value = body[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} is required`);
  }

  return value.trim();
}

export function validateTransformerExplainDto(
  body: unknown,
): TransformerExplainDto {
  const data = asBody(body);
  const topic = requiredString(data, "topic");

  if (!topics.includes(topic as TransformerTopic)) {
    throw new Error(`topic must be one of: ${topics.join(", ")}`);
  }

  return { topic: topic as TransformerTopic };
}

export function validateTransformerDemoDto(body: unknown): TransformerDemoDto {
  const data = asBody(body);
  const prompt = requiredString(data, "prompt");

  if (prompt.length > 280) {
    throw new Error("prompt must be 280 characters or fewer");
  }

  return {
    prompt,
    model: typeof data.model === "string" ? data.model.trim() : undefined,
  };
}
