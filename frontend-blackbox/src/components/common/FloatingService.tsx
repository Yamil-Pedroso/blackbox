import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Code2,
  Layers3,
  Mail,
  Palette,
  NotebookText,
  X,
} from "lucide-react";

const services = [
  {
    title: "Web Systems",
    description: "Full-stack apps, dashboards, tools and modern interfaces.",
    meta: "React · Node · PostgreSQL",
    icon: Code2,
  },
  {
    title: "UI/UX Engineering",
    description: "Design systems, flows, layouts, motion and component logic.",
    meta: "UX · Motion · Systems",
    icon: Palette,
  },
  {
    title: "AI Integrations",
    description: "Assistants, summaries, context-aware features and AI tools.",
    meta: "OpenAI · Context · RAG",
    icon: Brain,
  },
  {
    title: "Creative Interfaces",
    description:
      "Experimental visuals, interactive labs and crafted UI pieces.",
    meta: "Three.js · Framer · Art",
    icon: Layers3,
  },
];

const FloatingServices = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed bottom-[100px] right-5 z-50
              w-[calc(100vw-2.5rem)] max-w-[440px]
              border border-[#d8cdbb]
              bg-[#eaeaea]/95 p-5
              font-ibm-plex-mono text-[#27231d]
              shadow-[14px_18px_40px_rgba(53,43,31,0.25),inset_1px_1px_0_rgba(255,255,255,0.9)]
              backdrop-blur-xl
            "
          >
            <div className="flex items-start justify-between gap-5 border-b border-[#d8cdbb] pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#0a7474]">
                  Service Console
                </p>

                <h3 className="mt-2 font-geist text-2xl font-black leading-none">
                  Available Modules
                </h3>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
                  grid h-9 w-9 place-items-center rounded-xl
                  border border-[#d7cbb7] bg-[#eaeaea]
                  shadow-[5px_5px_12px_rgba(97,80,58,0.18),-4px_-4px_10px_rgba(255,255,255,0.75)]
                  transition hover:-translate-y-0.5
                "
                aria-label="Close services panel"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="
                      group grid grid-cols-[48px_1fr] gap-4
                      border border-[#d8cdbb] bg-[#eaeaea]
                      p-4
                      shadow-[7px_8px_18px_rgba(97,80,58,0.12),inset_1px_1px_0_rgba(255,255,255,0.9)]
                      transition duration-300 hover:-translate-y-1 hover:border-[#0a7474]/40
                    "
                  >
                    <div
                      className="
                        grid h-12 w-12 place-items-center rounded-2xl
                        border border-[#0a7474]/25 bg-[#eaeaea]
                        text-[#0a7474]
                        shadow-[inset_3px_3px_8px_rgba(15,80,80,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.85)]
                      "
                    >
                      <Icon
                        size={21}
                        className="transition duration-300 group-hover:rotate-6 group-hover:scale-110"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-geist text-[1rem] font-black">
                          {service.title}
                        </h4>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-[#27231d]/70">
                        {service.description}
                      </p>

                      <p className="mt-3 border-t border-[#d8cdbb] pt-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#0a7474]">
                        {service.meta}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 border-t border-[#d8cdbb] pt-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0a7474]">
                  Status
                </p>

                <p className="mt-1 text-xs text-[#27231d]/70">
                  Open for freelance, product and creative web work.
                </p>
              </div>

              <a
                href="mailto:your@email.com"
                className="
                  grid h-12 w-12 place-items-center rounded-2xl
                  bg-[#0a7474] text-[#f8f0e3]
                  shadow-[6px_7px_14px_rgba(10,116,116,0.25)]
                  transition hover:-translate-y-1
                "
                aria-label="Contact by email"
              >
                <Mail size={19} />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileTap={{ scale: 0.94 }}
        className="
          fixed bottom-5 right-5 z-50
          group grid h-[68px] w-[68px] place-items-center
          rounded-[1.4rem] border border-[#eaeaea]
          bg-[#eaeaea]
          shadow-[10px_12px_26px_rgba(53,43,31,0.28),inset_2px_2px_0_rgba(255,255,255,0.9),inset_-3px_-3px_10px_rgba(176,154,124,0.22)]
        "
        aria-label="Open services panel"
      >
        <span
          className="
            absolute inset-[10px]
            rounded-[1rem]
            border border-[#e0d5c3]
            bg-[#eaeaea]
            shadow-[inset_4px_4px_10px_rgba(120,98,70,0.12),inset_-4px_-4px_10px_rgba(255,255,255,0.85)]
          "
        />

        <div className="relative grid h-[25px] w-[25px] place-items-center text-[#0a7474]">
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 grid place-items-center"
          >
            {open ? <X size={25} /> : <NotebookText size={25} />}
          </motion.div>
        </div>

        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-[#eaeaea] bg-[#0a7474]" />
      </motion.button>
    </>
  );
};

export default FloatingServices;
