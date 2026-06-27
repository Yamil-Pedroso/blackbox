import { GenerateTokenInferenceDto } from "../tokenInference.dto";
import { TokenInferenceProvider } from "../tokenInference.interfaces";
import { ProviderGenerationResult } from "../tokenInference.types";
import { approximateTokenize } from "../tokenInference.tokenizer";

function explainPrompt(prompt: string): string {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("react")) {
    return "React is a JavaScript library for building user interfaces from reusable components. It updates the page when application state changes, helping developers create interactive web experiences with a predictable data flow.";
  }

  if (normalizedPrompt.includes("transformer")) {
    return "A Transformer is a neural network architecture that uses attention to relate tokens to one another. This lets the model process context, learn language patterns, and generate one new token at a time.";
  }

  if (normalizedPrompt.includes("token")) {
    return "A token is a small unit of text processed by a language model. During inference, the model predicts a probability distribution for the next token, selects one, appends it to the context, and repeats.";
  }

  return `${prompt.trim()} can be understood as a step-by-step language modeling task. The model reads the prompt, predicts the next token from its learned patterns, appends that token, and continues until it reaches a stopping condition.`;
}

export class LocalTokenInferenceProvider
  implements TokenInferenceProvider
{
  readonly name = "local" as const;
  readonly model = "local-token-inference-tutor-v1";

  async generate(
    input: GenerateTokenInferenceDto,
  ): Promise<ProviderGenerationResult> {
    const text = explainPrompt(input.prompt);
    const tokens = approximateTokenize(text).slice(
      0,
      input.maxNewTokens,
    );

    return {
      generatedText: tokens.join(""),
    };
  }
}
