import BlackboxMascot3D from "./BlackboxMacot3D";

const UIUXLabIntro = () => {
  return (
    <section className="uiux-hero mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-primary/10 bg-white/5 p-6 backdrop-blur md:p-10">
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-60">
          UI/UX Laboratory
        </p>

        <h1 className="mt-5 max-w-4xl font-geist text-4xl font-black leading-tight md:text-6xl">
          Designing interfaces like systems, not decorations.
        </h1>

        <p className="mt-6 max-w-2xl font-ibm-plex-mono text-base leading-relaxed opacity-75 md:text-lg">
          This module explores visual hierarchy, interaction design, motion,
          accessibility, component anatomy and product thinking through
          interactive experiments.
        </p>
      </div>

      <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-primary/10 bg-neutral-600 p-5">
        <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-green-300 blur-3xl" />

        <div className="relative grid h-full place-items-center">
          <div className="h-60 w-full">
            <BlackboxMascot3D />
          </div>

          <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.3em] text-white/60 bg-stone-800 p-4">
            Observe · Decide · Refine
          </p>
        </div>
      </div>
    </section>
  );
};

export default UIUXLabIntro;
