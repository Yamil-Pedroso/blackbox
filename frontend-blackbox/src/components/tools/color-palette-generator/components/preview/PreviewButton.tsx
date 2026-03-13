type Props = {
  color: string;
  children: React.ReactNode;
};

export default function PreviewButton({ color, children }: Props) {
  return (
    <button
      className="px-5 py-2 rounded text-white font-medium transition-transform hover:scale-105"
      style={{ background: color }}
    >
      {children}
    </button>
  );
}
