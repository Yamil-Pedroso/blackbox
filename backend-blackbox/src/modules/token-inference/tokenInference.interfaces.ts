import { GenerateTokenInferenceDto } from "./tokenInference.dto";
import {
  ProviderGenerationResult,
  TokenInferenceProviderName,
} from "./tokenInference.types";

export interface TokenInferenceProvider {
  readonly name: TokenInferenceProviderName;
  readonly model: string;
  generate(
    input: GenerateTokenInferenceDto,
  ): Promise<ProviderGenerationResult>;
}
