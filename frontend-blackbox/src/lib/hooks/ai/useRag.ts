import axios from "axios";
import { useCallback, useState } from "react";
import { runRagQuery } from "../../../services/ai/ragService";
import type {
  RagQueryRequest,
  RagQueryResponse,
} from "../../../types/ai/rag.types";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data.error ??
      error.response?.data.message ??
      "RAG request failed"
    );
  }

  return error instanceof Error ? error.message : "RAG request failed";
}

export function useRagQuery() {
  const [data, setData] = useState<RagQueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (input: RagQueryRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await runRagQuery(input);
      setData(response);
      return response;
    } catch (requestError) {
      setData(null);
      setError(getErrorMessage(requestError));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, isLoading, error, execute, reset };
}
