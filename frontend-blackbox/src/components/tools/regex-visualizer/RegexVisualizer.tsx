import { Link } from "@tanstack/react-router";

export default function RegexVisualizer() {
  return (
    <div className="h-full bg-secondary-bg space-y-8 p-10">
      <Link to="/tools">Back to Tools</Link>
      <h1 className="text-2xl font-bold">Regex Visualizer</h1>
      <p className="text-secondary">
        A tool to visualize regular expressions and understand their structure.
      </p>
    </div>
  );
}
