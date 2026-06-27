import { ArrowDown, Cpu, Layers3, Sparkles } from "lucide-react";
import ArchitectureDiagram from "./view-comps/ArchitectureDiagram";
import AttentionVisualizer from "./view-comps/AttentionVisualizer";
import ComponentCards from "./view-comps/ComponentCards";
import TokenPredictionDemo from "./view-comps/TokenPredictionDemo";
import TransformerFlowDiagram from "./view-comps/TransformerFlowDiagram";
import TransformerGlossary from "./view-comps/TransformerGlossary";
import TransformerResources from "./view-comps/TransformerResources";
import { useTransformerExplanation } from "../../../../lib/hooks/ai/useTransformerExplanation";
import type { TransformerTopic } from "../../../../types/ai/transformers.types";

const topics: { label: string; value: TransformerTopic }[] = [
  { label: "Transformer", value: "transformer" },
  { label: "LLM Flow", value: "llm-flow" },
  { label: "Self-Attention", value: "self-attention" },
  { label: "Multi-Head", value: "multi-head-attention" },
  { label: "Position", value: "positional-encoding" },
  { label: "Add & Norm", value: "add-and-norm" },
  { label: "Token Prediction", value: "token-prediction" },
];

const SectionHeading = ({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) => (
  <div className="mb-8 max-w-3xl">
    <span className="font-ibm-plex-mono text-xs uppercase text-green">
      {eyebrow}
    </span>
    <h2 className="mt-3 text-3xl text-primary md:text-4xl">{title}</h2>
    <p className="mt-4 font-ibm-plex-mono text-sm leading-relaxed text-secondary">
      {body}
    </p>
  </div>
);

const TransformersView = () => {
  const { topic, setTopic, data, loading, error } =
    useTransformerExplanation("transformer");

  return (
    <div className="px-5 py-8 md:px-10 xl:px-8">
      <div className="mx-auto max-w-7xl space-y-24">
        <section className="relative overflow-hidden border border-neutral-800 bg-secondary-bg p-6 md:p-10">
          <div className="absolute right-6 top-6 hidden gap-2 md:flex">
            {["Q", "K", "V"].map((label) => (
              <span
                key={label}
                className="grid h-10 w-10 place-items-center border border-green/40 font-ibm-plex-mono text-xs text-green"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="max-w-3xl">
            <span className="font-ibm-plex-mono text-xs uppercase text-green">
              Intelligence Layer / Architecture
            </span>
            <h1 className="mt-5 text-4xl leading-tight text-primary md:text-6xl">
              Transformers: The Architecture Behind LLMs
            </h1>
            <p className="mt-6 max-w-2xl font-ibm-plex-mono text-sm leading-relaxed text-secondary">
              A visual module for understanding how text becomes tokens,
              embeddings, attention patterns, layer activations, probabilities,
              and finally the next generated token.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                "Parallel context",
                "Tokens compare themselves to the full sequence.",
              ],
              [
                "Stacked layers",
                "Attention and feed forward blocks repeat deeply.",
              ],
              ["Next token loop", "Generation repeats one token at a time."],
            ].map(([title, body]) => (
              <div
                key={title}
                className="border border-neutral-800 bg-main-bg p-4"
              >
                <h3 className="text-primary">{title}</h3>
                <p className="mt-2 font-ibm-plex-mono text-xs leading-relaxed text-secondary">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="01 / What"
            title="What is a Transformer?"
            body="A Transformer is a sequence model built around attention. Instead of reading text strictly left-to-right, it lets tokens compare with other tokens and build richer context-aware representations."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="border border-neutral-800 bg-secondary-bg p-5">
              <div className="flex flex-wrap gap-2">
                {topics.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setTopic(item.value)}
                    className={`border px-3 py-2 font-ibm-plex-mono text-xs transition-colors ${
                      topic === item.value
                        ? "border-green bg-green text-black"
                        : "border-neutral-800 text-secondary hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 min-h-44 border border-neutral-800 bg-main-bg p-5">
                {loading && (
                  <div className="font-ibm-plex-mono text-sm text-secondary">
                    Loading explanation...
                  </div>
                )}
                {error && (
                  <div className="font-ibm-plex-mono text-sm text-red-300">
                    {error}
                  </div>
                )}
                {data && !loading && (
                  <>
                    <h3 className="text-2xl text-primary">{data.title}</h3>
                    <p className="mt-3 font-ibm-plex-mono text-sm leading-relaxed text-secondary">
                      {data.description}
                    </p>
                    <div className="mt-5 grid gap-2">
                      {data.steps.map((step, index) => (
                        <div
                          key={step}
                          className="flex gap-3 border border-neutral-800 p-3 font-ibm-plex-mono text-xs text-secondary"
                        >
                          <span className="text-green">0{index + 1}</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border border-neutral-800 bg-secondary-bg p-5">
              <div className="grid h-full min-h-80 place-items-center">
                <div className="relative h-64 w-64">
                  <div className="absolute inset-0 border border-green/40" />
                  <div className="absolute inset-8 border border-blue-400/40" />
                  <div className="absolute inset-16 border border-white/20" />
                  <Cpu className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-green" />
                  <Sparkles className="absolute right-8 top-7 h-5 w-5 animate-pulse text-blue-400" />
                  <Layers3 className="absolute bottom-8 left-8 h-5 w-5 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="02 / Flow"
            title="High-level LLM flow"
            body="A language model turns raw text into a chain of representations, then predicts what token is likely to come next."
          />
          <TransformerFlowDiagram />
        </section>

        <section>
          <SectionHeading
            eyebrow="03 / Architecture"
            title="Encoder / Decoder architecture"
            body="Classic Transformers include encoders and decoders. Modern chat LLMs often use decoder-only stacks, but the same attention-centered building blocks remain central."
          />
          <ArchitectureDiagram />
        </section>

        <section>
          <SectionHeading
            eyebrow="04 / Attention"
            title="Self-attention and multi-head attention"
            body="Attention is the routing mechanism: each token decides how strongly it should listen to other tokens. Multi-head attention repeats this through several learned views."
          />
          <AttentionVisualizer
            tokens={["The", "cat", "sits", "on", "the", "mat"]}
          />
        </section>

        <section>
          <SectionHeading
            eyebrow="05 / Components"
            title="Key Transformer components"
            body="The full block is a compact rhythm: attention, residual connection, normalization, feed forward network, residual connection, normalization."
          />
          <ComponentCards />
        </section>

        <section>
          <SectionHeading
            eyebrow="06 / Interactive"
            title="Try it: Transformer demo"
            body="Run a simulated forward pass. The goal is visualization and intuition, so the attention weights are approximate rather than model-internal measurements."
          />
          <TokenPredictionDemo />
        </section>

        <section>
          <SectionHeading
            eyebrow="07 / Vocabulary"
            title="Glossary"
            body="A few compact definitions for the terms that appear across Transformer papers, model cards, and LLM tooling."
          />
          <TransformerGlossary />
        </section>

        <section className="pb-16">
          <TransformerResources />
          <div className="mt-8 flex items-center gap-3 font-ibm-plex-mono text-xs text-secondary">
            <ArrowDown className="h-4 w-4 text-green" />
            Next topic idea: compare decoder-only LLMs with encoder-only
            embedding models.
          </div>
        </section>
      </div>
    </div>
  );
};

export default TransformersView;
