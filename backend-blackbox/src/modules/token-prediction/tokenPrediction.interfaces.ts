import { TokenPredictionDto } from "./tokenPrediction.dto";
import {
  ProviderPredictionResult,
  TokenPredictionProviderName,
} from "./tokenPrediction.types";

export interface TokenPredictionProvider {
  readonly name: TokenPredictionProviderName;
  predict(input: TokenPredictionDto): Promise<ProviderPredictionResult>;
}
