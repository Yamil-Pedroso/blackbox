import { useState } from "react";

export default function ScreenReaderDemo() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-black">
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">Screen Reader Guide</h2>

        <p className="text-sm sm:text-base text-gray-400">
          Screen readers convert UI into spoken feedback. Accessible apps must
          use semantic HTML and ARIA attributes so users can understand and
          navigate content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border border-white/10 rounded">
            <b>aria-label</b>
            <p className="text-gray-400">
              Provides a readable label for elements
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded">
            <b>role</b>
            <p className="text-gray-400">Defines what an element represents</p>
          </div>

          <div className="p-4 border border-white/10 rounded">
            <b>aria-live</b>
            <p className="text-gray-400">
              Announces dynamic updates automatically
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded">
            <b>alt</b>
            <p className="text-gray-400">
              Describes images for non-visual users
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold">
          Accessible Examples
        </h3>

        <button
          aria-label="Open navigation menu"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          ☰
        </button>

        <img
          src="https://picsum.photos/300"
          alt="Random landscape image"
          className="rounded w-full max-w-sm"
        />

        <div className="space-y-2">
          <button
            onClick={() => {
              setCount((prev) => prev + 1);
              setMessage("Counter updated");
            }}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Increment Counter
          </button>

          <p>
            Count: <b>{count}</b>
          </p>

          <div aria-live="polite" className="text-sm text-gray-400">
            {message}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold">Form Accessibility</h3>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold">
          Good vs Bad Example
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-green-500/30 rounded space-y-2">
            <p className="text-green-400 text-sm">GOOD</p>

            <button aria-label="Submit form" className="w-full">
              Submit
            </button>

            <p className="text-xs text-gray-400">
              Screen reader knows what this button does
            </p>
          </div>

          <div className="p-4 border border-red-500/30 rounded space-y-2">
            <p className="text-red-400 text-sm">BAD</p>

            <button className="w-full">Click</button>

            <p className="text-xs text-gray-400">
              No context for screen reader ❌
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold">ARIA Role Example</h3>

        <div role="alert" className="bg-yellow-200 text-black p-3 rounded">
          This alert is announced immediately
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Tip: Always use semantic HTML first (button, input, label). Use ARIA
        only when necessary.
      </div>
    </div>
  );
}
