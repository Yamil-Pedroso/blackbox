import { apiClient } from "../../api/apiClient";
import type {
  QuantizationAnalysis,
  QuantizationAnalyzeRequest,
} from "../../types/ai/quantization.types";

export async function analyzeQuantization(
  payload: QuantizationAnalyzeRequest,
): Promise<QuantizationAnalysis> {
  const response = await apiClient.post<QuantizationAnalysis>(
    "/quantization/analyze",
    payload,
  );

  return response.data;
}
