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

interface IServiceProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const FloatingServices = ({ open, setOpen }: IServiceProps) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="
                fixed inset-0 z-40
                bg-black/70
                backdrop-blur-md
              "
            />

            <motion.aside
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ WebkitOverflowScrolling: "touch" }}
              className="
                fixed z-50
                left-4 right-4 bottom-24
                max-h-[calc(100dvh-8rem)]
                overflow-y-auto overscroll-contain
                border border-[#2a2a2a]
                bg-[#2a2a2a]/95 p-5
                font-ibm-plex-mono text-[#27231d]
                shadow-[14px_18px_40px_rgba(53,43,31,0.25),inset_1px_1px_0_rgba(255,255,255,0.1)]
                backdrop-blur-xl
                custom-scroll

                md:left-auto md:right-5 md:bottom-25
                md:w-[calc(100vw-2.5rem)] md:max-w-300
                md:max-h-[calc(100vh-9rem)]
              "
            >
              <div className="flex items-start justify-between gap-5 border-b border-[#2a2a2a] pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.32em] text-green">
                    Service Console
                  </p>

                  <h3 className="mt-2 font-geist text-2xl leading-none text-white">
                    Available Modules
                  </h3>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    grid h-9 w-9 shrink-0 place-items-center rounded-xl
                    border border-[#2a2a2a] bg-black text-green
                    shadow-[5px_5px_12px_rgba(97,80,58,0.18),-4px_-4px_10px_rgba(255,255,255,0)]
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
                        group grid grid-cols-[44px_1fr] gap-3
                        border border-[#2a2a2a] bg-[#2a2a2a]
                        p-3
                        shadow-[7px_8px_18px_rgba(97,80,58,0.12),inset_1px_1px_0_rgba(255,255,255,0.1)]
                        transition duration-300 hover:-translate-y-1 hover:border-green/40

                        sm:grid-cols-[48px_1fr] sm:gap-4 sm:p-4
                      "
                    >
                      <div
                        className="
                          grid h-11 w-11 place-items-center rounded-2xl
                          border border-[#0a7474]/25 bg-black
                          text-green

                          sm:h-12 sm:w-12
                        "
                      >
                        <Icon
                          size={21}
                          className="transition duration-300 group-hover:rotate-6 group-hover:scale-110"
                        />
                      </div>

                      <div>
                        <h4 className="font-geist text-[0.95rem] text-white sm:text-[1rem]">
                          {service.title}
                        </h4>

                        <p className="mt-2 text-xs leading-relaxed text-[#B1B1B1]">
                          {service.description}
                        </p>

                        <p className="mt-3 border-t border-[#2a2a2a] pt-2 text-[10px] uppercase tracking-[0.22em] text-green">
                          {service.meta}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 border-t border-[#2a2a2a] pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-green">
                    Status
                  </p>

                  <p className="mt-1 text-xs text-[#B1B1B1]">
                    Open for freelance, product and creative web work.
                  </p>
                </div>

                <a
                  href="mailto:your@email.com"
                  className="
                    grid h-12 w-12 shrink-0 place-items-center rounded-2xl
                    bg-black text-green
                    shadow-[6px_7px_14px_rgba(10,116,116,0.25)]
                    transition hover:-translate-y-1
                  "
                  aria-label="Contact by email"
                >
                  <Mail size={19} />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileTap={{ scale: 0.94 }}
        className="
          fixed bottom-5 right-5 z-[60]
          group grid h-[68px] w-[68px] place-items-center
          rounded-[1.4rem] border border-[#2a2a2a]
          bg-[#292929] text-green
        "
        aria-label={open ? "Close services panel" : "Open services panel"}
      >
        <span
          className="
            absolute inset-2.5
            rounded-2xl
            border border-[#2a2a2a]
            bg-[#292929]
          "
        />

        <div className="relative grid h-[25px] w-[25px] place-items-center text-green">
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

        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-[#2a2a2a] bg-green" />
      </motion.button>
    </>
  );
};

export default FloatingServices;
