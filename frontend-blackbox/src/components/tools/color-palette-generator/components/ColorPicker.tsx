type Props = {
  value: string;
  onChange: (color: string) => void;
};

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="m-auto block h-10 border-2 border-gray-300 cursor-pointer z-20"
    />
  );
}
