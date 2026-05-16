type Complexity = {
  label: string;
  color: string;
  path: string;
  glow: string;
};

const complexities: Complexity[] = [
  {
    label: "O(1)",
    color: "#34f5a6",
    glow: "0 0 25px #34f5a6",
    path: "M 40 340 C 220 340, 520 340, 920 340",
  },
  {
    label: "O(log n)",
    color: "#43e7ff",
    glow: "0 0 25px #43e7ff",
    path: "M 40 340 C 180 332, 360 315, 920 270",
  },
  {
    label: "O(n)",
    color: "#4f7cff",
    glow: "0 0 25px #4f7cff",
    path: "M 40 340 C 240 305, 520 220, 920 150",
  },
  {
    label: "O(n log n)",
    color: "#925cff",
    glow: "0 0 25px #925cff",
    path: "M 40 340 C 260 325, 520 250, 920 70",
  },
  {
    label: "O(n²)",
    color: "#ff58c7",
    glow: "0 0 25px #ff58c7",
    path: "M 40 340 C 300 340, 620 180, 920 10",
  },
];

export default function MinimalBigOSystem() {
  return (
    <section className="relative mx-auto h-[46rem] w-full overflow-hidden bg-[#181818] text-white sm:h-[44rem] md:h-[40rem]">
      <div className="absolute left-5 top-6 z-20 sm:left-8 sm:top-8 md:left-10 md:top-10">
        <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-green sm:mb-3 sm:text-xs sm:tracking-[0.5em]">
          Systems
        </p>

        <h1 className="text-5xl tracking-[-0.08em] text-[#B1B1B1] sm:text-6xl">
          Big O
        </h1>

        <p className="mt-4 max-w-[18rem] text-xs leading-6 text-white/45 sm:mt-6 sm:max-w-md sm:text-sm sm:leading-7">
          Visual representation of algorithm growth and computational cost.
        </p>
      </div>

      {/* Side labels */}
      <div className="absolute left-5 top-[18rem] z-20 flex flex-col gap-4 sm:left-8 sm:top-1/2 sm:-translate-y-1/2 sm:gap-6 md:left-10">
        {complexities.map((item) => (
          <div
            key={item.label}
            className="group flex items-center gap-3 sm:gap-4"
          >
            <div
              className="h-px w-7 sm:w-10"
              style={{
                background: item.color,
                boxShadow: item.glow,
              }}
            />

            <span
              className="text-xs font-medium tracking-wide text-white/70 transition duration-300 group-hover:text-white sm:text-sm"
              style={{
                textShadow: item.glow,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 1000 420"
          className="mt-12 h-[38vh] w-[145vw] max-w-none sm:mt-0 sm:h-[60vh] sm:w-[105vw] md:h-[70vh] md:w-[90vw]"
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

          {/* Graph lines */}
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
              <path
                d={item.path}
                fill="none"
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                opacity={0.9}
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
      </div>

      <div className="absolute bottom-6 left-5 right-5 z-20 grid grid-cols-2 gap-4 sm:bottom-8 sm:left-8 sm:right-8 sm:gap-5 md:bottom-10 md:left-10 md:right-10 md:grid-cols-5 md:gap-6">
        {complexities.map((item, index) => (
          <div key={item.label} className="relative">
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

            <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/30 sm:text-xs sm:tracking-[0.3em]">
              Complexity
            </p>
          </div>
        ))}
      </div>

      <div className="absolute right-5 top-6 z-20 text-right sm:right-8 sm:top-8 md:right-10 md:top-10">
        <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 sm:text-xs sm:tracking-[0.4em]">
          Computational Growth
        </p>

        <p className="mt-2 text-xs text-white/50 sm:mt-3 sm:text-sm">
          Lower curves scale better.
        </p>
      </div>
    </section>
  );
}
