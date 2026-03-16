import { regexCheatsheet } from "../data/regexCheatsheet";

interface Props {
  onInsert: (pattern: string) => void;
}

export default function RegexCheatsheet({ onInsert }: Props) {
  return (
    <div className="w-full border rounded-xl bg-neutral-50 p-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-black mb-6">
        Regex Cheatsheet
      </h2>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {regexCheatsheet.map((category) => (
          <div
            key={category.title}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Category title */}
            <h3 className="text-sm font-semibold text-black mb-3 border-b pb-1">
              {category.title}
            </h3>

            {/* Items */}
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li
                  key={item.pattern}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  {/* Pattern + meaning */}
                  <div className="flex flex-col">
                    <span className="font-mono bg-gray-200 px-2 py-0.5 rounded text-xs w-fit text-black">
                      {item.pattern}
                    </span>

                    <span className="text-xs text-neutral-600">
                      {item.meaning}
                    </span>
                  </div>

                  {/* Insert button */}
                  <button
                    onClick={() => onInsert(item.pattern)}
                    className="text-xs px-2 py-1 rounded bg-black text-white hover:bg-neutral-800 transition"
                  >
                    Insert
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
