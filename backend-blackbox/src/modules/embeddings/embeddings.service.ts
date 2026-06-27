import { env } from "../../core/config/env";
import {
  CompareEmbeddingsDto,
  GenerateEmbeddingDto,
  GroupEmbeddingsDto,
  SemanticSearchDto,
} from "./embeddings.dto";
import { EmbeddingsProvider } from "./embeddings.interfaces";
import { HuggingFaceEmbeddingsProvider } from "./providers/huggingface-embeddings.provider";
import { LocalEmbeddingsProvider } from "./providers/local-embeddings.provider";
import {
  CompareEmbeddingsResponse,
  EmbeddingGroup,
  GenerateEmbeddingResponse,
  GroupEmbeddingsResponse,
  SemanticSearchResponse,
} from "./embeddings.types";

function createProvider(): EmbeddingsProvider {
  if (env.embeddings_provider === "hugging-face") {
    return new HuggingFaceEmbeddingsProvider();
  }

  // OpenAI, Ollama, and Transformers.js adapters can join this factory later.
  return new LocalEmbeddingsProvider();
}

export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length || vectorA.length === 0) {
    throw new Error("Embedding vectors must have matching dimensions");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let index = 0; index < vectorA.length; index += 1) {
    const valueA = vectorA[index];
    const valueB = vectorB[index];
    dotProduct += valueA * valueB;
    magnitudeA += valueA * valueA;
    magnitudeB += valueB * valueB;
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

function roundSimilarity(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}

function similarityMeaning(similarity: number): string {
  if (similarity >= 0.8) return "Very similar";
  if (similarity >= 0.55) return "Similar";
  if (similarity >= 0.3) return "Somewhat related";
  return "Low similarity";
}

function averageVectors(vectors: number[][]): number[] {
  return vectors[0].map((_, dimension) => {
    const total = vectors.reduce((sum, vector) => sum + vector[dimension], 0);

    return total / vectors.length;
  });
}

function inferTopic(texts: string[]): string {
  const joined = texts.join(" ").toLowerCase();

  if (
    /(react|vue|angular|frontend|code|coding|programming|framework)/u.test(
      joined,
    )
  ) {
    return "Frontend / Programming";
  }

  if (/(dog|dogs|cat|cats|animal|puppy|kitten)/u.test(joined)) {
    return "Animals";
  }

  if (/(password|account|settings|login|security)/u.test(joined)) {
    return "Accounts / Security";
  }

  return "Related concepts";
}

function metadata(provider: EmbeddingsProvider, embedding: number[]) {
  return {
    provider: provider.name,
    model: provider.model,
    dimensions: embedding.length,
  };
}

export async function generateEmbedding(
  dto: GenerateEmbeddingDto,
): Promise<GenerateEmbeddingResponse> {
  const provider = createProvider();
  const [embedding] = await provider.embed([dto.text]);

  return {
    text: dto.text,
    embedding,
    ...metadata(provider, embedding),
  };
}

export async function compareEmbeddings(
  dto: CompareEmbeddingsDto,
): Promise<CompareEmbeddingsResponse> {
  const provider = createProvider();
  const [embeddingA, embeddingB] = await provider.embed([dto.textA, dto.textB]);
  const similarity = roundSimilarity(cosineSimilarity(embeddingA, embeddingB));

  return {
    textA: dto.textA,
    textB: dto.textB,
    similarity,
    meaning: similarityMeaning(similarity),
    ...metadata(provider, embeddingA),
  };
}

export async function semanticSearch(
  dto: SemanticSearchDto,
): Promise<SemanticSearchResponse> {
  const provider = createProvider();
  const [queryEmbedding, ...documentEmbeddings] = await provider.embed([
    dto.query,
    ...dto.documents,
  ]);
  const ranked = dto.documents
    .map((text, index) => ({
      text,
      similarity: roundSimilarity(
        cosineSimilarity(queryEmbedding, documentEmbeddings[index]),
      ),
    }))
    .sort((resultA, resultB) => resultB.similarity - resultA.similarity)
    .map((result, index) => ({
      ...result,
      rank: index + 1,
    }));

  return {
    query: dto.query,
    results: ranked,
    ...metadata(provider, queryEmbedding),
  };
}

export async function groupEmbeddings(
  dto: GroupEmbeddingsDto,
): Promise<GroupEmbeddingsResponse> {
  const provider = createProvider();
  const embeddings = await provider.embed(dto.texts);
  const clusters: Array<{
    texts: string[];
    vectors: number[][];
  }> = [];

  dto.texts.forEach((text, index) => {
    const vector = embeddings[index];
    const textTopic = inferTopic([text]);
    let bestClusterIndex = -1;
    let bestSimilarity = -1;

    clusters.forEach((cluster, clusterIndex) => {
      const clusterTopic = inferTopic(cluster.texts);
      const hasConflictingKnownTopics =
        textTopic !== "Related concepts" &&
        clusterTopic !== "Related concepts" &&
        textTopic !== clusterTopic;

      if (hasConflictingKnownTopics) {
        return;
      }

      const similarity = cosineSimilarity(
        vector,
        averageVectors(cluster.vectors),
      );

      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestClusterIndex = clusterIndex;
      }
    });

    if (bestClusterIndex >= 0 && bestSimilarity >= 0.28) {
      clusters[bestClusterIndex].texts.push(text);
      clusters[bestClusterIndex].vectors.push(vector);
    } else {
      clusters.push({ texts: [text], vectors: [vector] });
    }
  });

  const groups: EmbeddingGroup[] = clusters.map((cluster) => {
    const centroid = averageVectors(cluster.vectors);

    return {
      topic: inferTopic(cluster.texts),
      items: cluster.texts.map((text, index) => ({
        text,
        similarityToGroup: roundSimilarity(
          cosineSimilarity(cluster.vectors[index], centroid),
        ),
      })),
    };
  });

  return {
    groups,
    ...metadata(provider, embeddings[0]),
  };
}
