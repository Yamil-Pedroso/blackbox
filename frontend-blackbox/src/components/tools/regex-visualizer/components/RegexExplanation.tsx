interface Explanation {
  token: string;
  meaning: string;
}

export default function RegexExplanation({ data }: { data: Explanation[] }) {
  if (!data.length) return null;

  return (
    <div className="border rounded p-4 bg-neutral-50">
      <h3 className="font-semibold mb-2 text-black">Regex Explanation</h3>

      <ul className="space-y-1 text-sm">
        {data.map((item, index) => (
          <li key={index}>
            <span className="font-mono bg-neutral-200 px-1 rounded text-black">
              {item.token}
            </span>{" "}
            → <span className="text-black">{item.meaning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
