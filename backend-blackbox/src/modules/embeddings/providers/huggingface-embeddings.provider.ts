import axios from "axios";
import { env } from "../../../core/config/env";
import { EmbeddingsProvider } from "../embeddings.interfaces";

const DEFAULT_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

type HuggingFaceEmbeddingResponse = number[][] | number[][][];

function meanPool(tokenEmbeddings: number[][]): number[] {
  if (tokenEmbeddings.length === 0) {
    return [];
  }

  return tokenEmbeddings[0].map((_, dimension) => {
    const total = tokenEmbeddings.reduce(
      (sum, token) => sum + (token[dimension] ?? 0),
      0,
    );

    return total / tokenEmbeddings.length;
  });
}

export class HuggingFaceEmbeddingsProvider implements EmbeddingsProvider {
  readonly name = "huggingface" as const;
  readonly model = env.embeddings_model || DEFAULT_MODEL;

  async embed(texts: string[]): Promise<number[][]> {
    if (!env.hf_api_key) {
      throw new Error(
        "HF_API_KEY is required when EMBEDDINGS_PROVIDER=hugging-face",
      );
    }

    const response = await axios.post<HuggingFaceEmbeddingResponse>(
      `https://router.huggingface.co/hf-inference/models/${this.model}/pipeline/feature-extraction`,
      {
        inputs: texts,
        options: {
          wait_for_model: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${env.hf_api_key}`,
        },
        timeout: 60_000,
      },
    );

    const data = response.data;

    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error("Hugging Face returned an invalid embedding response");
    }

    if (typeof data[0][0] === "number") {
      return data as number[][];
    }

    return (data as number[][][]).map(meanPool);
  }
}
