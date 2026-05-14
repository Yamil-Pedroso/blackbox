const checks = [
  "Readable contrast",
  "Keyboard navigation",
  "Visible focus states",
  "Clear labels",
  "Reduced motion support",
  "Useful error messages",
];

const AccessibilityChecklist = () => {
  return (
    <section className="uiux-reveal mt-32 rounded-[2rem] border border-primary/10 bg-white/5 p-6 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
            Accessibility
          </p>

          <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
            Good design includes more people.
          </h2>

          <p className="mt-6 font-ibm-plex-mono text-base leading-relaxed opacity-70">
            Accessibility is not an extra layer. It belongs inside the design
            system: colors, states, text, navigation and motion.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {checks.map((check, index) => (
            <div
              key={check}
              className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-black/10 p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/20 font-ibm-plex-mono text-xs">
                {index + 1}
              </span>

              <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.12em]">
                {check}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessibilityChecklist;
