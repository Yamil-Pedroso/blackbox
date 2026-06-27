export type EmbeddingsProviderName =
  | "local"
  | "huggingface"
  | "openai"
  | "ollama"
  | "transformers-js";

export interface EmbeddingProviderMetadata {
  provider: EmbeddingsProviderName;
  model: string;
  dimensions: number;
}

export interface GenerateEmbeddingResponse extends EmbeddingProviderMetadata {
  text: string;
  embedding: number[];
}

export interface CompareEmbeddingsResponse
  extends EmbeddingProviderMetadata {
  textA: string;
  textB: string;
  similarity: number;
  meaning: string;
}

export interface SemanticSearchResult {
  text: string;
  similarity: number;
  rank: number;
}

export interface SemanticSearchResponse extends EmbeddingProviderMetadata {
  query: string;
  results: SemanticSearchResult[];
}

export interface EmbeddingGroup {
  topic: string;
  items: Array<{
    text: string;
    similarityToGroup: number;
  }>;
}

export interface GroupEmbeddingsResponse extends EmbeddingProviderMetadata {
  groups: EmbeddingGroup[];
}
