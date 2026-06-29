import { apiClient } from "../../api/apiClient";
import type {
  RagQueryRequest,
  RagQueryResponse,
} from "../../types/ai/rag.types";

export async function runRagQuery(
  payload: RagQueryRequest,
): Promise<RagQueryResponse> {
  const response = await apiClient.post<RagQueryResponse>("/rag/query", payload);
  return response.data;
}
