import { apiClient } from "../../api/apiClient";
import type {
  CompareEmbeddingsRequest,
  CompareEmbeddingsResponse,
  GenerateEmbeddingRequest,
  GenerateEmbeddingResponse,
  GroupEmbeddingsRequest,
  GroupEmbeddingsResponse,
  SemanticSearchRequest,
  SemanticSearchResponse,
} from "../../types/ai/embeddings.types";

export async function generateEmbedding(
  payload: GenerateEmbeddingRequest,
): Promise<GenerateEmbeddingResponse> {
  const response = await apiClient.post<GenerateEmbeddingResponse>(
    "/embeddings/generate",
    payload,
  );
  return response.data;
}

export async function compareEmbeddings(
  payload: CompareEmbeddingsRequest,
): Promise<CompareEmbeddingsResponse> {
  const response = await apiClient.post<CompareEmbeddingsResponse>(
    "/embeddings/compare",
    payload,
  );
  return response.data;
}

export async function semanticSearch(
  payload: SemanticSearchRequest,
): Promise<SemanticSearchResponse> {
  const response = await apiClient.post<SemanticSearchResponse>(
    "/embeddings/search",
    payload,
  );
  return response.data;
}

export async function groupEmbeddings(
  payload: GroupEmbeddingsRequest,
): Promise<GroupEmbeddingsResponse> {
  const response = await apiClient.post<GroupEmbeddingsResponse>(
    "/embeddings/group",
    payload,
  );
  return response.data;
}
