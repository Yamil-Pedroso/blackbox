import { useState } from "react";
import { contrastRatio } from "../../logic/contrastRatio";

type Props = {
  palette: string[];
};

export default function AccessibilityChecker({ palette }: Props) {
  const [bg, setBg] = useState(palette[0]);
  const [text, setText] = useState(palette[4]);

  const ratio = contrastRatio(bg, text);

  let level = "Fail";

  if (ratio >= 7) level = "AAA";
  else if (ratio >= 4.5) level = "AA";

  return (
    <div className="mt-16 space-y-4">
      <h2 className="text-2xl font-semibold">Accessibility Checker</h2>

      <div className="flex gap-4">
        <select
          value={bg}
          onChange={(e) => setBg(e.target.value)}
          className="border border-neutral-700 px-3 py-2"
        >
          {palette.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-neutral-700 px-3 py-2"
        >
          {palette.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="p-6 rounded-md" style={{ background: bg, color: text }}>
        Example Text Preview
      </div>

      <p>Contrast Ratio: {ratio.toFixed(2)}</p>

      <p>WCAG Level: {level}</p>
    </div>
  );
}
