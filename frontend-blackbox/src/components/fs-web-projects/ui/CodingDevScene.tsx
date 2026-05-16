import { useEffect, useMemo, useState } from "react";

const nodeCode = `import express from "express";

const app = express();

app.get("/api/books", async (req, res) => {
  const books = await getBooks();

  return res.json({
    success: true,
    data: books,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});`;

const reactCode = `import { useQuery } from "@tanstack/react-query";

export function BooksDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p>Loading books...</p>;

  return (
    <section className="grid gap-4">
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
}`;

export default function CodingDevScene() {
  const codeBlocks = useMemo(
    () => [
      { label: "server.ts", language: "Node", code: nodeCode },
      { label: "BooksDashboard.tsx", language: "React", code: reactCode },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");

  useEffect(() => {
    let charIndex = 0;
    let timeoutId: number;

    const currentCode = codeBlocks[activeIndex].code;
    setDisplayedCode("");

    const typeNextChar = () => {
      setDisplayedCode(currentCode.slice(0, charIndex));
      charIndex++;

      if (charIndex <= currentCode.length) {
        const currentChar = currentCode[charIndex];

        const baseSpeed = 55;
        const randomVariation = Math.random() * 70;
        const pauseOnNewLine = currentChar === "\n" ? 240 : 0;
        const pauseOnSymbols = "{}();,".includes(currentChar ?? "") ? 120 : 0;

        timeoutId = window.setTimeout(
          typeNextChar,
          baseSpeed + randomVariation + pauseOnNewLine + pauseOnSymbols,
        );
      } else {
        timeoutId = window.setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % codeBlocks.length);
        }, 1800);
      }
    };

    typeNextChar();

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, codeBlocks]);

  return (
    <section className="relative mx-auto h-128 w-full max-w-240 overflow-hidden  border border-white/10 bg-[#09090f] p-3 shadow-2xl sm:h-144 sm:p-4 md:h-160 md:p-5 lg:h-180 lg:p-6">
      <div className="absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col overflow-hidden  border border-white/10 bg-[#11111a]/90 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl ">
        <header className="flex flex-col gap-3 border-b border-white/10 bg-white/3 px-3 py-3 sm:px-4 md:flex-row md:items-center md:justify-between md:px-5 md:py-4">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400 sm:h-3.5 sm:w-3.5" />
              <span className="h-3 w-3 rounded-full bg-yellow-400 sm:h-3.5 sm:w-3.5" />
              <span className="h-3 w-3 rounded-full bg-green-400 sm:h-3.5 sm:w-3.5" />
            </div>

            <div className="flex max-w-full overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-1">
              {codeBlocks.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    activeIndex === index
                      ? "bg-white text-zinc-950"
                      : "text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Writing {codeBlocks[activeIndex].language}
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[2.75rem_1fr] overflow-hidden sm:grid-cols-[3.25rem_1fr] md:grid-cols-[4rem_1fr]">
          <aside className="select-none border-r border-white/10 bg-black/20 px-2 py-4 text-right font-mono text-xs leading-6 text-zinc-600 sm:px-3 sm:text-sm sm:leading-7 md:px-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </aside>

          <pre className="relative overflow-auto p-4 font-mono text-xs leading-6 text-zinc-100 sm:p-5 sm:text-sm sm:leading-7 md:p-6 md:text-[0.95rem]">
            <code>
              {displayedCode}
              <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-cyan-300 align-middle sm:h-5 sm:w-2" />
            </code>
          </pre>
        </div>

        <footer className="hidden items-center justify-between border-t border-white/10 bg-white/[0.03] px-5 py-3 text-xs text-zinc-500 sm:flex">
          <span>TypeScript</span>
          <span>UTF-8</span>
          <span>Spaces: 2</span>
          <span>{codeBlocks[activeIndex].language}</span>
        </footer>
      </div>
    </section>
  );
}
