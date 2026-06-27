import { env } from "../../core/config/env";
import {
  GenerateTokenInferenceDto,
  TokenizeTextDto,
} from "./tokenInference.dto";
import { TokenInferenceProvider } from "./tokenInference.interfaces";
import { LocalTokenInferenceProvider } from "./providers/local-token-inference.provider";
import {
  TokenInferenceResponse,
  TokenizeTextResponse,
} from "./tokenInference.types";
import { approximateTokenize } from "./tokenInference.tokenizer";

function createProvider(): TokenInferenceProvider {
  const providerName = env.token_inference_provider || "local";

  // Provider adapters for Hugging Face, OpenAI, Ollama, and Transformers.js
  // can be added here without changing controllers or frontend contracts.
  if (providerName && providerName !== "local") {
    throw new Error(
      `TOKEN_INFERENCE_PROVIDER=${providerName} is not configured yet`,
    );
  }

  return new LocalTokenInferenceProvider();
}

export async function generateTokenInference(
  dto: GenerateTokenInferenceDto,
): Promise<TokenInferenceResponse> {
  const provider = createProvider();
  const result = await provider.generate(dto);
  const tokens = approximateTokenize(result.generatedText);

  return {
    prompt: dto.prompt,
    generatedText: result.generatedText,
    tokens,
    tokenCount: tokens.length,
    settings: {
      maxNewTokens: dto.maxNewTokens,
      temperature: dto.temperature,
      topP: dto.topP,
    },
    provider: provider.name,
    model: env.token_inference_model || provider.model,
  };
}

export function tokenizeText(dto: TokenizeTextDto): TokenizeTextResponse {
  const tokens = approximateTokenize(dto.text);

  return {
    text: dto.text,
    tokens,
    tokenCount: tokens.length,
    tokenizer: "approximateTokenize",
  };
}
