import { apiClient } from "../../api/apiClient";
import type {
  AttentionRow,
  TransformerDemoResponse,
  TransformerExplanation,
  TransformerTopic,
} from "../../types/ai/transformers.types";

const explanations: Record<TransformerTopic, TransformerExplanation> = {
  transformer: {
    title: "Transformer",
    description:
      "A Transformer is a neural architecture that turns tokens into context-aware vectors using attention.",
    steps: [
      "Tokenize the text.",
      "Create embeddings.",
      "Mix context through stacked Transformer blocks.",
      "Predict the next token.",
    ],
  },
  "llm-flow": {
    title: "LLM Flow",
    description:
      "LLMs repeatedly convert text into tokens, vectors, layer activations, probabilities, and a selected next token.",
    steps: [
      "Input text",
      "Tokenization",
      "Embeddings",
      "Transformer layers",
      "Output probabilities",
      "Next token prediction",
    ],
  },
  "encoder-decoder": {
    title: "Encoder / Decoder",
    description:
      "Encoders read and represent input, while decoders generate output one token at a time.",
    steps: ["Encode context", "Attend to context", "Decode next token"],
  },
  "self-attention": {
    title: "Self-Attention",
    description:
      "Self-attention lets each token choose which other tokens should influence its updated representation.",
    steps: ["Queries", "Keys", "Values", "Attention weights", "Context mix"],
  },
  "multi-head-attention": {
    title: "Multi-Head Attention",
    description:
      "Multiple attention heads look for different relationships in parallel, then merge their views.",
    steps: ["Split into heads", "Attend in parallel", "Concatenate", "Project"],
  },
  "positional-encoding": {
    title: "Positional Encoding",
    description:
      "Position signals give the model order information that pure attention does not naturally contain.",
    steps: ["Create positions", "Add to vectors", "Preserve sequence order"],
  },
  "feed-forward-network": {
    title: "Feed Forward Network",
    description:
      "The feed forward block transforms each token independently after attention has mixed context.",
    steps: ["Expand", "Activate", "Project back"],
  },
  "add-and-norm": {
    title: "Add & Norm",
    description:
      "Residual connections and normalization keep deep Transformer stacks trainable and stable.",
    steps: ["Add residual", "Normalize", "Pass to next block"],
  },
  "token-prediction": {
    title: "Token Prediction",
    description:
      "The model scores vocabulary candidates and chooses or samples the next token.",
    steps: ["Score vocabulary", "Normalize probabilities", "Select token"],
  },
};

function tokenize(prompt: string) {
  return prompt.match(/[A-Za-z0-9]+|[^\sA-Za-z0-9]/g)?.slice(0, 18) ?? [];
}

function hashText(text: string) {
  return text.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function round(value: number) {
  return Number(value.toFixed(2));
}

function normalize(values: number[]) {
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  return values.map((value) => round(value / total));
}

function createAttention(tokens: string[]): AttentionRow[] {
  return tokens.map((fromToken, fromIndex) => {
    const raw = tokens.map((toToken, toIndex) => {
      const distanceBoost = 1 / (Math.abs(fromIndex - toIndex) + 1);
      const selfBoost = fromIndex === toIndex ? 0.45 : 0;
      const semanticBoost =
        fromToken[0]?.toLowerCase() === toToken[0]?.toLowerCase() ? 0.3 : 0;
      return distanceBoost + selfBoost + semanticBoost;
    });
    const weights = normalize(raw);

    return {
      fromToken,
      toTokens: tokens.map((token, index) => ({
        token,
        weight: weights[index],
      })),
    };
  });
}

export function createLocalTransformerDemo(
  prompt: string,
  model = "educational-simulator",
): TransformerDemoResponse {
  const tokens = tokenize(prompt);
  const safeTokens = tokens.length ? tokens : ["Start"];
  const choices = prompt.toLowerCase().includes("cat")
    ? ["mat", "floor", "sofa", "window"]
    : prompt.toLowerCase().includes("transform")
      ? ["layer", "attention", "embedding", "token"]
      : ["idea", "system", "answer", "pattern"];
  const probabilities = normalize([0.62, 0.18, 0.12, 0.08]);
  const nextTokenPredictions = choices.map((token, index) => ({
    token,
    probability: probabilities[index],
  }));
  const chosenToken = nextTokenPredictions[0].token;

  return {
    inputText: prompt,
    model,
    tokens: safeTokens,
    embeddingsPreview: safeTokens.map((token, index) => {
      const seed = hashText(token) + index * 19;
      return {
        token,
        values: [0, 1, 2].map((offset) =>
          round((((seed + offset * 29) % 100) - 50) / 100),
        ),
      };
    }),
    attention: createAttention(safeTokens),
    nextTokenPredictions,
    chosenToken,
    highlightedPath: [safeTokens[safeTokens.length - 1], chosenToken],
    isApproximation: true,
  };
}

export async function explainTransformer(topic: TransformerTopic) {
  try {
    const response = await apiClient.post<TransformerExplanation>(
      "/transformers/explain",
      { topic },
    );
    return response.data;
  } catch {
    return explanations[topic];
  }
}

export async function runTransformerDemo(payload: {
  prompt: string;
  model?: string;
}) {
  const response = await apiClient.post<TransformerDemoResponse>(
    "/transformers/demo",
    payload,
  );
  return response.data;
}
