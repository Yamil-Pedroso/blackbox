import { useState } from "react";
import { exportTailwindPalette } from "../logic/exportTailwindPalette";

type Props = {
  palette: string[];
};

export default function ExportTailwindPalette({ palette }: Props) {
  const [copied, setCopied] = useState(false);

  const handleExport = async () => {
    const code = exportTailwindPalette(palette);

    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors"
    >
      {copied ? "Copied Tailwind!" : "Export Tailwind Palette"}
    </button>
  );
}
