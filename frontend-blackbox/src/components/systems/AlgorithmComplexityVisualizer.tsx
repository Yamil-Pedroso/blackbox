import { motion } from "framer-motion";

type Complexity = {
  label: string;
  color: string;
  path: string;
  glow: string;
  best: string;
  average: string;
  worst: string;
};

const complexities: Complexity[] = [
  {
    label: "O(1)",
    color: "#34f5a6",
    glow: "0 0 25px #34f5a6",
    path: "M 40 340 C 220 340, 520 340, 920 340",
    best: "100%",
    average: "100%",
    worst: "100%",
  },
  {
    label: "O(log n)",
    color: "#43e7ff",
    glow: "0 0 25px #43e7ff",
    path: "M 40 340 C 180 332, 360 315, 920 270",
    best: "95%",
    average: "90%",
    worst: "85%",
  },
  {
    label: "O(n)",
    color: "#4f7cff",
    glow: "0 0 25px #4f7cff",
    path: "M 40 340 C 240 305, 520 220, 920 150",
    best: "85%",
    average: "75%",
    worst: "65%",
  },
  {
    label: "O(n log n)",
    color: "#925cff",
    glow: "0 0 25px #925cff",
    path: "M 40 340 C 260 325, 520 250, 920 70",
    best: "75%",
    average: "65%",
    worst: "55%",
  },
  {
    label: "O(n²)",
    color: "#ff58c7",
    glow: "0 0 25px #ff58c7",
    path: "M 40 340 C 300 340, 620 180, 920 10",
    best: "60%",
    average: "40%",
    worst: "25%",
  },
];

export default function MinimalBigOSystem() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative mx-auto min-h-[58rem] w-full overflow-hidden bg-[#181818] px-5 py-6 text-white sm:min-h-[52rem] sm:px-8 sm:py-8 md:h-[44rem] md:min-h-0 md:px-0 md:py-0 lg:h-[40rem]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 md:absolute md:left-10 md:top-10"
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-green sm:mb-3 sm:text-xs sm:tracking-[0.5em]">
          Systems
        </p>

        <h1 className="text-5xl tracking-[-0.08em] text-[#B1B1B1] sm:text-6xl">
          Big O
        </h1>

        <p className="mt-4 max-w-[20rem] text-xs leading-6 text-white/45 sm:mt-6 sm:max-w-md sm:text-sm sm:leading-7">
          Visual representation of algorithm growth and computational cost.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mt-8 flex h-[19rem] items-center justify-center overflow-visible sm:mt-10 sm:h-[22rem] md:absolute md:inset-0 md:mt-0 md:h-auto"
      >
        <svg
          viewBox="0 0 1000 420"
          className="h-full w-[155vw] max-w-none sm:w-[120vw] md:h-[70vh] md:w-[90vw]"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {[80, 160, 240, 320].map((y) => (
            <line
              key={y}
              x1="40"
              x2="950"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,.06)"
            />
          ))}

          {[220, 420, 620, 820].map((x) => (
            <line
              key={x}
              x1={x}
              x2={x}
              y1="20"
              y2="360"
              stroke="rgba(255,255,255,.04)"
            />
          ))}

          {complexities.map((item, index) => (
            <g key={item.label}>
              <motion.path
                d={item.path}
                fill="none"
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                opacity={0.9}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{
                  duration: 2.5,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />

              <circle r="4" fill={item.color} filter="url(#glow)">
                <animateMotion
                  dur={`${5 + index}s`}
                  repeatCount="indefinite"
                  path={item.path}
                />
              </circle>
            </g>
          ))}
        </svg>
      </motion.div>

      <div className="relative z-20 mt-8 grid gap-4 sm:grid-cols-2 md:absolute md:left-10 md:top-1/2 md:mt-0 md:w-[26rem] md:-translate-y-1/2 md:grid-cols-1 md:gap-4 lg:w-[31rem]">
        {complexities.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ x: 6 }}
            className="group grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 sm:gap-x-4 md:flex md:items-center"
          >
            <div
              className="mt-2 h-px w-7 sm:w-10 md:mt-0"
              style={{
                background: item.color,
                boxShadow: item.glow,
              }}
            />

            <div className="min-w-0">
              <span
                className="block text-xs font-medium tracking-wide text-white/70 transition duration-300 group-hover:text-white sm:text-sm"
                style={{
                  textShadow: item.glow,
                }}
              >
                {item.label}
              </span>

              <div className="mt-2 grid grid-cols-3 gap-2 text-[9px] uppercase tracking-[0.12em] text-white/35 sm:text-[10px] md:mt-0 md:flex md:gap-3">
                <span>Best {item.best}</span>
                <span>Avg {item.average}</span>
                <span>Worst {item.worst}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 mt-8 grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 sm:gap-5 md:absolute md:bottom-10 md:left-10 md:right-10 md:mt-0 md:grid-cols-5 md:gap-6 md:pb-0">
        {complexities.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6 + index * 0.08,
              duration: 0.8,
            }}
            whileHover={{ y: -4 }}
            className="relative"
          >
            <div
              className="mb-3 h-px w-full sm:mb-4"
              style={{
                background: item.color,
                boxShadow: item.glow,
              }}
            />

            <div className="flex items-center justify-between">
              <h3
                className="text-sm font-bold sm:text-lg"
                style={{
                  color: item.color,
                  textShadow: item.glow,
                }}
              >
                {item.label}
              </h3>

              <span className="text-[10px] text-white/30 sm:text-xs">
                0{index + 1}
              </span>
            </div>

            <div className="mt-3 grid gap-1 text-[9px] uppercase tracking-[0.18em] text-white/35 sm:text-[10px]">
              <span>Best {item.best}</span>
              <span>Avg {item.average}</span>
              <span>Worst {item.worst}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.4,
        }}
        className="absolute right-5 top-6 z-20 text-right sm:right-8 sm:top-8 md:right-10 md:top-10"
      >
        <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 sm:text-xs sm:tracking-[0.4em]">
          Computational Growth
        </p>

        <p className="mt-2 text-xs text-white/50 sm:mt-3 sm:text-sm">
          Lower curves scale better.
        </p>
      </motion.div>
    </motion.section>
  );
}
