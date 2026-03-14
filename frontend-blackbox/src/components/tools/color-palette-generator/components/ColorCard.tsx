import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  hex: string;
  rgb: string;
  hsl: string;
  index: number;
};

export default function ColorCard({ hex, rgb, hsl, index }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);

    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      onClick={() => setOpen(!open)}
      onMouseLeave={() => setOpen(false)}
      className="
        relative
        aspect-square
        h-24 sm:h-32 md:h-40 lg:h-56 xl:h-80 w-25
        cursor-pointer
        group
        transition-transform
        hover:scale-y-105
        duration-300
      "
      style={{ background: hex }}
    >
      <div
        className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2
        bg-secondary-bg text-white
        text-[10px] sm:text-xs
        font-ibm-plex-mono
        p-4 space-y-1
        w-42
        shadow-lg
        border
        opacity-0
        transition-opacity duration-200
        pointer-events-auto
        hover:opacity-100
        group-hover:opacity-100
        z-0`}
      >
        <div
          className="cursor-pointer hover:text-primary hover:font-bold flex items-center gap-2"
          onClick={() => copy(hex)}
        >
          {copied === hex ? "Copied!" : hex}
        </div>

        <div
          className="cursor-pointer hover:text-primary hover:font-bold"
          onClick={() => copy(rgb)}
        >
          {copied === rgb ? "Copied!" : rgb}
        </div>

        <div
          className="cursor-pointer hover:text-primary hover:font-bold"
          onClick={() => copy(hsl)}
        >
          {copied === hsl ? "Copied!" : hsl}
        </div>
      </div>
    </motion.div>
  );
}
