import { useState } from "react";

function getLuminance(hex: string) {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16) / 255);

  const [r, g, b] = rgb.map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
  );

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(c1: string, c2: string) {
  const L1 = getLuminance(c1);
  const L2 = getLuminance(c2);

  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export default function ContrastChecker() {
  const [text, setText] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");

  const ratio = getContrast(text, bg);
  const formatted = ratio.toFixed(2);

  const getWCAGLevel = () => {
    if (ratio >= 7) {
      return {
        label: "AAA",
        color: "text-green-400",
        message: "🌟 Pass WCAG AAA",
      };
    }

    if (ratio >= 4.5) {
      return {
        label: "AA",
        color: "text-yellow-400",
        message: "✔ Pass WCAG AA",
      };
    }

    return {
      label: "FAIL",
      color: "text-red-400",
      message: "❌ Fail WCAG",
    };
  };

  const wcag = getWCAGLevel();

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-black">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">
          Contrast Checker (WCAG)
        </h2>

        <p className="text-sm sm:text-base text-gray-400">
          WCAG defines contrast requirements to ensure text is readable.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-lg sm:text-xl">
          Contrast Ratio: <b>{formatted}</b>
        </p>

        <p className={wcag.color}>{wcag.message}</p>

        <div className="text-sm text-gray-400 space-y-1">
          <p>AA (4.5): {ratio >= 4.5 ? "✔ Pass" : "❌ Fail"}</p>
          <p>AAA (7.0): {ratio >= 7 ? "✔ Pass" : "❌ Fail"}</p>
        </div>
      </div>

      <div
        className="p-6 sm:p-8 rounded text-lg border border-white/10 w-full"
        style={{ color: text, background: bg }}
      >
        Sample Text Preview
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Text</label>
          <input
            type="color"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-16 h-10 p-0 border-0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Background</label>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="w-16 h-10 p-0 border-0"
          />
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Tip: Higher contrast improves readability and accessibility for all
        users.
      </div>
    </div>
  );
}
