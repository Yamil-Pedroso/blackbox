import { PiExportFill } from "react-icons/pi";

type Props = {
  palette: string[];
};

export default function ExportPaletteJSON({ palette }: Props) {
  const exportJSON = () => {
    const data = {
      palette,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "chromita-palette.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportJSON}
      className="px-3 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors"
    >
      <div className="flex items-center gap-2">
        <PiExportFill /> Export JSON
      </div>
    </button>
  );
}
