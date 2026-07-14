import { openaiLLM } from "../../core/config/openai.client";
import { LocalEmbeddingsProvider } from "../embeddings/providers/local-embeddings.provider";
import { cosineSimilarity } from "../embeddings/embeddings.service";
import { RagAssistantDto, RagQueryDto } from "./rag.dto";
import {
  RagAssistantResponse,
  RagChunk,
  RagQueryResponse,
  RagRetrievedChunk,
} from "./rag.types";

const provider = new LocalEmbeddingsProvider();
const OPENAI_RAG_MODEL = "gpt-4.1-mini";

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

function buildAssistantSuggestions(question: string, chunks: RagRetrievedChunk[]) {
  const bestChunk = chunks[0];
  const chunkTopic =
    bestChunk?.text
      .split(/\s+/)
      .slice(0, 8)
      .join(" ")
      .replace(/[,.!?;:]$/g, "") ?? "the retrieved context";

  return [
    `Show the evidence behind: "${question}"`,
    `What are the limits of this answer based on ${bestChunk?.id ?? "C1"}?`,
    `Summarize the key idea around ${chunkTopic}.`,
  ];
}

function adaptAnswerTone(answer: string, tone: RagAssistantDto["tone"]) {
  if (tone === "concise") {
    return answer.replace(/^Based on the retrieved context,\s*/i, "");
  }

  if (tone === "support") {
    return `${answer}\n\nI only used the indexed knowledge base, so the citations show exactly where the answer came from.`;
  }

  return answer;
}

function toneInstruction(tone: RagAssistantDto["tone"]) {
  if (tone === "concise") {
    return "Answer concisely in 2-4 sentences.";
  }

  if (tone === "support") {
    return "Answer like a helpful support assistant. Be practical, calm, and explicit about what the source does or does not support.";
  }

  return "Answer clearly with enough explanation for a learner to understand the reasoning.";
}

async function generateOpenAIRagAnswer(
  dto: RagAssistantDto,
  response: RagQueryResponse,
) {
  const context = response.retrievedChunks
    .map((chunk) => `[${chunk.id}] ${chunk.text}`)
    .join("\n\n");

  const completion = await openaiLLM.chat.completions.create({
    model: OPENAI_RAG_MODEL,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: [
          "You are a RAG knowledge assistant.",
          "Answer using only the retrieved context provided by the user.",
          "Cite chunk ids inline, for example [C1].",
          "If the context is insufficient, say what is missing instead of guessing.",
          toneInstruction(dto.tone),
        ].join(" "),
      },
      {
        role: "user",
        content: `Knowledge base: ${response.sourceTitle}

Retrieved context:
${context}

Question:
${dto.question}`,
      },
    ],
  });

  return {
    answer:
      completion.choices[0]?.message.content?.trim() ??
      "OpenAI returned an empty answer for the retrieved context.",
    usage: completion.usage,
  };
}

export async function runSimpleRagAssistant(
  dto: RagAssistantDto,
): Promise<RagAssistantResponse> {
  const startedAt = performance.now();
  const response = await runRagQuery({
    sourceTitle: dto.knowledgeTitle,
    sourceText: dto.knowledgeBase,
    question: dto.question,
    chunkSize: 90,
    overlap: 18,
    topK: 4,
  });
  const answerMode = dto.answerMode ?? "local";
  const openAIResult =
    answerMode === "openai"
      ? await generateOpenAIRagAnswer(dto, response)
      : null;
  const answer = openAIResult
    ? openAIResult.answer
    : adaptAnswerTone(response.answer, dto.tone);
  const durationMs = Math.round(performance.now() - startedAt);

  return {
    ...response,
    mode: "simple-knowledge-assistant",
    answerMode,
    answer,
    suggestions: buildAssistantSuggestions(
      dto.question,
      response.retrievedChunks,
    ),
    trace: [
      {
        step: "Index",
        detail: `${response.metrics.totalChunks} chunks created from "${response.sourceTitle}".`,
      },
      {
        step: "Retrieve",
        detail: `${response.metrics.retrievedChunks} chunks selected with ${response.metrics.provider}.`,
      },
      {
        step: "Answer",
        detail:
          answerMode === "openai"
            ? `OpenAI ${OPENAI_RAG_MODEL} generated the answer from ${response.citations
                .map((citation) => citation.chunkId)
                .join(", ")}. Usage: ${
                openAIResult?.usage?.total_tokens ?? "unknown"
              } total tokens.`
            : `Local answer generated from ${response.citations
                .map((citation) => citation.chunkId)
                .join(", ")} without external API usage.`,
      },
    ],
    metrics: {
      ...response.metrics,
      model: answerMode === "openai" ? OPENAI_RAG_MODEL : response.metrics.model,
      durationMs,
    },
  };
}
