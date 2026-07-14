import { apiClient } from "../../api/apiClient";
import type {
  RagAssistantRequest,
  RagAssistantResponse,
  RagQueryRequest,
  RagQueryResponse,
} from "../../types/ai/rag.types";

export async function runRagQuery(
  payload: RagQueryRequest,
): Promise<RagQueryResponse> {
  const response = await apiClient.post<RagQueryResponse>("/rag/query", payload);
  return response.data;
}

export async function runRagAssistant(
  payload: RagAssistantRequest,
): Promise<RagAssistantResponse> {
  const response = await apiClient.post<RagAssistantResponse>(
    "/rag/assistant",
    payload,
  );
  return response.data;
}
