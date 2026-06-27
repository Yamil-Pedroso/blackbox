import { createFileRoute } from "@tanstack/react-router";
import AIChatEngine from "../../../components/ai/web-scraping-ai/ExploreWebScrapingAI";

export const Route = createFileRoute("/ai/ai-chat-engine/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AIChatEngine />;
}
