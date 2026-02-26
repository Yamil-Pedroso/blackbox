import { useRef } from "react";
import { useGsapPageAnimation } from "../../lib/hooks/useGSAPAanimation";

const UIUXComparisonPhone = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapPageAnimation(
    containerRef as React.RefObject<HTMLDivElement>,
    (tl) => {
      tl.from(".phone-frame", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        ".floating-label",
        {
          opacity: 0,
          x: -20,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6",
      );

      tl.fromTo(
        ".connector-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.08,
          transformOrigin: "left center",
          ease: "power2.out",
        },
        "-=0.5",
      );
    },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center py-40"
    >
      {/* PHONE */}
      <div className="phone-frame relative w-[320px] h-[640px] rounded-[40px] bg-[#1f2937] shadow-2xl p-4 z-10">
        <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-white">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-neutral-200 flex items-center justify-center">
            <span className="text-neutral-500 font-semibold">UX</span>
          </div>

          <div className="absolute right-0 top-0 w-1/2 h-full bg-tertiary flex items-center justify-center">
            <span className="text-white font-semibold">UI</span>
          </div>

          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/50" />
        </div>
      </div>

      {/* LEFT SIDE LABELS */}
      <div className="absolute left-[calc(50%-260px)] top-[120px] text-right">
        <div className="floating-label mb-16">
          <h3 className="font-semibold">Interaction</h3>
          <p className="text-sm opacity-70">Design</p>
        </div>
        <div className="floating-label mb-16">
          <h3 className="font-semibold">Wireframes</h3>
          <p className="text-sm opacity-70">& Prototypes</p>
        </div>
        <div className="floating-label mb-16">
          <h3 className="font-semibold">User</h3>
          <p className="text-sm opacity-70">Research</p>
        </div>
        <div className="floating-label">
          <h3 className="font-semibold">Scenarios</h3>
          <p className="text-sm opacity-70">& Storyboards</p>
        </div>
      </div>

      {/* RIGHT SIDE LABELS */}
      <div className="absolute right-[calc(50%-260px)] top-[160px] text-left">
        <div className="floating-label mb-16">
          <h3 className="font-semibold">Visual</h3>
          <p className="text-sm opacity-70">Design</p>
        </div>
        <div className="floating-label mb-16">
          <h3 className="font-semibold">Graphic</h3>
          <p className="text-sm opacity-70">Design</p>
        </div>
        <div className="floating-label mb-16">
          <h3 className="font-semibold">Layouts</h3>
        </div>
        <div className="floating-label">
          <h3 className="font-semibold">Typography</h3>
        </div>
      </div>

      {/* SVG CONNECTOR LINES */}
      <svg
        className="absolute w-full h-full pointer-events-none"
        viewBox="0 0 1000 800"
      >
        {/* Left lines */}
        <line
          x1="350"
          y1="220"
          x2="460"
          y2="220"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
        <line
          x1="350"
          y1="310"
          x2="460"
          y2="310"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
        <line
          x1="350"
          y1="400"
          x2="460"
          y2="400"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
        <line
          x1="350"
          y1="490"
          x2="460"
          y2="490"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />

        {/* Right lines */}
        <line
          x1="540"
          y1="250"
          x2="650"
          y2="250"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
        <line
          x1="540"
          y1="340"
          x2="650"
          y2="340"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
        <line
          x1="540"
          y1="430"
          x2="650"
          y2="430"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
        <line
          x1="540"
          y1="520"
          x2="650"
          y2="520"
          stroke="#000"
          strokeWidth="1"
          className="connector-line"
        />
      </svg>
    </div>
  );
};

export default UIUXComparisonPhone;
