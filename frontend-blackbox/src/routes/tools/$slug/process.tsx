import { createFileRoute } from "@tanstack/react-router";
import ColorPaletteGeratorCaseStudy from "../../../components/tools/color-palette-generator/ColorPaletteGeneratorCaseStudy";
import RegexVisualizerCaseStudy from "../../../components/tools/regex-visualizer/RegexVisualizerCaseStudy";

export const Route = createFileRoute("/tools/$slug/process")({
  component: RouteComponent,
});

const processRegistry: Record<string, React.FC> = {
  "color-palette-generator": ColorPaletteGeratorCaseStudy,
  "regex-visualizer": RegexVisualizerCaseStudy,
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
