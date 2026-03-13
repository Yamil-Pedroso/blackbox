import type { ReactNode } from "react";

type Props = {
  open: boolean;
  children: ReactNode;
};

export default function ToolsSidePanel({ open, children }: Props) {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-95 md:w-105
        bg-neutral-950 border-l border-neutral-800
        shadow-2xl
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="h-full overflow-y-auto p-6 space-y-10">{children}</div>
    </div>
  );
}
