import { useState } from "react";
import { generateAIPalette } from "../../services/aiPalette.service";

type Props = {
  setPalette: (colors: string[]) => void;
};

export default function AIPaletteGenerator({ setPalette }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    const palette = await generateAIPalette(prompt);

    setPalette(palette);

    setLoading(false);
  };

  return (
    <div className="mt-16 space-y-4">
      <h2 className="text-2xl font-semibold">AI Palette Generator</h2>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="cyberpunk, forest, sunset..."
        className="border border-neutral-700 px-3 py-2 w-full max-w-md bg-transparent outline-0"
      />

      <button
        onClick={generate}
        disabled={loading}
        className="px-4 py-2 border border-neutral-700 hover:border-primary bg-transparent "
      >
        {loading ? "Generating..." : "Generate Palette"}
      </button>
    </div>
  );
}
