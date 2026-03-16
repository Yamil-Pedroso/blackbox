/* eslint-disable no-empty */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import RegexInput from "./components/RegexInput";
import TestStringInput from "./components/TestStringInput";
import RegexDiagram from "./components/RegexDiagram";
import { useRegexParser } from "./hooks/useRegexParser";
import { highlightMatches } from "./utils/highlightMatches";
import MatchPreview from "./components/MatchPreview";
import RegexExplanation from "./components/RegexExplanation";
import { useRegexValidation } from "./hooks/useRegexValidation";
import RegexCheatsheet from "./components/RegexCheatsheet";
import { explainRegex } from "./logic/explainRegex";

export default function RegexVisualizer() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const highlightedText = highlightMatches(testString, pattern);
  const { isValid, error } = useRegexValidation(pattern);
  const explanation = explainRegex(pattern);

  let matchCount = 0;

  try {
    const regex = new RegExp(pattern, "g");
    matchCount = [...testString.matchAll(regex)].length;
  } catch {}

  const tokens = useRegexParser(pattern);

  function insertPattern(patternValue: string) {
    setPattern((prev) => prev + patternValue);
  }

  return (
    <div className="h-screen space-y-6 bg-secondary-bg p-4 overflow-scroll">
      <Link to="/tools">Back to Tools</Link>

      <RegexInput value={pattern} onChange={setPattern} />

      <RegexCheatsheet onInsert={insertPattern} />

      <TestStringInput value={testString} onChange={setTestString} />

      <MatchPreview highlightedText={highlightedText} />

      <RegexExplanation data={explanation} />

      <RegexDiagram tokens={tokens} />
      <div>Match Count: {matchCount}</div>
      {!isValid && <div className="text-red-500">{error}</div>}
    </div>
  );
}
