const anatomyItems = [
  {
    label: "Container",
    color: "bg-cyan-300/20 border-cyan-300/40 text-cyan-100",
  },
  {
    label: "Spacing",
    color: "bg-violet-300/20 border-violet-300/40 text-violet-100",
  },
  {
    label: "Typography",
    color: "bg-amber-300/20 border-amber-300/40 text-amber-100",
  },
  {
    label: "Visual State",
    color: "bg-emerald-300/20 border-emerald-300/40 text-emerald-100",
  },
  {
    label: "Action",
    color: "bg-rose-300/20 border-rose-300/40 text-rose-100",
  },
  {
    label: "Feedback",
    color: "bg-sky-300/20 border-sky-300/40 text-sky-100",
  },
];

const ComponentAnatomy = () => {
  return (
    <section className="uiux-reveal mt-32 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          Component Anatomy
        </p>

        <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
          A component is a small product decision.
        </h2>

        <p className="mt-6 font-ibm-plex-mono text-base leading-relaxed opacity-70">
          Each UI element has structure, purpose, states and feedback. A button
          is not just a rectangle; it is a promise of action.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-linear-to-br from-cyan-300/10 via-violet-300/10 to-rose-300/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-rose-300/20 blur-3xl" />

        <div className="relative rounded-[1.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur">
          <div className="rounded-[1.25rem] border border-cyan-300/30 bg-white/10 p-5 shadow-2xl">
            <div className="mb-5 flex gap-2">
              <span className="h-3 w-10 rounded-full bg-cyan-300/70" />
              <span className="h-3 w-6 rounded-full bg-violet-300/70" />
              <span className="h-3 w-14 rounded-full bg-rose-300/70" />
            </div>

            <h3 className="font-geist text-2xl font-black">Smart UI Card</h3>

            <p className="mt-3 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
              Explains, guides and reacts according to user context.
            </p>

            <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-4">
              <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.2em] text-emerald-100">
                State: Ready to interact
              </p>
            </div>

            <button className="mt-6 rounded-full border border-rose-300/40 bg-rose-300/20 px-5 py-3 font-ibm-plex-mono text-sm uppercase tracking-[0.2em] text-rose-100 transition hover:-translate-y-1 hover:bg-rose-300 hover:text-black">
              Explore
            </button>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {anatomyItems.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border p-4 text-center font-ibm-plex-mono text-xs uppercase tracking-[0.18em] transition hover:-translate-y-1 ${item.color}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComponentAnatomy;
