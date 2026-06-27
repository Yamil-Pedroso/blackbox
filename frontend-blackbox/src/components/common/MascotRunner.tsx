import { useState } from "react";

type MascotMode = "cat" | "dog" | "ghost" | "off";

const storageKey = "blackbox-mascot-mode";

function readSavedMode(): MascotMode {
  if (typeof window === "undefined") return "cat";

  const saved = window.localStorage.getItem(storageKey);
  return saved === "cat" ||
    saved === "dog" ||
    saved === "ghost" ||
    saved === "off"
    ? saved
    : "cat";
}

export default function MascotRunner() {
  const [mode, setMode] = useState<MascotMode>(() => readSavedMode());

  function cycleMode() {
    const nextMode: MascotMode =
      mode === "cat"
        ? "dog"
        : mode === "dog"
          ? "ghost"
          : mode === "ghost"
            ? "off"
            : "cat";

    setMode(nextMode);
    window.localStorage.setItem(storageKey, nextMode);
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-70 h-12">
      {mode !== "off" && (
        <div className="mascot-runner-track" aria-hidden="true">
          <div className={`mascot-runner mascot-runner--${mode}`}>
            <span className="mascot-runner__tail" />
            <span className="mascot-runner__body" />
            <span className="mascot-runner__head">
              <span className="mascot-runner__ear mascot-runner__ear--left" />
              <span className="mascot-runner__ear mascot-runner__ear--right" />
              <span className="mascot-runner__eye mascot-runner__eye--left" />
              <span className="mascot-runner__eye mascot-runner__eye--right" />
              <span className="mascot-runner__nose" />
            </span>
            <span className="mascot-runner__leg mascot-runner__leg--front" />
            <span className="mascot-runner__leg mascot-runner__leg--back" />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={cycleMode}
        className="pointer-events-auto absolute right-3 top-8 border border-neutral-800 bg-secondary-bg px-3 py-1 font-ibm-plex-mono text-[10px] uppercase text-secondary transition hover:border-green/50 hover:text-primary "
        title="Toggle mascot mode"
      >
        {mode === "cat"
          ? "Cat"
          : mode === "dog"
            ? "Dog"
            : mode === "ghost"
              ? "Ghost"
              : "Off"}
      </button>
    </div>
  );
}
