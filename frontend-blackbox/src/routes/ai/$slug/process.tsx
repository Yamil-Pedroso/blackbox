import { createFileRoute } from "@tanstack/react-router";
import ProcessTransformers from "@/components/ai/transformers/ProcessTransformers";
import ProcessWebScrapingAI from "@/components/ai/web-scraping-ai/ProcessWebScrapingAI";
import ProcessMultiModalAI from "@/components/ai/multi-modal-ai-sdk-demos/ProcessMultiModalAI";
import ProcessPipelinesArchitecture from "@/components/ai/pipelines-architecture/ProcessPipelinesArchitecture";
import ProcessTokenizerPlayground from "@/components/ai/tokenizer-playground/ProcessTokenizerPlayground";
import ProcessQuantizationPlayground from "@/components/ai/quantization-playground/ProcessQuantizationPlayground";
import ProcessEmbeddingsLab from "@/components/ai/embeddings-lab/ProcessEmbeddingsLab";
import ProcessAutoregressiveInferenceTokenByToken from "@/components/ai/autoregressive-inference-token-by-token/ProcessAutoregressiveInferenceTokenByToken";
import ProcessTokenPrediction from "@/components/ai/token-prediction/ProcessTokenPrediction";

export const Route = createFileRoute("/ai/$slug/process")({
  component: RouteComponent,
});

const processRegistry: Record<string, React.FC> = {
  "transformers-llm": ProcessTransformers,
  "web-scraping-ai": ProcessWebScrapingAI,
  "multi-modal-ai-sdk-demos": ProcessMultiModalAI,
  "pipelines-architecture": ProcessPipelinesArchitecture,
  "tokenizer-playground": ProcessTokenizerPlayground,
  "quantization-playground": ProcessQuantizationPlayground,
  "embeddings-lab": ProcessEmbeddingsLab,
  "autoregressive-inference-token-by-token":
    ProcessAutoregressiveInferenceTokenByToken,
  "token-prediction": ProcessTokenPrediction,
};

function RouteComponent() {
  const { slug } = Route.useParams();

  const ProcessComponent = processRegistry[slug];

  if (!ProcessComponent) {
    return (
      <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold">Process not found</h1>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl">
      <ProcessComponent />
    </div>
  );
}
