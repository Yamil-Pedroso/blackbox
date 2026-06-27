import { useCallback, useState } from "react";
import {
  createLocalTransformerDemo,
  runTransformerDemo,
} from "../../../services/ai/transformersApi";
import type { TransformerDemoResponse } from "../../../types/ai/transformers.types";

export function useTransformerDemo() {
  const [data, setData] = useState<TransformerDemoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDemo = useCallback(async (prompt: string, model?: string) => {
    if (!prompt.trim()) {
      setData(null);
      setError("Type a short prompt to start the Transformer pass.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setData(await runTransformerDemo({ prompt, model }));
    } catch (err) {
      setData(createLocalTransformerDemo(prompt, model));
      setError(
        err instanceof Error
          ? `Backend unavailable, showing local approximation. ${err.message}`
          : "Backend unavailable, showing local approximation.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, runDemo, clear };
}
