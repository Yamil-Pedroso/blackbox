export type TokenInferenceProviderName =
  | "local"
  | "hugging-face"
  | "openai"
  | "ollama"
  | "transformers-js";

export interface TokenInferenceSettings {
  maxNewTokens: number;
  temperature: number;
  topP: number;
}

export interface GenerateTokenInferenceRequest
  extends TokenInferenceSettings {
  prompt: string;
}

export interface GenerateTokenInferenceResponse {
  prompt: string;
  generatedText: string;
  tokens: string[];
  tokenCount: number;
  settings: TokenInferenceSettings;
  provider: TokenInferenceProviderName;
  model: string;
}

export interface TokenizeTextRequest {
  text: string;
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
