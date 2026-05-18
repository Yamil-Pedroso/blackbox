import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const WireframePresentationCard = () => {
  return (
    <motion.button
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full overflow-hidden rounded-[2.5rem] border border-primary/10 bg-linear-to-br from-neutral-900 via-neutral-950 to-black p-6 text-left shadow-2xl transition-all duration-500"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top label */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-ibm-plex-mono text-xs uppercase tracking-[0.35em] text-primary/50">
          UI / UX Archive
        </span>

        <div className="rounded-full border border-primary/10 bg-white/5 p-2 transition-transform duration-300 group-hover:rotate-12">
          <ArrowUpRight className="h-4 w-4 text-primary/70" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-10">
        <h2 className="max-w-xl font-geist text-4xl font-bold leading-tight text-primary md:text-5xl">
          Interactive Wireframe Collection
        </h2>

        <p className="mt-5 max-w-2xl font-ibm-plex-mono text-sm leading-relaxed text-primary/65 md:text-base">
          A curated exploration of dashboard systems, mobile flows, interaction
          structures and interface thinking before final visual implementation.
        </p>
      </div>

      {/* Fake wireframe preview */}
      <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-2">
        {/* Web */}
        <div className="rounded-[2rem] border border-primary/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
          </div>

          <div className="grid grid-cols-[70px_1fr] gap-3">
            <div className="space-y-3 rounded-2xl bg-white/10 p-3">
              <div className="h-6 rounded-lg bg-white/20" />
              <div className="h-2 rounded-full bg-white/20" />
              <div className="h-2 rounded-full bg-white/20" />
              <div className="h-2 rounded-full bg-white/20" />
            </div>

            <div className="space-y-3">
              <div className="h-8 rounded-2xl bg-white/15" />

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-16 rounded-2xl bg-white/10" />
                ))}
              </div>

              <div className="h-24 rounded-3xl bg-white/10" />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-center rounded-[2rem] border border-primary/10 bg-white/5 p-4 backdrop-blur">
          <div className="w-[180px] rounded-[2rem] border border-primary/10 bg-black p-3">
            <div className="rounded-[1.5rem] bg-white/10 p-3">
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/20" />

              <div className="mb-4 h-20 rounded-3xl bg-white/15" />

              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex gap-2 rounded-2xl bg-white/10 p-2"
                  >
                    <div className="h-8 w-8 rounded-xl bg-white/20" />

                    <div className="flex-1 space-y-2">
                      <div className="h-2 rounded-full bg-white/20" />
                      <div className="h-2 w-2/3 rounded-full bg-white/15" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-primary/10 pt-6">
        <p className="font-ibm-plex-mono text-xs uppercase tracking-[0.3em] text-primary/40">
          Web • Mobile • UX Flows • Structure Systems
        </p>

        <span className="font-geist text-lg font-semibold text-primary transition-transform duration-300 group-hover:translate-x-2">
          Explore
        </span>
      </div>
    </motion.button>
  );
};

export default WireframePresentationCard;
