import { apiClient } from "../../api/apiClient";
import type {
  PredictionPathResponse,
  PredictionTreeResponse,
  TokenPredictionRequest,
  TokenPredictionResponse,
} from "../../types/ai/tokenPrediction.types";

export async function predictTokens(
  payload: TokenPredictionRequest,
): Promise<TokenPredictionResponse> {
  const response = await apiClient.post<TokenPredictionResponse>(
    "/token-prediction/predict",
    payload,
  );
  return response.data;
}

export async function fetchPredictionTree(
  payload: TokenPredictionRequest,
): Promise<PredictionTreeResponse> {
  const response = await apiClient.post<PredictionTreeResponse>(
    "/token-prediction/tree",
    payload,
  );
  return response.data;
}

export async function fetchPredictionPath(
  payload: TokenPredictionRequest,
): Promise<PredictionPathResponse> {
  const response = await apiClient.post<PredictionPathResponse>(
    "/token-prediction/path",
    payload,
  );
  return response.data;
}
