import { LocalEmbeddingsProvider } from "../embeddings/providers/local-embeddings.provider";
import { cosineSimilarity } from "../embeddings/embeddings.service";
import { RagQueryDto } from "./rag.dto";
import { RagChunk, RagQueryResponse, RagRetrievedChunk } from "./rag.types";

const provider = new LocalEmbeddingsProvider();

function estimateTokens(text: string) {
  return Math.ceil(text.trim().split(/\s+/).filter(Boolean).length * 1.25);
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function wordsFrom(text: string) {
  return normalizeText(text).split(/\s+/).filter(Boolean);
}

function keywordSet(text: string) {
  return new Set(
    (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).filter(
      (word) => word.length > 3,
    ),
  );
}

function chunkText(dto: RagQueryDto): RagChunk[] {
  const words = wordsFrom(dto.sourceText);
  const chunks: RagChunk[] = [];
  const step = dto.chunkSize - dto.overlap;

  for (let start = 0; start < words.length; start += step) {
    const chunkWords = words.slice(start, start + dto.chunkSize);
    if (chunkWords.length === 0) break;

    const text = chunkWords.join(" ");
    const index = chunks.length + 1;

    chunks.push({
      id: `C${index}`,
      index,
      text,
      tokenEstimate: estimateTokens(text),
      startWord: start + 1,
      endWord: start + chunkWords.length,
    });

    if (start + dto.chunkSize >= words.length) break;
  }

  return chunks;
}

function roundSimilarity(value: number) {
  return Math.round(value * 10_000) / 10_000;
}

async function retrieveChunks(
  question: string,
  chunks: RagChunk[],
  topK: number,
): Promise<RagRetrievedChunk[]> {
  const [queryEmbedding, ...chunkEmbeddings] = await provider.embed([
    question,
    ...chunks.map((chunk) => chunk.text),
  ]);

  return chunks
    .map((chunk, index) => ({
      ...chunk,
      similarity: roundSimilarity(
        cosineSimilarity(queryEmbedding, chunkEmbeddings[index]),
      ),
    }))
    .sort((chunkA, chunkB) => chunkB.similarity - chunkA.similarity)
    .slice(0, topK)
    .map((chunk, index) => ({
      ...chunk,
      rank: index + 1,
    }));
}

function bestSentences(question: string, chunks: RagRetrievedChunk[]) {
  const questionKeywords = keywordSet(question);
  const candidates = chunks.flatMap((chunk) =>
    chunk.text
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .map((sentence) => {
        const sentenceWords = keywordSet(sentence);
        const score = [...sentenceWords].filter((word) =>
          questionKeywords.has(word),
        ).length;

        return { sentence, chunkId: chunk.id, score };
      }),
  );

  return candidates
    .sort((candidateA, candidateB) => candidateB.score - candidateA.score)
    .slice(0, 3);
}

function buildAnswer(question: string, chunks: RagRetrievedChunk[]) {
  const selectedSentences = bestSentences(question, chunks);
  const fallback = chunks[0]?.text.slice(0, 260) ?? "";
  const evidence = selectedSentences
    .filter((item) => item.score > 0)
    .map((item) => `${item.sentence} [${item.chunkId}]`);

  if (evidence.length === 0) {
    return `I found related context, but no direct sentence perfectly matches the question. The closest retrieved passage says: ${fallback} [${chunks[0]?.id ?? "C1"}]`;
  }

  return `Based on the retrieved context, ${evidence.join(" ")}`;
}

function buildPromptPreview(question: string, chunks: RagRetrievedChunk[]) {
  const context = chunks
    .map((chunk) => `[${chunk.id}] ${chunk.text}`)
    .join("\n\n")
    .slice(0, 2400);

  return `System: Answer using only the retrieved context. Cite chunk ids when possible.\n\nContext:\n${context}\n\nUser question: ${question}`;
}

export async function runRagQuery(
  dto: RagQueryDto,
): Promise<RagQueryResponse> {
  const startedAt = performance.now();
  const chunks = chunkText(dto);
  const retrievedChunks = await retrieveChunks(dto.question, chunks, dto.topK);
  const answer = buildAnswer(dto.question, retrievedChunks);
  const promptPreview = buildPromptPreview(dto.question, retrievedChunks);
  const durationMs = Math.round(performance.now() - startedAt);

  return {
    question: dto.question,
    sourceTitle: dto.sourceTitle ?? "Untitled source",
    answer,
    chunks,
    retrievedChunks,
    promptPreview,
    citations: retrievedChunks.map((chunk) => ({
      chunkId: chunk.id,
      label: `${chunk.id} · similarity ${chunk.similarity}`,
      text: chunk.text.slice(0, 360),
    })),
    settings: {
      chunkSize: dto.chunkSize,
      overlap: dto.overlap,
      topK: dto.topK,
    },
    metrics: {
      totalChunks: chunks.length,
      retrievedChunks: retrievedChunks.length,
      contextTokenEstimate: estimateTokens(
        retrievedChunks.map((chunk) => chunk.text).join(" "),
      ),
      provider: provider.name,
      model: provider.model,
      durationMs,
    },
  };
}
