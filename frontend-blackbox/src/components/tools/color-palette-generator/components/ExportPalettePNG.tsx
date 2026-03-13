import { PiExportFill } from "react-icons/pi";

type Props = {
  palette: string[];
};

export default function ExportPalettePNG({ palette }: Props) {
  const exportPNG = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const size = 120;
    canvas.width = palette.length * size;
    canvas.height = size;

    palette.forEach((color, i) => {
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.fillRect(i * size, 0, size, size);
    });

    const link = document.createElement("a");
    link.download = "chromita-palette.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <button
      onClick={exportPNG}
      className="px-3 py-2 text-sm border border-neutral-700 hover:border-primary transition-colors"
    >
      <div className="flex items-center gap-2">
        <PiExportFill /> Export PNG
      </div>
    </button>
  );
}
