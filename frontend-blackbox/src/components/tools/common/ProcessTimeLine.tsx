type Step = {
  title: string;
  description: string;
};

type Props = {
  steps: Step[];
};

export default function ProcessTimeline({ steps }: Props) {
  return (
    <div className="space-y-6 border-l border-neutral-800 pl-6">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-3.5 top-1 w-3 h-3 bg-primary rounded-full" />

          <h3 className="text-primary font-geist text-lg">{step.title}</h3>

          <p className="text-secondary font-ibm-plex-mono text-sm">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
