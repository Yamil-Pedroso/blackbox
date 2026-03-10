import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/$slug/process")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return (
    <div className="px-6 md:px-10 xl:px-8 py-8 max-w-6xl">
      Tool: {slug} <h1 className="text-2xl font-bold">Process</h1>
    </div>
  );
}
