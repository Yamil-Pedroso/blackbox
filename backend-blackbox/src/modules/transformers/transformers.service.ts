import {
  TransformerDemoDto,
  TransformerExplainDto,
  TransformerTopic,
} from "./transformers.dto";
import {
  AttentionRow,
  NextTokenPrediction,
  TransformerDemoResponse,
  TransformerExplanation,
} from "./transformers.types";

const explanations: Record<TransformerTopic, TransformerExplanation> = {
  transformer: {
    title: "Transformer",
    description:
      "A Transformer is a neural network architecture that processes tokens in parallel and uses attention to decide which parts of the context matter most.",
    steps: [
      "Split input text into tokens.",
      "Convert tokens into vectors.",
      "Mix context with attention across several layers.",
      "Project the final vector into probabilities for the next token.",
    ],
  },
  "llm-flow": {
    title: "LLM Flow",
    description:
      "Modern LLMs repeatedly transform text into tokens, vectors, contextual representations, and next-token probabilities.",
    steps: [
      "Input text is tokenized.",
      "Tokens become embeddings.",
      "Transformer layers update each token using context.",
      "The model predicts a probability distribution over possible next tokens.",
    ],
  },
  "encoder-decoder": {
    title: "Encoder / Decoder",
    description:
      "Encoders build context-rich representations, while decoders generate output step by step. Many chat LLMs use decoder-only stacks.",
    steps: [
      "Encoder reads the full input.",
      "Decoder attends to prior output tokens.",
      "Cross-attention can connect decoder tokens to encoder context.",
    ],
  },
  "self-attention": {
    title: "Self-Attention",
    description:
      "Self-attention lets every token score its relationship to other tokens, then blend useful context into its own representation.",
    steps: [
      "Create query, key, and value vectors.",
      "Compare queries with keys.",
      "Normalize scores into weights.",
      "Blend values according to those weights.",
    ],
  },
  "multi-head-attention": {
    title: "Multi-Head Attention",
    description:
      "Multi-head attention runs several attention views in parallel so the model can track syntax, meaning, references, and position at the same time.",
    steps: [
      "Project embeddings into multiple smaller attention heads.",
      "Each head learns a different relationship pattern.",
      "Head outputs are concatenated.",
      "A final projection merges them back into the model dimension.",
    ],
  },
  "positional-encoding": {
    title: "Positional Encoding",
    description:
      "Because attention sees tokens as a set, positional information is added so the model can reason about order.",
    steps: [
      "Generate position signals.",
      "Add or rotate them into token vectors.",
      "Let layers distinguish early, late, nearby, and distant tokens.",
    ],
  },
  "feed-forward-network": {
    title: "Feed Forward Network",
    description:
      "After attention mixes context, a feed forward network transforms each token independently through learned nonlinear layers.",
    steps: [
      "Expand the token vector.",
      "Apply a nonlinear activation.",
      "Compress it back to the model dimension.",
    ],
  },
  "add-and-norm": {
    title: "Add & Norm",
    description:
      "Residual additions preserve the original signal, while normalization keeps activations stable across deep stacks.",
    steps: [
      "Add the block input to the block output.",
      "Normalize the combined vector.",
      "Repeat around attention and feed forward blocks.",
    ],
  },
  "token-prediction": {
    title: "Token Prediction",
    description:
      "The final hidden state is projected into scores for vocabulary tokens, then normalized into probabilities.",
    steps: [
      "Read the final vector for the current position.",
      "Score every vocabulary token.",
      "Convert scores to probabilities.",
      "Choose or sample the next token.",
    ],
  },
};

const commonContinuations = [
  "mat",
  "floor",
  "sofa",
  "window",
  "answer",
  "system",
  "model",
  "architecture",
];

function tokenize(text: string) {
  return (
    text
      .trim()
      .match(/[A-Za-z0-9]+|[^\sA-Za-z0-9]/g)
      ?.slice(0, 18) ?? []
  );
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

function createEmbeddings(tokens: string[]) {
  return tokens.map((token, tokenIndex) => {
    const seed = hashText(token) + tokenIndex * 17;

    return {
      token,
      values: [0, 1, 2].map((offset) =>
        round((((seed + offset * 31) % 100) - 50) / 100),
      ),
    };
  });
}

function createAttention(tokens: string[]): AttentionRow[] {
  return tokens.map((fromToken, fromIndex) => {
    const rawWeights = tokens.map((toToken, toIndex) => {
      const distanceBoost = 1 / (Math.abs(fromIndex - toIndex) + 1);
      const semanticBoost =
        toToken[0]?.toLowerCase() === fromToken[0]?.toLowerCase() ? 0.35 : 0;
      const selfBoost = fromIndex === toIndex ? 0.45 : 0;

      return distanceBoost + semanticBoost + selfBoost;
    });

    const weights = normalize(rawWeights);

    return {
      fromToken,
      toTokens: tokens.map((token, index) => ({
        token,
        weight: weights[index],
      })),
    };
  });
}

function createPredictions(prompt: string): NextTokenPrediction[] {
  const lowerPrompt = prompt.toLowerCase();
  const themed = lowerPrompt.includes("cat")
    ? ["mat", "floor", "sofa", "window"]
    : lowerPrompt.includes("transform")
      ? ["layer", "attention", "embedding", "token"]
      : lowerPrompt.includes("code")
        ? ["function", "component", "state", "return"]
        : commonContinuations;

  const raw = themed.slice(0, 4).map((token, index) => {
    const promptInfluence = (hashText(prompt + token) % 17) / 100;
    return 0.58 / (index + 1) + promptInfluence;
  });
  const probabilities = normalize(raw);

  return themed.slice(0, 4).map((token, index) => ({
    token,
    probability: probabilities[index],
  }));
}

export async function explainTransformer(
  dto: TransformerExplainDto,
): Promise<TransformerExplanation> {
  return explanations[dto.topic];
}

export async function runTransformerDemo(
  dto: TransformerDemoDto,
): Promise<TransformerDemoResponse> {
  const tokens = tokenize(dto.prompt);
  const safeTokens = tokens.length ? tokens : ["Start"];
  const predictions = createPredictions(dto.prompt);
  const chosenToken = predictions[0]?.token ?? "token";
  const lastToken = safeTokens[safeTokens.length - 1];

  return {
    inputText: dto.prompt,
    model: dto.model ?? "educational-simulator",
    tokens: safeTokens,
    embeddingsPreview: createEmbeddings(safeTokens),
    attention: createAttention(safeTokens),
    nextTokenPredictions: predictions,
    chosenToken,
    highlightedPath: [lastToken, chosenToken],
    isApproximation: true,
  };
}
