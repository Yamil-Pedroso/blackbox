import { useState, useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchScrapedWebsite } from "../../../services/ai/scrapedWebsiteService";
import { toast } from "sonner";

export function useScrapedWebsite() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const message =
    "Ollama 3.2 is running locally on our VPS. This may take a little longer than OpenAI. Please wait while the model analyzes the website.";

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
    mutationFn: fetchScrapedWebsite,
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

  useEffect(() => {
    if (!mutation.isPending) return;

    const timer = setTimeout(() => {
      toast.info(message, {
        duration: 15000,
        closeButton: true,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, mutation.isPending]);

  useEffect(() => clearProgressInterval, [clearProgressInterval]);

  const scrape = useCallback(
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
    data: mutation.data ? [mutation.data] : [],
    loading: mutation.isPending,
    error,
    progress,
    status,
    scrape,
  };
}
