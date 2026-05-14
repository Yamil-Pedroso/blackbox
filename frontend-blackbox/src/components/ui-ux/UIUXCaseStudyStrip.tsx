const studies = [
  "Dashboard clarity",
  "Mobile navigation",
  "Empty state design",
  "AI response UX",
  "Form conversion",
  "Visual hierarchy",
];

const UIUXCaseStudyStrip = () => {
  return (
    <section className="uiux-reveal mt-32 overflow-hidden rounded-[2rem] border border-primary/10 bg-white/5 p-6 md:p-10">
      <div className="mb-10 max-w-3xl">
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
          Case Studies
        </p>

        <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
          Document the thinking, not only the final screen.
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {studies.map((study, index) => (
          <article
            key={study}
            className="min-w-[260px] rounded-[1.5rem] border border-primary/10 bg-black/10 p-5 transition hover:-translate-y-2 hover:bg-white/10"
          >
            <span className="font-ibm-plex-mono text-xs opacity-40">
              Study 0{index + 1}
            </span>

            <h3 className="mt-8 font-geist text-2xl font-black">{study}</h3>

            <p className="mt-4 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
              Problem → hypothesis → interface decision → interaction → result.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UIUXCaseStudyStrip;
