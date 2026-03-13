import { generateRandomColor } from "../logic/generateRandomColor";

type Props = {
  onGenerate: (color: string) => void;
};

export default function RandomPalette({ onGenerate }: Props) {
  const handleRandom = () => {
    const color = generateRandomColor();
    onGenerate(color);
  };

  return (
    <button
      onClick={handleRandom}
      className="px-4 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors whitespace-nowrap"
    >
      Random Palette
    </button>
  );
}
