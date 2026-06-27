import axios from "axios";
import { useCallback, useState } from "react";
import {
  fetchPredictionPath,
  fetchPredictionTree,
  predictTokens,
} from "../../../services/ai/tokenPredictionService";
import type {
  PredictionPathResponse,
  PredictionTreeResponse,
  TokenPredictionRequest,
  TokenPredictionResponse,
} from "../../../types/ai/tokenPrediction.types";

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data.error ??
      error.response?.data.message ??
      "Token prediction request failed"
    );
  }

  return error instanceof Error
    ? error.message
    : "Token prediction request failed";
}

function usePredictionRequest<TResult>(
  request: (input: TokenPredictionRequest) => Promise<TResult>,
) {
  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (input: TokenPredictionRequest) => {
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

  const clear = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, isLoading, error, execute, clear };
}

export function useTokenPrediction() {
  return usePredictionRequest<TokenPredictionResponse>(predictTokens);
}

export function usePredictionTree() {
  return usePredictionRequest<PredictionTreeResponse>(fetchPredictionTree);
}

export function usePredictionPath() {
  return usePredictionRequest<PredictionPathResponse>(fetchPredictionPath);
}
