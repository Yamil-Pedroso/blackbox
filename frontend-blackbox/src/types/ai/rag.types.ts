export type RagQueryRequest = {
  sourceTitle?: string;
  sourceText: string;
  question: string;
  chunkSize: number;
  overlap: number;
  topK: number;
};

export type RagAssistantRequest = {
  knowledgeTitle?: string;
  knowledgeBase: string;
  question: string;
  tone?: "concise" | "explanatory" | "support";
  answerMode?: "local" | "openai";
};

export type RagChunk = {
  id: string;
  index: number;
  text: string;
  tokenEstimate: number;
  startWord: number;
  endWord: number;
};

export type RagRetrievedChunk = RagChunk & {
  rank: number;
  similarity: number;
};

export type RagQueryResponse = {
  question: string;
  sourceTitle: string;
  answer: string;
  chunks: RagChunk[];
  retrievedChunks: RagRetrievedChunk[];
  promptPreview: string;
  citations: Array<{
    chunkId: string;
    label: string;
    text: string;
  }>;
  settings: {
    chunkSize: number;
    overlap: number;
    topK: number;
  };
  metrics: {
    totalChunks: number;
    retrievedChunks: number;
    contextTokenEstimate: number;
    provider: string;
    model: string;
    durationMs: number;
  };
};

export type RagAssistantResponse = RagQueryResponse & {
  mode: "simple-knowledge-assistant";
  answerMode: "local" | "openai";
  suggestions: string[];
  trace: Array<{
    step: string;
    detail: string;
  }>;
};
