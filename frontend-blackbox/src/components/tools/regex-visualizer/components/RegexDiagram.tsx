import type { RegexToken } from "../types/regex.types";
import RegexNode from "./RegexNode";

interface Props {
  tokens: RegexToken[];
}

export default function RegexDiagram({ tokens }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {tokens.map((token, index) => (
        <RegexNode key={index} token={token} />
      ))}
    </div>
  );
}
