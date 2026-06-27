import type { AttentionRow } from "../../../../../types/ai/transformers.types";

type AttentionVisualizerProps = {
  tokens: string[];
  attention?: AttentionRow[];
};

const defaultTokens = ["The", "cat", "sits", "on", "the", "mat"];

const AttentionVisualizer = ({
  tokens = defaultTokens,
  attention,
}: AttentionVisualizerProps) => {
  const rows =
    attention ??
    defaultTokens.map((fromToken, rowIndex) => ({
      fromToken,
      toTokens: defaultTokens.map((token, tokenIndex) => ({
        token,
        weight: Number((1 / (Math.abs(rowIndex - tokenIndex) + 2)).toFixed(2)),
      })),
    }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div className="border border-neutral-800 bg-secondary-bg p-5">
        <h3 className="mb-5 text-xl text-primary">Self-attention map</h3>
        <div className="space-y-4">
          {rows.slice(0, 6).map((row) => (
            <div
              key={row.fromToken}
              className="grid grid-cols-[70px_1fr] gap-3"
            >
              <span className="font-ibm-plex-mono text-xs text-green">
                {row.fromToken}
              </span>
              <div className="grid grid-cols-6 gap-1">
                {row.toTokens.slice(0, 6).map((target) => (
                  <div
                    key={`${row.fromToken}-${target.token}`}
                    className="h-8 border border-neutral-800"
                    title={`${row.fromToken} -> ${target.token}: ${target.weight}`}
                    style={{
                      backgroundColor: `rgba(91, 238, 108, ${Math.max(
                        target.weight,
                        0.08,
                      )})`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-neutral-800 bg-secondary-bg p-5">
        <h3 className="mb-5 text-xl text-primary">Tokens exchanging context</h3>
        <svg viewBox="0 0 620 230" className="h-64 w-full">
          {tokens.slice(0, 6).map((token, index) => {
            const x = 70 + index * 95;
            return (
              <g key={token}>
                <circle
                  cx={x}
                  cy="115"
                  r="24"
                  fill="#181818"
                  stroke="#5bee6c"
                />
                <text
                  x={x}
                  y="120"
                  textAnchor="middle"
                  fill="currentColor"
                  className="text-[12px] text-primary"
                >
                  {token}
                </text>
              </g>
            );
          })}
          {tokens.slice(0, 6).map((_, index) =>
            tokens.slice(index + 1, 6).map((__, targetIndex) => {
              const startX = 70 + index * 95;
              const endX = 70 + (targetIndex + index + 1) * 95;
              const opacity = 0.12 + 0.12 / (targetIndex + 1);

              return (
                <path
                  key={`${index}-${targetIndex}`}
                  d={`M ${startX} 92 C ${startX + 30} ${30 + targetIndex * 12}, ${
                    endX - 30
                  } ${30 + targetIndex * 12}, ${endX} 92`}
                  fill="none"
                  stroke="#5bee6c"
                  strokeWidth="2"
                  opacity={opacity}
                />
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
};

export default AttentionVisualizer;
