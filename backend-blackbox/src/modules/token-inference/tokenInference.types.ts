import { TokenInferenceSettingsDto } from "./tokenInference.dto";

export type TokenInferenceProviderName =
  | "local"
  | "hugging-face"
  | "openai"
  | "ollama"
  | "transformers-js";

export interface ProviderGenerationResult {
  generatedText: string;
}

export interface TokenInferenceResponse {
  prompt: string;
  generatedText: string;
  tokens: string[];
  tokenCount: number;
  settings: TokenInferenceSettingsDto;
  provider: TokenInferenceProviderName;
  model: string;
}

export interface TokenizeTextResponse {
  text: string;
  tokens: string[];
  tokenCount: number;
  tokenizer: "approximateTokenize";
}

export interface TokenStreamEvent {
  token: string;
  index: number;
}

export interface TokenStreamDoneEvent {
  fullText: string;
  tokenCount: number;
  provider: TokenInferenceProviderName;
  model: string;
}
