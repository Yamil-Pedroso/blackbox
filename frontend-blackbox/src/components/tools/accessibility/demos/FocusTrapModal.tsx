import { useEffect, useRef, useState } from "react";

export default function FocusTrapModal() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      "button, input, a, textarea, [tabindex]:not([tabindex='-1'])",
    );

    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [open]);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">Focus Trap Modal</h2>
        <p className="text-sm sm:text-base text-gray-400">
          Modals must trap focus and prevent keyboard navigation outside. Press
          ESC to close.
        </p>
      </div>

      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded focus:ring-2"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="bg-white text-black p-6 rounded space-y-4 w-full max-w-sm sm:max-w-md shadow-lg"
          >
            <h3 className="font-bold text-lg">Accessible Modal</h3>

            <input
              placeholder="Focusable input"
              className="border p-2 w-full rounded"
            />

            <button className="w-full bg-green-500 text-white px-4 py-2 rounded">
              Confirm
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        Tip: Focus must stay inside the modal and return to the trigger when
        closed.
      </div>
    </div>
  );
}
