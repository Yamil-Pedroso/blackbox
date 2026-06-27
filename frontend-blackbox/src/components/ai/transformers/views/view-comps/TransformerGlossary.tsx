const terms = [
  ["Token", "A chunk of text the model processes."],
  ["Embedding", "A numeric vector representing a token."],
  ["Query", "What a token is looking for."],
  ["Key", "What a token offers for matching."],
  ["Value", "The information blended after attention scoring."],
  ["Logits", "Raw next-token scores before probabilities."],
];

const TransformerGlossary = () => {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {terms.map(([term, definition]) => (
        <div key={term} className="border border-neutral-800 bg-secondary-bg p-4">
          <h3 className="text-primary">{term}</h3>
          <p className="mt-2 font-ibm-plex-mono text-xs leading-relaxed text-secondary">
            {definition}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransformerGlossary;
