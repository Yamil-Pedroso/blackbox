export type TokenPredictionProviderName = "local" | "openai";

export interface TokenPredictionCandidate {
  token: string;
  probability: number;
}

export interface TokenPredictionStep {
  position: number;
  generatedToken: string;
  selectedProbability: number;
  topPredictions: TokenPredictionCandidate[];
}

export interface TokenPredictionStatistics {
  totalTokens: number;
  averageProbability: number;
  lowestProbability: number;
  highestProbability: number;
  generationTimeMs: number;
}

export interface ProviderPredictionResult {
  generatedText: string;
  predictionSteps: TokenPredictionStep[];
  model: string;
  isApproximation: boolean;
  approximationReason?: string;
}

export interface TokenPredictionResponse extends ProviderPredictionResult {
  prompt: string;
  provider: TokenPredictionProviderName;
  statistics: TokenPredictionStatistics;
}

export type PredictionNodeKind = "prompt" | "chosen" | "alternative";

export interface PredictionTreeNode {
  id: string;
  label: string;
  probability: number;
  color: string;
  kind: PredictionNodeKind;
  step: number;
  rank: number;
  isChosen: boolean;
}

export interface PredictionTreeEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  isChosen: boolean;
}

export interface PredictionTreeResponse {
  prompt: string;
  model: string;
  provider: TokenPredictionProviderName;
  isApproximation: boolean;
  nodes: PredictionTreeNode[];
  edges: PredictionTreeEdge[];
  chosenPath: string[];
}

export interface PredictionPathItem {
  position: number;
  token: string;
  probability: number;
}

export interface PredictionPathResponse {
  prompt: string;
  generatedText: string;
  model: string;
  provider: TokenPredictionProviderName;
  isApproximation: boolean;
  path: PredictionPathItem[];
}
