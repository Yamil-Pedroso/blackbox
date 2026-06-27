import { useState } from "react";
import { motion } from "framer-motion";
import { useScrapedWebsite } from "../../../../lib/hooks/ai/useScrapedWebsite";
import { ColoredText } from "./ColoredText";

const OllamaScrapedPageView = () => {
  const { data, loading, error, progress, status, scrape } =
    useScrapedWebsite();
  const [inputUrl, setInputUrl] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    scrape(inputUrl);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full min-w-0 flex-col gap-6 text-primary"
    >
      <div>
        <p className="font-ibm-plex-mono text-xs uppercase text-green">
          Ollama Website Scraper
        </p>

        <h1 className="mt-3 text-3xl text-primary md:text-4xl">
          Scrape website content
        </h1>

        <p className="mt-4 max-w-2xl font-ibm-plex-mono text-sm leading-relaxed text-secondary">
          Insert a URL, extract its page content, and preview the scraped text
          response.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://react.dev"
          className="min-h-12 flex-1 border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm text-primary outline-none transition placeholder:text-secondary/50 focus:border-green"
        />

        <button
          type="submit"
          disabled={loading}
          className="min-h-12 border border-green/50 bg-green px-6 py-3 font-ibm-plex-mono text-xs font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Scraping..." : "Scrape"}
        </button>
      </form>

      {(loading || progress > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-neutral-800 bg-main-bg p-4"
        >
          <div className="mb-3 flex justify-between font-ibm-plex-mono text-xs">
            <span className="text-secondary">{status}</span>
            <span className="font-medium text-green">{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden bg-neutral-800">
            <motion.div
              className="h-full bg-green"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-red-500/20 bg-red-500/10 p-4 font-ibm-plex-mono text-sm text-red-300"
        >
          {error}
        </motion.div>
      )}

      {data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <article
            data-lenis-prevent
            className="h-80 overflow-y-auto overflow-x-hidden overscroll-contain border border-neutral-800 bg-main-bg p-5"
          >
            <h2 className="text-2xl text-primary">
              {data[0].title}
            </h2>

            <p className="mt-2 break-all font-ibm-plex-mono text-xs text-green">
              {data[0].url}
            </p>

            <ColoredText text={data[0].summarizedWebsite} variant="emerald" />
          </article>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <Metric label="Model" value={data[0].metrics.model} />
            <Metric label="Time" value={`${data[0].metrics.durationMs}ms`} />
            <Metric
              label="Prompt tokens"
              value={data[0].metrics.promptTokens ?? "N/A"}
            />
            <Metric
              label="Total tokens"
              value={data[0].metrics.totalTokens ?? "N/A"}
            />
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="border border-neutral-800 bg-main-bg p-4"
    >
      <p className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.14em] text-green">
        {label}
      </p>

      <p className="mt-2 break-all font-ibm-plex-mono text-sm font-semibold text-primary">
        {value}
      </p>
    </motion.div>
  );
}

export default OllamaScrapedPageView;
