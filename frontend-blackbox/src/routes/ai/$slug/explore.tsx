import { createFileRoute } from "@tanstack/react-router";
import ExploreTransformers from "@/components/ai/transformers/ExploreTransformers";
import ExploreWebScrapingAI from "@/components/ai/web-scraping-ai/ExploreWebScrapingAI";
import ExploreMultiModalAI from "@/components/ai/multi-modal-ai-sdk-demos/ExploreMultiModalAI";
import ExplorePipelinesArchitecture from "@/components/ai/pipelines-architecture/ExplorePipelinesArchitecture";
import ExploreTokenizerPlayground from "@/components/ai/tokenizer-playground/ExploreTokenizerPlayground";
import ExploreQuantizationPlayground from "@/components/ai/quantization-playground/ExploreQuantizationPlayground";
import ExploreEmbeddingsLab from "@/components/ai/embeddings-lab/ExploreEmbeddingsLab";
import ExploreAutoregressiveInferenceTokenByToken from "@/components/ai/autoregressive-inference-token-by-token/ExploreAutoregressiveInferenceTokenByToken";
import ExploreTokenPrediction from "@/components/ai/token-prediction/ExploreTokenPrediction";
import ExploreRagWorkbench from "@/components/ai/rag-workbench/ExploreRagWorkbench";

export const Route = createFileRoute("/ai/$slug/explore")({
  component: RouteComponent,
});

const exploreRegistry: Record<string, React.FC> = {
  "transformers-llm": ExploreTransformers,
  "web-scraping-ai": ExploreWebScrapingAI,
  "multi-modal-ai-sdk-demos": ExploreMultiModalAI,
  "pipelines-architecture": ExplorePipelinesArchitecture,
  "tokenizer-playground": ExploreTokenizerPlayground,
  "quantization-playground": ExploreQuantizationPlayground,
  "embeddings-lab": ExploreEmbeddingsLab,
  "autoregressive-inference-token-by-token":
    ExploreAutoregressiveInferenceTokenByToken,
  "token-prediction": ExploreTokenPrediction,
  "rag-workbench": ExploreRagWorkbench,
};

function RouteComponent() {
  const { slug } = Route.useParams();

  const ExploreComponent = exploreRegistry[slug];

  if (!ExploreComponent) {
    return (
      <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold">Explore not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <ExploreComponent />
    </div>
  );
}
