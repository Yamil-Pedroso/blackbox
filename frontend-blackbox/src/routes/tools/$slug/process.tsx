import { createFileRoute } from "@tanstack/react-router";
import ColorPaletteProcess from "../../../components/tools/color-palette-generator/ColorPaletteProcess";

export const Route = createFileRoute("/tools/$slug/process")({
  component: RouteComponent,
});

const processRegistry: Record<string, React.FC> = {
  "color-palette-generator": ColorPaletteProcess,
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
