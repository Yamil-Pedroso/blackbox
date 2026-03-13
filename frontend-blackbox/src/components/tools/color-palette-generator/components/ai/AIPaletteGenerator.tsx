import { useState } from "react";
import { generateAIPalette } from "../../services/aiPalette.service";
import { RiRobot3Line } from "react-icons/ri";

type Props = {
  setPalette: (colors: string[]) => void;
};

export default function AIPaletteGenerator({ setPalette }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const palette = await generateAIPalette(prompt);
      setPalette(palette);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="mt-16 space-y-4">
      <div className=" flex font-semibold items-end">
        <RiRobot3Line className="inline-block mr-2 text-cyan-400 text-4xl" />
        <p className="inline">Palette Generator</p>
      </div>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="cyberpunk, forest, sunset..."
        className="border border-neutral-700 px-3 py-2 w-full max-w-md bg-transparent outline-0"
      />

      <button
        onClick={generate}
        disabled={loading}
        className={` px-4 py-2 bg-transparent flex items-center justify-center w-40 transition ${
          loading
            ? "border-transparent"
            : "border border-neutral-700 hover:border-primary"
        }`}
      >
        {loading ? <span className="loader"></span> : "Generate Palette"}
      </button>
    </div>
  );
}
