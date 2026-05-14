const areas = [
  {
    title: "Foundations",
    text: "Typography, spacing, color, contrast, hierarchy and rhythm.",
  },
  {
    title: "UX Thinking",
    text: "User flows, cognitive load, friction, decision points and feedback.",
  },
  {
    title: "Motion Logic",
    text: "Animation as meaning: state changes, attention, continuity and delight.",
  },
  {
    title: "Accessibility",
    text: "Contrast, keyboard navigation, focus states, readable structure and reduced motion.",
  },
];

const UIUXDeepMap = () => {
  return (
    <section className="uiux-reveal mt-32">
      <div className="mb-10 max-w-3xl">
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
          Deep Structure
        </p>

        <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
          A UI is a chain of decisions.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {areas.map((area, index) => (
          <article
            key={area.title}
            className="group min-h-[260px] rounded-[2rem] border border-primary/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/10"
          >
            <span className="font-ibm-plex-mono text-xs opacity-40">
              0{index + 1}
            </span>

            <h3 className="mt-8 font-geist text-2xl font-bold">{area.title}</h3>

            <p className="mt-4 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
              {area.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UIUXDeepMap;
