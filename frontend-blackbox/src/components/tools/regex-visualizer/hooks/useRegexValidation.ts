import { useMemo } from "react";

export function useRegexValidation(pattern: string) {
  return useMemo(() => {
    try {
      new RegExp(pattern);
      return {
        isValid: true,
        error: null,
      };
    } catch (e) {
      return {
        isValid: false,
        error: (e as Error).message,
      };
    }
  }, [pattern]);
}
