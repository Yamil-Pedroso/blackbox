import { useMemo } from "react";
import { parseRegex } from "../logic/parseRegex";

export function useRegexParser(pattern: string) {
  const tokens = useMemo(() => {
    if (!pattern) return [];
    return parseRegex(pattern);
  }, [pattern]);

  return tokens;
}
