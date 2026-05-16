import { motion } from "framer-motion";

type Complexity = {
  label: string;
  name: string;
  performance: string;
  description: string;
  examples: string[];
  color: string;
  path: string;
  glow: string;
  best: string;
  average: string;
  worst: string;
  graphLabelX: number;
  graphLabelY: number;
};

const complexities: Complexity[] = [
  {
    label: "O(1)",
    name: "Constant",
    performance: "Excellent",
    description: "Execution time stays constant regardless of input size.",
    examples: ["Array access", "Hash table lookup"],
    color: "#34f5a6",
    glow: "0 0 25px #34f5a6",
    path: "M 40 340 C 220 340, 520 340, 920 340",
    best: "100%",
    average: "100%",
    worst: "100%",
    graphLabelX: 930,
    graphLabelY: 344,
  },
  {
    label: "O(log n)",
    name: "Logarithmic",
    performance: "Excellent",
    description: "Execution time grows logarithmically with input size.",
    examples: ["Binary search", "Balanced BST"],
    color: "#43e7ff",
    glow: "0 0 25px #43e7ff",
    path: "M 40 340 C 180 332, 360 315, 920 270",
    best: "95%",
    average: "90%",
    worst: "85%",
    graphLabelX: 930,
    graphLabelY: 274,
  },
  {
    label: "O(n)",
    name: "Linear",
    performance: "Good",
    description: "Execution time grows linearly with input size.",
    examples: ["Array traversal", "Linear search"],
    color: "#4f7cff",
    glow: "0 0 25px #4f7cff",
    path: "M 40 340 C 240 305, 520 220, 920 150",
    best: "85%",
    average: "75%",
    worst: "65%",
    graphLabelX: 930,
    graphLabelY: 154,
  },
  {
    label: "O(n log n)",
    name: "Linearithmic",
    performance: "Fair",
    description: "Common in efficient sorting algorithms.",
    examples: ["Merge sort", "Quick sort"],
    color: "#925cff",
    glow: "0 0 25px #925cff",
    path: "M 40 340 C 260 325, 520 250, 920 70",
    best: "75%",
    average: "65%",
    worst: "55%",
    graphLabelX: 830,
    graphLabelY: 78,
  },
  {
    label: "O(n²)",
    name: "Quadratic",
    performance: "Bad",
    description: "Execution time grows quadratically with input size.",
    examples: ["Bubble sort", "Selection sort"],
    color: "#ff58c7",
    glow: "0 0 25px #ff58c7",
    path: "M 40 340 C 300 340, 620 180, 920 10",
    best: "60%",
    average: "40%",
    worst: "25%",
    graphLabelX: 760,
    graphLabelY: 35,
  },
  {
    label: "O(2ⁿ)",
    name: "Exponential",
    performance: "Horrible",
    description: "Execution time doubles with each additional input.",
    examples: ["Recursive Fibonacci", "Power set"],
    color: "#ff4d4d",
    glow: "0 0 25px #ff4d4d",
    path: "M 40 340 C 260 338, 430 310, 560 40",
    best: "45%",
    average: "20%",
    worst: "8%",
    graphLabelX: 570,
    graphLabelY: 48,
  },
  {
    label: "O(n!)",
    name: "Factorial",
    performance: "Horrible",
    description: "Grows factorially and becomes extremely slow.",
    examples: ["Permutations", "Brute force TSP"],
    color: "#ff7a1a",
    glow: "0 0 25px #ff7a1a",
    path: "M 40 340 C 180 340, 250 330, 310 15",
    best: "35%",
    average: "12%",
    worst: "3%",
    graphLabelX: 320,
    graphLabelY: 25,
  },
];

const xAxisLabels = [
  { value: "1", x: 40 },
  { value: "10", x: 220 },
  { value: "100", x: 420 },
  { value: "1k", x: 620 },
  { value: "10k", x: 820 },
];

const yAxisLabels = [
  { value: "1", y: 340 },
  { value: "10²", y: 240 },
  { value: "10⁴", y: 160 },
  { value: "10⁶", y: 80 },
];

