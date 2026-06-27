interface TokenChipsProps {
  tokens: string[];
  activeIndex?: number;
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
          title={`Token ${index + 1}: ${JSON.stringify(token)}`}
        >
          {visibleToken(token)}
        </span>
      ))}
    </div>
  );
}
