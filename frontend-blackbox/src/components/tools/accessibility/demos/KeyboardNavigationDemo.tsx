import { useState, useEffect } from "react";

export default function KeyboardNavigationDemo() {
  const [focused, setFocused] = useState<string | null>(null);
  const [lastKey, setLastKey] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setLastKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-black">
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Keyboard Navigation Guide
        </h2>

        <p className="text-sm sm:text-base text-gray-400">
          Keyboard navigation is a core part of web accessibility (WCAG). Users
          should be able to interact with all elements using only the keyboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border border-white/10 rounded">
            <b>TAB</b>
            <p className="text-gray-400">
              Move forward between interactive elements
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded">
            <b>SHIFT + TAB</b>
            <p className="text-gray-400">Move backward between elements</p>
          </div>

          <div className="p-4 border border-white/10 rounded">
            <b>ENTER</b>
            <p className="text-gray-400">Activate buttons and links</p>
          </div>

          <div className="p-4 border border-white/10 rounded">
            <b>SPACE</b>
            <p className="text-gray-400">
              Toggle buttons, checkboxes and inputs
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Tip: Every interactive element must be reachable and usable via
          keyboard.
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold">Interactive Demo</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onFocus={() => setFocused("button1")}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded focus:ring-4 focus:ring-blue-300"
          >
            Primary Button
          </button>

          <button
            onFocus={() => setFocused("button2")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded focus:ring-4 focus:ring-green-300"
          >
            Secondary Button
          </button>

          <input
            onFocus={() => setFocused("input")}
            placeholder="Type here..."
            className="w-full border p-2 rounded focus:ring-4 focus:ring-purple-300"
          />

          <a
            href="#"
            onFocus={() => setFocused("link")}
            className="w-full text-blue-400 underline focus:ring-4 focus:ring-blue-300"
          >
            Navigation Link
          </a>

          <label className="flex items-center gap-2">
            <input type="checkbox" onFocus={() => setFocused("checkbox")} />
            Accept terms
          </label>
        </div>

        <div className="bg-black/30 border border-white/10 p-4 rounded text-sm">
          <p>
            Focused: <b>{focused || "None"}</b>
          </p>
          <p>
            Last key: <b>{lastKey || "None"}</b>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold">
          Good vs Bad Example
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-green-500/30 rounded space-y-2">
            <p className="text-green-400 text-sm">GOOD</p>

            <button className="w-full px-4 py-2 bg-green-600 text-white rounded focus:ring-2">
              Accessible Button
            </button>

            <p className="text-xs text-gray-400">
              Focusable and works with keyboard
            </p>
          </div>

          <div className="p-4 border border-red-500/30 rounded space-y-2">
            <p className="text-red-400 text-sm">BAD</p>

            <div
              onClick={() => alert("Clicked")}
              className="w-full px-4 py-2 bg-red-600 text-white rounded cursor-pointer text-center"
            >
              Fake Button
            </div>

            <p className="text-xs text-gray-400">
              Not focusable with keyboard ❌
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold">Tab Order Example</h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="w-full sm:w-auto" tabIndex={1}>
            First
          </button>
          <button className="w-full sm:w-auto" tabIndex={3}>
            Third
          </button>
          <button className="w-full sm:w-auto" tabIndex={2}>
            Second
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Incorrect tabIndex can break navigation order.
        </p>
      </div>
    </div>
  );
}
