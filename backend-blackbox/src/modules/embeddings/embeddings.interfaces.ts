import {
  EmbeddingsProviderName,
} from "./embeddings.types";

export interface EmbeddingsProvider {
  readonly name: EmbeddingsProviderName;
  readonly model: string;
  embed(texts: string[]): Promise<number[][]>;
}
