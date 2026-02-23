import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface InsightTooltipProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  liveValue?: string | number;
  queryPreview?: object;
  position?: "top" | "bottom" | "left" | "right";
  mode?: "normal" | "architecture";
  isOpen?: boolean;
}

export default function InsightTooltip({
  title,
  description,
  icon,
  liveValue,
  queryPreview,
  position = "bottom",
  mode = "architecture",
  isOpen = false,
}: InsightTooltipProps) {
  const [isHovering, setIsHovering] = useState(false);

  const visible = isOpen || isHovering;

  const positionClasses = {
    top: "bottom-full mb-4 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-4 left-1/2 -translate-x-1/2",
    left: "right-full mr-4 top-1/2 -translate-y-1/2",
    right: "left-full ml-4 top-1/2 -translate-y-1/2",
  };

  const arrowClasses = {
    top: "absolute left-1/2 -translate-x-1/2 top-full rotate-45 border-r border-b",
    bottom:
      "absolute top-[-6px] left-1/2 -translate-x-1/2 bottom-full rotate-45 border-l border-t",
    left: "absolute top-1/2 -translate-y-1/2 left-full rotate-45 border-t border-r",
    right:
      "absolute top-1/2 -translate-y-1/2 right-full rotate-45 border-b border-l",
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Icon */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-primary transition cursor-pointer"
      >
        {icon}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.18 }}
            className={`
              absolute ${positionClasses[position]}

              /* Responsive width */
              w-[90vw]
              max-w-[320px]
              sm:max-w-95
              md:max-w-105

              p-4
              rounded-2xl
              bg-neutral-950
              border border-neutral-800
              shadow-2xl
              z-50
            `}
          >
            {/* Title */}
            <h4 className="text-base sm:text-lg font-semibold text-primary mb-1">
              {title}
            </h4>

            {/* Description */}
            <p className="text-sm sm:text-[14px] text-neutral-400 mb-3 leading-snug">
              {description}
            </p>

            {mode === "architecture" && (
              <>
                {/* Live Value */}
                {liveValue !== undefined && liveValue !== "" && (
                  <div className="mb-3">
                    <p className="text-xs sm:text-[13px] text-neutral-500 mb-1">
                      Current Value
                    </p>
                    <code className="text-sm sm:text-[14px] text-green-400 bg-neutral-900 px-2 py-1 rounded block wrap-break-word">
                      {JSON.stringify(liveValue)}
                    </code>
                  </div>
                )}

                {/* Query Preview */}
                {queryPreview && Object.keys(queryPreview).length > 0 && (
                  <div>
                    <p className="text-xs sm:text-[13px] text-neutral-500 mb-1">
                      Generated Query
                    </p>
                    <pre className="text-sm sm:text-[14px] text-blue-400 bg-neutral-900 p-2 rounded overflow-auto max-h-40 wrap-break-word">
                      {JSON.stringify(queryPreview, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}

            {/* Arrow (hidden on very small screens to avoid layout issues) */}
            <div
              className={`
                hidden sm:block
                w-3 h-3
                bg-neutral-950
                border-neutral-800
                ${arrowClasses[position]}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
