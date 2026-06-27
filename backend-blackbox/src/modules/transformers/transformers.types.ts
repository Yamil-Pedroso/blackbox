export type TransformerExplanation = {
  title: string;
  description: string;
  steps: string[];
};

export type EmbeddingPreview = {
  token: string;
  values: number[];
};

export type AttentionLink = {
  token: string;
  weight: number;
};

export type AttentionRow = {
  fromToken: string;
  toTokens: AttentionLink[];
};

export type NextTokenPrediction = {
  token: string;
  probability: number;
};

export type TransformerDemoResponse = {
  inputText: string;
  model: string;
  tokens: string[];
  embeddingsPreview: EmbeddingPreview[];
  attention: AttentionRow[];
  nextTokenPredictions: NextTokenPrediction[];
  chosenToken: string;
  highlightedPath: string[];
  isApproximation: true;
};
