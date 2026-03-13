type Props = {
  onClick: () => void;
  loading: boolean;
};

export default function ExtractPaletteButton({ onClick, loading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-4 py-2 border border-neutral-700 hover:border-primary transition-colors"
    >
      {loading ? "Extracting..." : "Extract Palette"}
    </button>
  );
}
