const resources = [
  "Attention is all you need",
  "Tokenization and embeddings",
  "Decoder-only language models",
  "Sampling strategies: greedy, top-k, top-p",
];

const TransformerResources = () => {
  return (
    <div className="border border-neutral-800 bg-secondary-bg p-5">
      <h2 className="mb-4 text-2xl text-primary">Resources / next topics</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {resources.map((resource, index) => (
          <div
            key={resource}
            className="flex items-center gap-3 border border-neutral-800 bg-main-bg p-4"
          >
            <span className="font-ibm-plex-mono text-xs text-green">
              0{index + 1}
            </span>
            <span className="text-sm text-secondary">{resource}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransformerResources;
