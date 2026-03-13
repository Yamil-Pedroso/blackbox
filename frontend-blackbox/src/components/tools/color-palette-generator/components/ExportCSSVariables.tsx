import { useState } from "react";
import { exportCSSVariables } from "../logic/exportCSSVariables";
import { FaCopy } from "react-icons/fa";
import { RiEmotionHappyLine } from "react-icons/ri";

type Props = {
  palette: string[];
};

export default function ExportCSSVariables({ palette }: Props) {
  const [copied, setCopied] = useState(false);

  const handleExport = async () => {
    const css = exportCSSVariables(palette);

    await navigator.clipboard.writeText(css);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors "
    >
      <div className="flex items-center gap-2">
        {copied ? <RiEmotionHappyLine /> : <FaCopy />}
        {copied ? "Copied CSS!" : "Copy CSS Variables"}{" "}
      </div>
    </button>
  );
}
