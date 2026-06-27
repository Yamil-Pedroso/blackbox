export type EmbeddingsProviderName =
  | "local"
  | "huggingface"
  | "openai"
  | "ollama"
  | "transformers-js";

export interface EmbeddingMetadata {
  provider: EmbeddingsProviderName;
  model: string;
  dimensions: number;
}

export interface GenerateEmbeddingRequest {
  text: string;
}

export interface GenerateEmbeddingResponse extends EmbeddingMetadata {
  text: string;
  embedding: number[];
}

export interface CompareEmbeddingsRequest {
  textA: string;
  textB: string;
}

export interface CompareEmbeddingsResponse extends EmbeddingMetadata {
  textA: string;
  textB: string;
  similarity: number;
  meaning: string;
}

export interface SemanticSearchRequest {
  query: string;
  documents: string[];
}

export interface SemanticSearchResponse extends EmbeddingMetadata {
  query: string;
  results: Array<{
    text: string;
    similarity: number;
    rank: number;
  }>;
}

export interface GroupEmbeddingsRequest {
  texts: string[];
}

export interface GroupEmbeddingsResponse extends EmbeddingMetadata {
  groups: Array<{
    topic: string;
    items: Array<{
      text: string;
      similarityToGroup: number;
    }>;
  }>;
}
