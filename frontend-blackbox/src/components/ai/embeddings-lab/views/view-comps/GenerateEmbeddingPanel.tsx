import { useState } from "react";
import { motion } from "framer-motion";
import { useGenerateEmbedding } from "../../../../../lib/hooks/ai/useEmbeddings";

const defaultText = "I love programming with React and Node.js";

export function GenerateEmbeddingPanel() {
  const [text, setText] = useState(defaultText);
  const { data, isLoading, error, execute, reset } = useGenerateEmbedding();
  const visibleValues = data?.embedding.slice(0, 20) ?? [];
  const maxMagnitude = Math.max(
    0.0001,
    ...visibleValues.map((value) => Math.abs(value)),
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void execute({ text });
  }

  function handleClear() {
    setText("");
    reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <form onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-primary">
          Text to embed
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={8}
            placeholder="Enter a sentence or paragraph..."
            className="resize-y border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none placeholder:text-secondary/50 focus:border-green"
          />
        </label>
        {error && (
          <p className="mt-4 border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-11 bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate embedding"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="min-h-11 border border-neutral-800 bg-main-bg px-5 font-ibm-plex-mono text-xs font-semibold text-secondary transition hover:border-green/50 hover:text-primary"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="min-h-80 border border-neutral-800 bg-main-bg p-5 text-primary sm:p-6">
        {!data ? (
          <div className="flex h-full min-h-72 items-center justify-center text-center text-sm text-secondary">
            Generate a vector to inspect its dimensions and first values.
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap gap-4 border-b border-neutral-800 pb-5">
              <div>
                <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
                  Dimensions
                </p>
                <strong className="text-3xl font-semibold text-primary">{data.dimensions}</strong>
              </div>
              <div>
                <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
                  Provider
                </p>
                <strong className="font-ibm-plex-mono text-sm font-semibold text-primary">{data.provider}</strong>
              </div>
              <div>
                <p className="font-ibm-plex-mono text-xs uppercase text-secondary">
                  Model
                </p>
                <strong className="font-ibm-plex-mono text-sm font-semibold text-primary">{data.model}</strong>
              </div>
            </div>

            <p className="mt-5 font-ibm-plex-mono text-xs uppercase text-green">
              First 20 vector values
            </p>
            <div className="mt-3 grid grid-cols-10 gap-1.5">
              {visibleValues.map((value, index) => (
                <div
                  key={index}
                  className="flex h-24 items-center justify-center border border-neutral-800 bg-secondary-bg"
                  title={`${index}: ${value}`}
                >
                  <div
                    className={`w-2 rounded-full ${
                      value >= 0 ? "bg-green" : "bg-secondary"
                    }`}
                    style={{
                      height: `${Math.max(
                        4,
                        (Math.abs(value) / maxMagnitude) * 80,
                      )}%`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {visibleValues.map((value, index) => (
                <span
                  key={index}
                  className="border border-neutral-800 bg-secondary-bg px-2 py-1 font-ibm-plex-mono text-[10px] text-secondary"
                >
                  {value.toFixed(4)}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
