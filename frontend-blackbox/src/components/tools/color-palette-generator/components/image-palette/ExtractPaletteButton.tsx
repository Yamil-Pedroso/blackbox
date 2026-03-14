type Props = {
  onClick: () => void;
  loading: boolean;
};

export default function ExtractPaletteButton({ onClick, loading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 transition-colors" ${
        loading
          ? "border-transparent hover:border-transparent"
          : "border border-neutral-700 hover:border-primary"
      }`}
    >
      {loading ? <span className="loader"></span> : "Extract Palette"}
    </button>
  );
}
