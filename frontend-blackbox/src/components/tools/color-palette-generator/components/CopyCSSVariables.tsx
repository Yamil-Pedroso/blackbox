import { useState } from "react";
import { copyCSSVariables } from "../logic/copyCSSVariables";
import { FaCopy } from "react-icons/fa";
import { RiEmotionHappyLine } from "react-icons/ri";

type Props = {
  palette: string[];
};

export default function CopyCSSVariables({ palette }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const css = copyCSSVariables(palette);

    await navigator.clipboard.writeText(css);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors "
    >
      <div className="flex items-center gap-2">
        {copied ? <RiEmotionHappyLine /> : <FaCopy />}
        {copied ? "Copied CSS!" : "Copy CSS Variables"}{" "}
      </div>
    </button>
  );
}
