import {
  Binary,
  BrainCircuit,
  GitMerge,
  Layers3,
  MoveHorizontal,
  Network,
  Sigma,
  Waypoints,
} from "lucide-react";

const components = [
  {
    title: "Self-Attention",
    icon: Waypoints,
    body: "Scores token-to-token relationships and blends the most useful context.",
  },
  {
    title: "Multi-Head Attention",
    icon: Network,
    body: "Runs several attention patterns in parallel, then merges them.",
  },
  {
    title: "Positional Encoding",
    icon: MoveHorizontal,
    body: "Adds order information so the model knows where tokens sit.",
  },
  {
    title: "Feed Forward Network",
    icon: BrainCircuit,
    body: "Transforms each contextual token vector through learned nonlinear layers.",
  },
  {
    title: "Add & Norm",
    icon: GitMerge,
    body: "Stabilizes deep stacks with residual paths and normalization.",
  },
  {
    title: "Token Prediction",
    icon: Sigma,
    body: "Turns final vectors into vocabulary probabilities.",
  },
  {
    title: "Embeddings",
    icon: Binary,
    body: "Represent each token as a dense vector the network can compute with.",
  },
  {
    title: "Transformer Layers",
    icon: Layers3,
    body: "Repeat attention, residual, normalization, and feed forward blocks.",
  },
];

const ComponentCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {components.map((component) => {
        const Icon = component.icon;

        return (
          <article
            key={component.title}
            className="min-h-48 border border-neutral-800 bg-secondary-bg p-5 transition-colors hover:border-green/60"
          >
            <Icon className="mb-7 h-6 w-6 text-green" />
            <h3 className="mb-3 text-lg text-primary">{component.title}</h3>
            <p className="font-ibm-plex-mono text-xs leading-relaxed text-secondary">
              {component.body}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default ComponentCards;
