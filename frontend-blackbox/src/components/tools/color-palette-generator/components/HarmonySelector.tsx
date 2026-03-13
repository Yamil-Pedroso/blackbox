import Tooltip from "./ui/Tooltip";

type Props = {
  harmony: string;
  setHarmony: (value: string) => void;
};

export default function HarmonySelector({ harmony, setHarmony }: Props) {
  const modes = ["monochrome", "complementary", "analogous", "triadic"];

  return (
    <div className="flex gap-3 flex-wrap">
      {modes.map((mode) => (
        <Tooltip key={mode} text={`Set harmony to ${mode}`}>
          <button
            onClick={() => setHarmony(mode)}
            className={`px-3 py-1 text-xs border transition-colors
            ${harmony === mode ? "border-primary text-primary" : "border-neutral-700"}
          `}
          >
            {mode}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
