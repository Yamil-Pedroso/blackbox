const motionPrinciples = [
  {
    title: "Continuity",
    text: "Motion should connect one state with the next, not decorate randomly.",
    animation: "continuity",
  },
  {
    title: "Attention",
    text: "Animation can guide the eye toward what changed or what matters.",
    animation: "attention",
  },
  {
    title: "Feedback",
    text: "Hover, tap, drag and loading states tell the user the system is alive.",
    animation: "feedback",
  },
  {
    title: "Restraint",
    text: "The best motion feels intentional, fast and almost invisible.",
    animation: "restraint",
  },
];

const MotionDemo = ({ type }: { type: string }) => {
  if (type === "continuity") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-4 top-1/2 h-1 w-[72%] -translate-y-1/2 rounded-full bg-primary/10" />

        <div
          className="
          absolute left-4 top-1/2
          h-10 w-10
          -translate-y-1/2
          rounded-2xl
          border border-primary/30
          bg-primary/10

          transition-all
          duration-[2200ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:left-[72%]
          group-hover:rotate-45
        "
        />
      </div>
    );
  }

  if (type === "attention") {
    return (
      <div className="grid h-full w-full place-items-center">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-primary/20 transition duration-700 group-hover:scale-[2.4] group-hover:opacity-0" />
          <div className="relative h-12 w-12 rounded-full border border-primary/30 bg-primary/20 transition duration-500 group-hover:scale-125" />
        </div>
      </div>
    );
  }

  if (type === "feedback") {
    return (
      <div className="grid h-full w-full place-items-center">
        <button className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-[0.2em] transition duration-200 group-hover:scale-95 group-hover:bg-primary group-hover:text-black">
          Press
        </button>
      </div>
    );
  }

  return (
    <div className="grid h-full w-full place-items-center">
      <div className="h-14 w-14 rounded-2xl border border-primary/30 bg-primary/10 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105" />
    </div>
  );
};

const MotionPrinciples = () => {
  return (
    <section className="uiux-reveal mt-32">
      <div className="mb-10 max-w-3xl">
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
          Motion Lab
        </p>

        <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
          Animation is state becoming visible.
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {motionPrinciples.map((item) => (
          <article
            key={item.title}
            className="group rounded-[2rem] border border-primary/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/10"
          >
            <div className="mb-8 h-28 overflow-hidden rounded-[1.5rem] bg-black/10">
              <MotionDemo type={item.animation} />
            </div>

            <h3 className="font-geist text-2xl font-black">{item.title}</h3>

            <p className="mt-4 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MotionPrinciples;
