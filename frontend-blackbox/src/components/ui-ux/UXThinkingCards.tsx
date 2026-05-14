const uxCards = [
  {
    title: "Intent",
    question: "What is the user trying to achieve?",
    note: "Every interface starts with a real intention, not with a layout.",
  },
  {
    title: "Friction",
    question: "Where does the user slow down?",
    note: "Good UX removes unnecessary decisions and makes the next step obvious.",
  },
  {
    title: "Feedback",
    question: "Does the interface answer back?",
    note: "Loading, success, error and empty states are part of the conversation.",
  },
  {
    title: "Confidence",
    question: "Does the user feel safe continuing?",
    note: "Clear labels, previews, confirmations and undo actions reduce anxiety.",
  },
];

const UXThinkingCards = () => {
  return (
    <section className="uiux-reveal mt-32">
      <div className="mb-10 max-w-3xl">
        <p className="font-ibm-plex-mono text-sm uppercase tracking-[0.35em] opacity-50">
          UX Thinking
        </p>

        <h2 className="mt-4 font-geist text-3xl font-black md:text-5xl">
          Before pixels, understand behavior.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {uxCards.map((card, index) => (
          <article
            key={card.title}
            className="group relative min-h-[300px] overflow-hidden rounded-[2rem] border border-primary/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/10"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:scale-150" />

            <span className="font-ibm-plex-mono text-xs opacity-40">
              UX / 0{index + 1}
            </span>

            <h3 className="mt-8 font-geist text-3xl font-black">
              {card.title}
            </h3>

            <p className="mt-5 font-geist text-xl font-semibold leading-snug">
              {card.question}
            </p>

            <p className="mt-5 font-ibm-plex-mono text-sm leading-relaxed opacity-70">
              {card.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UXThinkingCards;
