import { useCallback, useEffect, useState } from "react";
import { explainTransformer } from "../../../services/ai/transformersApi";
import type {
  TransformerExplanation,
  TransformerTopic,
} from "../../../types/ai/transformers.types";

export function useTransformerExplanation(initialTopic: TransformerTopic) {
  const [topic, setTopic] = useState<TransformerTopic>(initialTopic);
  const [data, setData] = useState<TransformerExplanation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextTopic: TransformerTopic) => {
    setLoading(true);
    setError(null);

    try {
      setData(await explainTransformer(nextTopic));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load explanation.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(topic);
  }, [load, topic]);

  return { topic, setTopic, data, loading, error };
}
