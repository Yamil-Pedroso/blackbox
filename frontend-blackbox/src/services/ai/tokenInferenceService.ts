import { apiClient } from "../../api/apiClient";
import type {
  GenerateTokenInferenceRequest,
  GenerateTokenInferenceResponse,
  TokenizeTextRequest,
  TokenizeTextResponse,
  TokenStreamDoneEvent,
  TokenStreamEvent,
} from "../../types/ai/tokenInference.types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3010/api/v1";

export async function generateTokenInference(
  payload: GenerateTokenInferenceRequest,
): Promise<GenerateTokenInferenceResponse> {
  const response = await apiClient.post<GenerateTokenInferenceResponse>(
    "/token-inference/generate",
    payload,
  );
  return response.data;
}

export async function tokenizeInferenceText(
  payload: TokenizeTextRequest,
): Promise<TokenizeTextResponse> {
  const response = await apiClient.post<TokenizeTextResponse>(
    "/token-inference/tokenize",
    payload,
  );
  return response.data;
}

interface StreamHandlers {
  onToken: (event: TokenStreamEvent) => void;
  onDone: (event: TokenStreamDoneEvent) => void;
  onError: (message: string) => void;
}

export function openTokenInferenceStream(
  payload: GenerateTokenInferenceRequest,
  handlers: StreamHandlers,
): EventSource {
  const query = new URLSearchParams({
    prompt: payload.prompt,
    maxNewTokens: String(payload.maxNewTokens),
    temperature: String(payload.temperature),
    topP: String(payload.topP),
  });
  const eventSource = new EventSource(
    `${API_BASE_URL}/token-inference/stream?${query.toString()}`,
  );

  eventSource.addEventListener("token", (event) => {
    handlers.onToken(
      JSON.parse((event as MessageEvent<string>).data) as TokenStreamEvent,
    );
  });

  eventSource.addEventListener("done", (event) => {
    handlers.onDone(
      JSON.parse((event as MessageEvent<string>).data) as TokenStreamDoneEvent,
    );
    eventSource.close();
  });

  eventSource.addEventListener("error", (event) => {
    const messageEvent = event as MessageEvent<string>;
    let message = "Token stream connection failed";

    if (typeof messageEvent.data === "string" && messageEvent.data) {
      try {
        const payload = JSON.parse(messageEvent.data) as {
          message?: string;
        };
        message = payload.message ?? message;
      } catch {
        message = messageEvent.data;
      }
    }

    handlers.onError(message);
    eventSource.close();
  });

  return eventSource;
}
