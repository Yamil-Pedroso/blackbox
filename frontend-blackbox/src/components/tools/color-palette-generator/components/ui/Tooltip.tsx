import type { ReactNode } from "react";

type Props = {
  text: string;
  children: ReactNode;
};

export default function Tooltip({ text, children }: Props) {
  return (
    <div className="relative inline-flex group">
      {children}

      <div
        className="
        pointer-events-none
        absolute left-1/2 bottom-full
        -translate-x-1/2
        mb-2
        opacity-0 translate-y-2
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200 ease-out
        bg-white text-black
        text-xs
        px-3 py-1.5
        rounded-md
        whitespace-nowrap
        shadow-xl
        z-50
        "
      >
        {text}
      </div>
    </div>
  );
}
