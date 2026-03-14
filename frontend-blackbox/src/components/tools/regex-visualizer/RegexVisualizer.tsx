import { useState } from "react";
import { Link } from "@tanstack/react-router";
import RegexInput from "./components/RegexInput";
import TestStringInput from "./components/TestStringInput";
import RegexDiagram from "./components/RegexDiagram";
import { useRegexParser } from "./hooks/useRegexParser";

export default function RegexVisualizer() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");

  const tokens = useRegexParser(pattern);

  return (
    <div className="h-screen space-y-6 bg-secondary-bg p-4">
      <Link to="/tools">Back to Tools</Link>

      <RegexInput value={pattern} onChange={setPattern} />

      <TestStringInput value={testString} onChange={setTestString} />

      <RegexDiagram tokens={tokens} />
    </div>
  );
}
