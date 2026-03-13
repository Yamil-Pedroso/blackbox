import { useState } from "react";

type Props = {
  palette: string[];
};

export default function CopyPalette({ palette }: Props) {
  const [copied, setCopied] = useState(false);

  const copyPalette = async () => {
    const text = palette.join("\n");

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={copyPalette}
      className="px-4 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors"
    >
      {copied ? "Copied!" : "Copy Palette"}
    </button>
  );
}
