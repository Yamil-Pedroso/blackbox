interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RegexInput({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="/your-regex/"
      className="w-full border rounded p-2"
    />
  );
}
