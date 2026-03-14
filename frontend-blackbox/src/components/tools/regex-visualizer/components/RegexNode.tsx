import type { RegexToken } from "../types/regex.types";

interface Props {
  token: RegexToken;
}

export default function RegexNode({ token }: Props) {
  return (
    <div className="px-3 py-2 bg-blue-500 text-white rounded text-sm">
      {token.value}
    </div>
  );
}
