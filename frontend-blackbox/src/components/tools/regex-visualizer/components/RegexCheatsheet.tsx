import { regexCheatsheet } from "../data/regexCheatsheet";

interface Props {
  onInsert: (pattern: string) => void;
}

export default function RegexCheatsheet({ onInsert }: Props) {
  return (
    <div className="w-full border rounded-xl bg-neutral-50 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-black mb-6">
        Regex Cheatsheet
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
        {regexCheatsheet.map((category) => (
          <div
            key={category.title}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-sm font-semibold text-black mb-3 border-b pb-1">
              {category.title}
            </h3>

            <ul className="space-y-2">
              {category.items.map((item) => (
                <li
                  key={item.pattern}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-mono bg-gray-200 px-2 py-0.5 rounded text-xs w-fit text-black">
                      {item.pattern}
                    </span>

                    <span className="text-xs text-neutral-600">
                      {item.meaning}
                    </span>
                  </div>

                  <button
                    onClick={() => onInsert(item.pattern)}
                    className="text-xs px-2 py-1 rounded bg-black text-white hover:bg-neutral-800 transition shrink-0"
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
