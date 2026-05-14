const BeforeAfterUX = () => {
  return (
    <section className="uiux-reveal mt-32">
      <div className="mb-10 max-w-3xl">
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
          Before / After
        </p>

        <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
          Same feature, different experience.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-6">
          <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.3em] opacity-60">
            Before
          </p>

          <div className="mt-6 space-y-4 rounded-[1.5rem] border border-red-500/20 bg-black/10 p-5">
            <div className="h-5 w-2/3 rounded-full bg-red-500/20" />
            <div className="h-5 w-full rounded-full bg-red-500/20" />
            <div className="h-5 w-4/5 rounded-full bg-red-500/20" />
            <button className="mt-4 w-full rounded-xl border border-red-500/20 p-4 font-ibm-plex-mono text-sm uppercase">
              Submit
            </button>
          </div>

          <p className="mt-5 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
            The user sees information, but the hierarchy is weak and the action
            feels generic.
          </p>
        </article>

        <article className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-6">
          <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.3em] opacity-60">
            After
          </p>

          <div className="mt-6 space-y-4 rounded-[1.5rem] border border-emerald-500/20 bg-black/10 p-5">
            <div className="h-4 w-24 rounded-full bg-emerald-500/20" />
            <h3 className="font-geist text-2xl font-black">
              Request a service
            </h3>
            <p className="font-ibm-plex-mono text-sm opacity-70">
              Tell us what you need and we will contact you with the next step.
            </p>
            <button className="mt-4 w-full rounded-xl bg-emerald-500/20 p-4 font-ibm-plex-mono text-sm uppercase transition hover:-translate-y-1">
              Send request
            </button>
          </div>

          <p className="mt-5 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
            The same action now has context, direction and a clearer emotional
            promise.
          </p>
        </article>
      </div>
    </section>
  );
};

export default BeforeAfterUX;
