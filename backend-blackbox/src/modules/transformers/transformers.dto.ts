export type TransformerTopic =
  | "transformer"
  | "llm-flow"
  | "encoder-decoder"
  | "self-attention"
  | "multi-head-attention"
  | "positional-encoding"
  | "feed-forward-network"
  | "add-and-norm"
  | "token-prediction";

export type TransformerExplainDto = {
  topic: TransformerTopic;
};

export type TransformerDemoDto = {
  prompt: string;
  model?: string;
};