export default function MinimalBigOSystem() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative mx-auto w-full overflow-hidden bg-[#181818] px-4 py-8 text-white sm:px-6 md:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-20"
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-green sm:mb-3 sm:text-xs sm:tracking-[0.5em]">
            Systems
          </p>

          <h1 className="text-5xl tracking-[-0.08em] text-[#B1B1B1] sm:text-6xl">
            Big O
          </h1>

          <p className="mt-4 max-w-[22rem] text-xs leading-6 text-white/45 sm:mt-6 sm:max-w-md sm:text-sm sm:leading-7">
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
          className="relative z-10 mt-10 w-full overflow-hidden sm:mt-12"
        >
          <div className="mx-auto h-[18rem] w-full overflow-hidden sm:h-[24rem] md:h-[30rem] lg:h-[34rem]">
            <svg
              viewBox="0 0 1000 420"
              preserveAspectRatio="xMidYMid meet"
              className="h-full w-full"
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

              <text
                x="40"
                y="30"
                fill="rgba(255,255,255,.35)"
                className="text-[11px] uppercase tracking-[0.2em] sm:text-[12px]"
              >
                operations
              </text>

              <text
                x="760"
                y="390"
                fill="rgba(255,255,255,.35)"
                className="text-[11px] uppercase tracking-[0.2em] sm:text-[12px]"
              >
                input size / n
              </text>

              {yAxisLabels.map((item) => (
                <text
                  key={item.value}
                  x="5"
                  y={item.y + 4}
                  fill="rgba(255,255,255,.25)"
                  className="text-[10px] sm:text-[11px]"
                >
                  {item.value}
                </text>
              ))}

              {xAxisLabels.map((item) => (
                <text
                  key={item.value}
                  x={item.x - 6}
                  y="370"
                  fill="rgba(255,255,255,.25)"
                  className="text-[10px] sm:text-[11px]"
                >
                  {item.value}
                </text>
              ))}

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

                  <motion.text
                    x={item.graphLabelX}
                    y={item.graphLabelY}
                    fill={item.color}
                    className="text-[11px] font-semibold sm:text-[13px]"
                    style={{
                      textShadow: item.glow,
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.2 + index * 0.15,
                      duration: 0.7,
                    }}
                  >
                    {item.label}
                  </motion.text>
                </g>
              ))}

              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <text
                  x="55"
                  y="395"
                  fill="rgba(255,255,255,.28)"
                  className="text-[10px] sm:text-[11px]"
                >
                  Lower curve = better scaling
                </text>

                <line
                  x1="40"
                  x2="950"
                  y1="340"
                  y2="340"
                  stroke="rgba(255,255,255,.16)"
                />

                <line
                  x1="40"
                  x2="40"
                  y1="20"
                  y2="340"
                  stroke="rgba(255,255,255,.16)"
                />
              </motion.g>
            </svg>
          </div>
        </motion.div>

        <div className="relative z-20 mt-12 sm:mt-14">
          <div className="mb-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/30 sm:tracking-[0.4em]">
                Complexity Index
              </p>

              <h2 className="mt-2 text-2xl text-[#B1B1B1] sm:text-3xl">
                Performance Map
              </h2>
            </div>

            <p className="max-w-md text-xs leading-6 text-white/40 sm:text-right">
              From stable operations to explosive growth. Lower complexity
              usually means better scalability.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {complexities.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.08,
                  duration: 0.8,
                }}
                whileHover={{ y: -4 }}
                className="relative border-t border-white/10 pt-6"
              >
                <div
                  className="absolute left-0 top-0 h-px w-24 sm:w-28"
                  style={{
                    background: item.color,
                    boxShadow: item.glow,
                  }}
                />

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{
                        color: item.color,
                        textShadow: item.glow,
                      }}
                    >
                      {item.label}
                    </h3>

                    <p className="mt-2 text-base font-medium text-white/75">
                      {item.name}
                    </p>
                  </div>

                  <span
                    className="shrink-0 text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.25em]"
                    style={{
                      color: item.color,
                      textShadow: item.glow,
                    }}
                  >
                    {item.performance}
                  </span>
                </div>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/42">
                  {item.description}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4 sm:gap-4">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/25 sm:text-[9px] sm:tracking-[0.25em]">
                      Best
                    </p>
                    <p className="mt-2 text-sm text-white/70">{item.best}</p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/25 sm:text-[9px] sm:tracking-[0.25em]">
                      Avg
                    </p>
                    <p className="mt-2 text-sm text-white/70">{item.average}</p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/25 sm:text-[9px] sm:tracking-[0.25em]">
                      Worst
                    </p>
                    <p className="mt-2 text-sm text-white/70">{item.worst}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.examples.map((example) => (
                    <span
                      key={example}
                      className="border border-white/10 px-3 py-1.5 text-[10px] text-white/45"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="mt-10 text-left sm:absolute sm:right-8 sm:top-9 sm:mt-0 sm:text-right lg:right-10"
        >
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 sm:text-xs sm:tracking-[0.4em]">
            Computational Growth
          </p>

          <p className="mt-2 text-xs text-white/50 sm:mt-3 sm:text-sm">
            Lower curves scale better.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
