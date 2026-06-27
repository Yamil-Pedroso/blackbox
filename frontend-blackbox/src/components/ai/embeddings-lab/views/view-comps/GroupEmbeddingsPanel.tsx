import { useState } from "react";
import { motion } from "framer-motion";
import { useGroupEmbeddings } from "../../../../../lib/hooks/ai/useEmbeddings";

const defaultTexts = `I love React
Vue is a frontend framework
The dog is running
Cats are cute`;

const groupColors = [
  "border-green/40 bg-green/10",
  "border-neutral-700 bg-main-bg",
  "border-green/30 bg-secondary-bg",
  "border-neutral-800 bg-main-bg/70",
];

export function GroupEmbeddingsPanel() {
  const [textsValue, setTextsValue] = useState(defaultTexts);
  const { data, isLoading, error, execute } = useGroupEmbeddings();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const texts = textsValue
      .split("\n")
      .map((text) => text.trim())
      .filter(Boolean);
    void execute({ texts });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
      <form onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-primary">
          Texts to group, one per line
          <textarea
            value={textsValue}
            onChange={(event) => setTextsValue(event.target.value)}
            rows={10}
            className="border border-neutral-800 bg-main-bg px-4 py-3 font-ibm-plex-mono text-sm font-normal leading-6 text-primary outline-none focus:border-green"
          />
        </label>
        {error && (
          <p className="mt-4 border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 min-h-11 w-full bg-green px-5 font-ibm-plex-mono text-xs font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Grouping..." : "Group related texts"}
        </button>
      </form>

      <div className="min-h-80 border border-neutral-800 bg-main-bg p-5 text-primary sm:p-6">
        {!data ? (
          <div className="flex h-full min-h-72 items-center justify-center text-center text-sm text-secondary">
            The demo will compare vectors and build simple similarity groups.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {data.groups.map((group, groupIndex) => (
              <article
                key={`${group.topic}-${groupIndex}`}
                className={`border p-4 text-primary ${
                  groupColors[groupIndex % groupColors.length]
                }`}
              >
                <p className="font-ibm-plex-mono text-xs uppercase text-green">
                  Group {groupIndex + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{group.topic}</h3>
                <div className="mt-4 grid gap-2">
                  {group.items.map((item) => (
                    <div
                      key={item.text}
                      className="border border-neutral-800 bg-secondary-bg p-3"
                    >
                      <p className="text-sm font-semibold text-primary">{item.text}</p>
                      <p className="mt-1 font-ibm-plex-mono text-[10px] text-secondary">
                        centroid similarity {item.similarityToGroup.toFixed(4)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
