export interface TokenInferenceSettingsDto {
  maxNewTokens: number;
  temperature: number;
  topP: number;
}

export interface GenerateTokenInferenceDto
  extends TokenInferenceSettingsDto {
  prompt: string;
}

export interface TokenizeTextDto {
  text: string;
}
