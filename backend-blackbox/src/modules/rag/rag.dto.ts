export type RagQueryDto = {
  sourceText: string;
  question: string;
  sourceTitle?: string;
  chunkSize: number;
  overlap: number;
  topK: number;
};
