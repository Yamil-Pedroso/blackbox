import { createFileRoute } from "@tanstack/react-router";
import ColorPaletteGenerator from "../../../components/tools/color-palette-generator/ColorPaletteGenerator";
import RegexVisualizer from "../../../components/tools/regex-visualizer/RegexVisualizer";

export const Route = createFileRoute("/tools/$slug/launch")({
  component: RouteComponent,
});

const toolRegistry: Record<string, React.FC> = {
  "color-palette-generator": ColorPaletteGenerator,
  "regex-visualizer": RegexVisualizer,
};

function RouteComponent() {
  const { slug } = Route.useParams();

  const ToolComponent = toolRegistry[slug];

  if (!ToolComponent) {
    return (
      <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl bg-black">
        <h1 className="text-2xl font-bold">Tool not found</h1>
      </div>
    );
  }

  return <ToolComponent />;
}
