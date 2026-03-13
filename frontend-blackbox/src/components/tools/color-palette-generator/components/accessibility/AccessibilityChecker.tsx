import { useState } from "react";
import { contrastRatio } from "../../logic/contrastRatio";
import { hslStringToValues } from "../../logic/convertColor";
import { hslToRgb, rgbToHex } from "../../logic/colorFormat";

type Props = {
  palette: string[];
};

function hslToHex(hsl: string) {
  const values = hslStringToValues(hsl);
  if (!values) return "#000000";

  const rgb = hslToRgb(values.h, values.s, values.l);
  const nums = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];

  return rgbToHex(nums[0], nums[1], nums[2]);
}

export default function AccessibilityChecker({ palette }: Props) {
  const [bg, setBg] = useState(palette[0]);
  const [text, setText] = useState(palette[4]);

  const bgHex = hslToHex(bg);
  const textHex = hslToHex(text);

  const ratio = contrastRatio(bgHex, textHex);

  let level = "Fail";

  if (ratio >= 7) level = "AAA";
  else if (ratio >= 4.5) level = "AA";

  return (
    <div className="mt-16 space-y-4">
      <h2 className="text-2xl font-semibold">Accessibility Checker</h2>

      <div className="flex flex-col gap-4">
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

      <div
        className="p-6 rounded-md"
        style={{ background: bgHex, color: textHex }}
      >
        Example Text Preview
      </div>

      <p>Contrast Ratio: {ratio.toFixed(2)}</p>

      <div className="flex items-center gap-3">
        <p>WCAG Level:</p>

        <span
          className={`
      px-2 py-1 rounded text-xs font-semibold
      ${level === "AAA" ? "bg-green-600 text-white" : ""}
      ${level === "AA" ? "bg-yellow-500 text-black" : ""}
      ${level === "Fail" ? "bg-red-600 text-white" : ""}
    `}
        >
          {level}
        </span>
      </div>
    </div>
  );
}
