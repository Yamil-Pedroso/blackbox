import { ArrowRight } from "lucide-react";

const steps = [
  "Input Text",
  "Tokenization",
  "Embeddings",
  "Transformer Layers",
  "Output Probabilities",
  "Next Token",
];

const TransformerFlowDiagram = () => {
  return (
    <div className="grid gap-3 md:grid-cols-[repeat(6,minmax(0,1fr))]">
      {steps.map((step, index) => (
        <div key={step} className="relative">
          <div className="min-h-28 border border-neutral-800 bg-secondary-bg p-4 flex flex-col justify-between">
            <span className="font-ibm-plex-mono text-[11px] text-green">
              0{index + 1}
            </span>
            <strong className="text-primary text-sm leading-tight">{step}</strong>
            <div className="h-2 bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-green animate-pulse"
                style={{ width: `${35 + index * 10}%` }}
              />
            </div>
          </div>

          {index < steps.length - 1 && (
            <ArrowRight className="hidden md:block absolute -right-5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-green" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TransformerFlowDiagram;
