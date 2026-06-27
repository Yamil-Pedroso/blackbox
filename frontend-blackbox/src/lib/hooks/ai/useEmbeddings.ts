import axios from "axios";
import { useCallback, useState } from "react";
import {
  compareEmbeddings,
  generateEmbedding,
  groupEmbeddings,
  semanticSearch,
} from "../../../services/ai/embeddingsService";
import type {
  CompareEmbeddingsRequest,
  CompareEmbeddingsResponse,
  GenerateEmbeddingRequest,
  GenerateEmbeddingResponse,
  GroupEmbeddingsRequest,
  GroupEmbeddingsResponse,
  SemanticSearchRequest,
  SemanticSearchResponse,
} from "../../../types/ai/embeddings.types";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data.error ??
      error.response?.data.message ??
      "Embeddings request failed"
    );
  }

  return error instanceof Error ? error.message : "Embeddings request failed";
}

function useEmbeddingOperation<TInput, TResult>(
  request: (input: TInput) => Promise<TResult>,
) {
  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await request(input);
        setData(response);
        return response;
      } catch (requestError) {
        setData(null);
        setError(getErrorMessage(requestError));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [request],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, isLoading, error, execute, reset };
}

export function useGenerateEmbedding() {
  return useEmbeddingOperation<
    GenerateEmbeddingRequest,
    GenerateEmbeddingResponse
  >(generateEmbedding);
}

export function useCompareEmbeddings() {
  return useEmbeddingOperation<
    CompareEmbeddingsRequest,
    CompareEmbeddingsResponse
  >(compareEmbeddings);
}

export function useSemanticSearch() {
  return useEmbeddingOperation<SemanticSearchRequest, SemanticSearchResponse>(
    semanticSearch,
  );
}

export function useGroupEmbeddings() {
  return useEmbeddingOperation<GroupEmbeddingsRequest, GroupEmbeddingsResponse>(
    groupEmbeddings,
  );
}
