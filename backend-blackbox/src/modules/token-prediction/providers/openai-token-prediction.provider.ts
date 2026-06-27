import { openai } from "../../../core/config/openai.client";
import { TokenPredictionDto } from "../tokenPrediction.dto";
import { TokenPredictionProvider } from "../tokenPrediction.interfaces";
import { ProviderPredictionResult } from "../tokenPrediction.types";

function probabilityFromLogprob(logprob: number): number {
  if (logprob <= -9_000) {
    return 0;
  }

  return Math.min(1, Math.max(0, Math.exp(logprob)));
}

export class OpenAITokenPredictionProvider
  implements TokenPredictionProvider
{
  readonly name = "openai" as const;

  async predict(
    input: TokenPredictionDto,
  ): Promise<ProviderPredictionResult> {
    const completion = await openai.chat.completions.create({
      model: input.model,
      messages: [
        {
          role: "developer",
          content:
            "Answer the user directly in one concise sentence. Do not add headings or formatting.",
        },
        { role: "user", content: input.prompt },
      ],
      max_completion_tokens: 40,
      temperature: 0.7,
      logprobs: true,
      top_logprobs: input.topK,
    });
    const choice = completion.choices[0];
    const generatedText = choice?.message.content ?? "";
    const tokenLogprobs = choice?.logprobs?.content ?? [];

    if (!generatedText || tokenLogprobs.length === 0) {
      throw new Error(
        "OpenAI returned no token log probabilities for this model",
      );
    }

    return {
      generatedText,
      model: completion.model,
      isApproximation: false,
      predictionSteps: tokenLogprobs.map((entry, index) => {
        const topPredictions = entry.top_logprobs
          .slice(0, input.topK)
          .map((candidate) => ({
            token: candidate.token,
            probability: probabilityFromLogprob(candidate.logprob),
          }));

        if (!topPredictions.some((item) => item.token === entry.token)) {
          topPredictions.unshift({
            token: entry.token,
            probability: probabilityFromLogprob(entry.logprob),
          });
        }

        return {
          position: index + 1,
          generatedToken: entry.token,
          selectedProbability: probabilityFromLogprob(entry.logprob),
          topPredictions: topPredictions.slice(0, input.topK),
        };
      }),
    };
  }
}
