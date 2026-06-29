import type { TFunction } from "i18next";

interface TokenChipsProps {
  tokens: string[];
  activeIndex?: number;
  t: TFunction<"exploreMiniAppsAi">;
}

function visibleToken(token: string): string {
  return token
    .replaceAll(" ", "·")
    .replaceAll("\n", "↵")
    .replaceAll("\t", "→");
}

export function TokenChips({
  tokens,
  activeIndex,
  t,
}: TokenChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((token, index) => (
        <span
          key={`${index}-${token}`}
          className={`border px-2.5 py-1 font-ibm-plex-mono text-xs font-semibold transition ${
            activeIndex === index
              ? "border-green bg-green text-black"
              : "border-neutral-800 bg-secondary-bg text-primary"
          }`}
          title={t("autoregressiveInference.chips.title", {
            number: index + 1,
            token: JSON.stringify(token),
          })}
        >
          {visibleToken(token)}
        </span>
      ))}
    </div>
  );
}
