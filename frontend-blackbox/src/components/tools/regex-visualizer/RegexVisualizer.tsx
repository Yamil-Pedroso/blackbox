/* eslint-disable no-empty */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { IoClose } from "react-icons/io5";

import RegexInput from "./components/RegexInput";
import TestStringInput from "./components/TestStringInput";
import RegexDiagram from "./components/RegexDiagram";
import MatchPreview from "./components/MatchPreview";
import RegexExplanation from "./components/RegexExplanation";
import RegexCheatsheet from "./components/RegexCheatsheet";

import { useRegexParser } from "./hooks/useRegexParser";
import { useRegexValidation } from "./hooks/useRegexValidation";

import { highlightMatches } from "./utils/highlightMatches";
import { explainRegex } from "./logic/explainRegex";

export default function RegexVisualizer() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [showCheatsheet, setShowCheatsheet] = useState(false);

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
    <div className="min-h-screen bg-secondary-bg p-4 sm:p-6 space-y-6 relative">
      <div className="flex items-center justify-between">
        <Link
          to="/tools"
          className="text-sm text-secondary hover:text-primary transition"
        >
          ← Back to Tools
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-sm text-secondary">
            Matches: <span className="font-semibold">{matchCount}</span>
          </div>

          <button
            onClick={() => setShowCheatsheet(true)}
            className="p-2 rounded transition"
            title="Open Regex Cheatsheet"
          >
            <BookOpen size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <RegexInput value={pattern} onChange={setPattern} />

        {!isValid && <div className="text-red-500 text-sm">{error}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-panel rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold">Test Text</h3>

          <TestStringInput value={testString} onChange={setTestString} />
        </div>

        <div className="bg-panel rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold">Match Preview</h3>

          <MatchPreview highlightedText={highlightedText} />
        </div>
      </div>

      <div className="bg-panel rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3">Regex Explanation</h3>

        <RegexExplanation data={explanation} />
      </div>

      <div className="bg-panel rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3">Regex Diagram</h3>

        <RegexDiagram tokens={tokens} />
      </div>

      {showCheatsheet && (
        <div
          onClick={() => setShowCheatsheet(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`
        fixed top-0 right-0 h-full
        w-full sm:w-105 lg:w-130
        bg-white text-black shadow-xl
        transform transition-transform duration-300 z-50
        ${showCheatsheet ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Regex Cheatsheet</h2>

          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="p-2 rounded transition"
          >
            <IoClose className="text-black" size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <RegexCheatsheet onInsert={insertPattern} />
        </div>
      </div>
    </div>
  );
}
