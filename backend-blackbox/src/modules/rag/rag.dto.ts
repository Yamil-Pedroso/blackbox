export type RagQueryDto = {
  sourceText: string;
  question: string;
  sourceTitle?: string;
  chunkSize: number;
  overlap: number;
  topK: number;
};

export type RagAssistantDto = {
  knowledgeTitle?: string;
  knowledgeBase: string;
  question: string;
  tone?: "concise" | "explanatory" | "support";
  answerMode?: "local" | "openai";
};
