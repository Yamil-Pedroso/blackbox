import {
  ModelConfig,
  ProviderTokenizeResult,
  TokenizeInput,
  TokenizerProvider,
} from "../tokenizer.types";
import { classifyTokenValue } from "./token-classifier";

type TiktokenEncoding = {
  encode(text: string): number[];
  decode(tokens: number[]): string;
};

type TiktokenModule = {
  encodingForModel(model: string): TiktokenEncoding;
};

const { encodingForModel } = require("js-tiktoken") as TiktokenModule;

const SUPPORTED_MODELS: ReadonlySet<string> = new Set([
  "gpt-4o",
  "gpt-4o-mini",
]);

export class OpenAITokenizerProvider implements TokenizerProvider {
  readonly tokenizerType = "openai" as const;
  private readonly encodings = new Map<string, TiktokenEncoding>();

  tokenize(
    { text }: TokenizeInput,
    model: ModelConfig,
  ): ProviderTokenizeResult {
    if (!SUPPORTED_MODELS.has(model.modelId)) {
      throw new Error(`Unsupported OpenAI tokenizer model: ${model.modelId}`);
    }

    const encoding =
      this.encodings.get(model.modelId) ??
      encodingForModel(model.modelId);
    this.encodings.set(model.modelId, encoding);
    const tokenIds = encoding.encode(text);
    const tokens = tokenIds.map((tokenId: number, id: number) => {
      const value = encoding.decode([tokenId]);

      return {
        id,
        value,
        type: classifyTokenValue(value),
      };
    });

    return {
      originalText: text,
      tokens,
      tokenCount: tokenIds.length,
      tokenizerType: this.tokenizerType,
      tokenizerAccuracy: "exact",
      tokenizerNotes:
        "Counted with js-tiktoken using the model-compatible OpenAI BPE encoding.",
    };
  }
}
