const steps = [
  "Idea",
  "Problem",
  "Solution",
  "Features",
  "UX Flow",
  "Architecture",
  "Implementation",
  "Testing",
  "Release",
];

const AppCreationFlow = () => {
  return (
    <div className="border border-neutral-800 p-6 bg-secondary-bg">
      <h3 className="text-primary font-geist text-xl mb-6">
        App Creation Flow
      </h3>

      <div className="flex flex-wrap gap-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center text-xs font-ibm-plex-mono"
          >
            <span className="px-3 py-2 border border-neutral-700">{step}</span>

            {index < steps.length - 1 && (
              <span className="mx-2 text-neutral-500">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppCreationFlow;
