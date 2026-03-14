interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TestStringInput({ value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste text to test..."
      className="w-full border rounded p-2 h-32"
    />
  );
}
