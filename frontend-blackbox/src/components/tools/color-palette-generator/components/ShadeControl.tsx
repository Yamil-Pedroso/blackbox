type Props = {
  shadeCount: number;
  onChange: (count: number) => void;
};

export default function ShadeControl({ shadeCount, onChange }: Props) {
  const options = [5, 7, 9, 11];

  return (
    <div className="flex gap-2">
      {options.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`px-3 py-1 text-xs border transition-colors
          ${
            shadeCount === n
              ? "border-primary text-primary"
              : "border-neutral-700 hover:border-primary"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
