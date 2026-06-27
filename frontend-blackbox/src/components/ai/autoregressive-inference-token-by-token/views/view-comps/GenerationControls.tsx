import type { TokenInferenceSettings } from "../../../../../types/ai/tokenInference.types";

interface GenerationControlsProps {
  settings: TokenInferenceSettings;
  onChange: (settings: TokenInferenceSettings) => void;
}

export function GenerationControls({
  settings,
  onChange,
}: GenerationControlsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <label className="grid gap-2 font-ibm-plex-mono text-xs font-semibold uppercase text-secondary">
        Max new tokens
        <input
          type="number"
          min={1}
          max={1_000}
          value={settings.maxNewTokens}
          onChange={(event) =>
            onChange({
              ...settings,
              maxNewTokens: Number(event.target.value),
            })
          }
          className="min-h-11 border border-neutral-800 bg-main-bg px-3 text-sm font-normal text-primary outline-none focus:border-green"
        />
      </label>
      <label className="grid gap-2 font-ibm-plex-mono text-xs font-semibold uppercase text-secondary">
        Temperature
        <input
          type="number"
          min={0}
          max={2}
          step={0.1}
          value={settings.temperature}
          onChange={(event) =>
            onChange({
              ...settings,
              temperature: Number(event.target.value),
            })
          }
          className="min-h-11 border border-neutral-800 bg-main-bg px-3 text-sm font-normal text-primary outline-none focus:border-green"
        />
      </label>
      <label className="grid gap-2 font-ibm-plex-mono text-xs font-semibold uppercase text-secondary">
        Top P
        <input
          type="number"
          min={0}
          max={1}
          step={0.05}
          value={settings.topP}
          onChange={(event) =>
            onChange({
              ...settings,
              topP: Number(event.target.value),
            })
          }
          className="min-h-11 border border-neutral-800 bg-main-bg px-3 text-sm font-normal text-primary outline-none focus:border-green"
        />
      </label>
    </div>
  );
}
