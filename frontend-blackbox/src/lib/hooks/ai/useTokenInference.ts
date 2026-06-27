import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  generateTokenInference,
  openTokenInferenceStream,
  tokenizeInferenceText,
} from "../../../services/ai/tokenInferenceService";
import type {
  GenerateTokenInferenceRequest,
  GenerateTokenInferenceResponse,
  TokenizeTextRequest,
  TokenizeTextResponse,
  TokenStreamDoneEvent,
} from "../../../types/ai/tokenInference.types";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data.error ??
      error.response?.data.message ??
      "Token inference request failed"
    );
  }

  return error instanceof Error
    ? error.message
    : "Token inference request failed";
}

function useTokenInferenceRequest<TInput, TResult>(
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

  const clear = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, isLoading, error, execute, clear };
}

export function useGenerateTokenInference() {
  return useTokenInferenceRequest<
    GenerateTokenInferenceRequest,
    GenerateTokenInferenceResponse
  >(generateTokenInference);
}

export function useTokenizeText() {
  return useTokenInferenceRequest<TokenizeTextRequest, TokenizeTextResponse>(
    tokenizeInferenceText,
  );
}

export function useTokenInferenceStream() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [fullText, setFullText] = useState("");
  const [metadata, setMetadata] = useState<TokenStreamDoneEvent | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const stop = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    setIsStreaming(false);
  }, []);

  useEffect(() => stop, [stop]);

  const start = useCallback(
    (input: GenerateTokenInferenceRequest) => {
      stop();
      setTokens([]);
      setFullText("");
      setMetadata(null);
      setError(null);
      setIsStreaming(true);

      eventSourceRef.current = openTokenInferenceStream(input, {
        onToken: (event) => {
          setTokens((currentTokens) => [...currentTokens, event.token]);
          setFullText((currentText) => currentText + event.token);
        },
        onDone: (event) => {
          setFullText(event.fullText);
          setMetadata(event);
          setIsStreaming(false);
          eventSourceRef.current = null;
        },
        onError: (message) => {
          setError(message);
          setIsStreaming(false);
          eventSourceRef.current = null;
        },
      });
    },
    [stop],
  );

  const clear = useCallback(() => {
    stop();
    setTokens([]);
    setFullText("");
    setMetadata(null);
    setError(null);
  }, [stop]);

  return {
    tokens,
    fullText,
    metadata,
    isStreaming,
    error,
    start,
    stop,
    clear,
  };
}
