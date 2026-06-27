export interface GenerateEmbeddingDto {
  text: string;
}

export interface CompareEmbeddingsDto {
  textA: string;
  textB: string;
}

export interface SemanticSearchDto {
  query: string;
  documents: string[];
}

export interface GroupEmbeddingsDto {
  texts: string[];
}
