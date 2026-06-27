import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { summarizeWebsiteWithOpenAI } from "../../../services/ai/openaiSummaryService";

export function useOpenAISummary() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    clearProgressInterval();
    setProgress(15);
    setStatus("Preparing request...");

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev < 35) {
          setStatus("Scraping website...");
          return prev + 5;
        }

        if (prev < 70) {
          setStatus("Cleaning content...");
          return prev + 4;
        }

        if (prev < 92) {
          setStatus("Generating summary...");
          return prev + 2;
        }

        return prev;
      });
    }, 450);
  }, [clearProgressInterval]);

  const mutation = useMutation({
    mutationFn: summarizeWebsiteWithOpenAI,
    onMutate: () => {
      setValidationError(null);
      startProgress();
    },
    onSuccess: () => {
      setProgress(100);
      setStatus("Summary completed");
    },
    onError: () => {
      setProgress(0);
      setStatus("Failed");
    },
    onSettled: clearProgressInterval,
  });

  useEffect(() => clearProgressInterval, [clearProgressInterval]);

  const summarize = useCallback(
    (url: string) => {
      if (!url.trim()) {
        setValidationError("Please enter a valid URL");
        return;
      }

      mutation.reset();
      mutation.mutate(url.trim());
    },
    [mutation],
  );

  const error =
    validationError ??
    (mutation.error instanceof Error
      ? mutation.error.message
      : mutation.error
        ? "Unknown error"
        : null);

  return {
    data: mutation.data ?? null,
    loading: mutation.isPending,
    progress,
    status,
    error,
    summarize,
  };
}
