import { useState } from "react";
import ImageUpload from "./ImageUpload";
import ExtractPaletteButton from "./ExtractPaletteButton";
import { extractPaletteFromImage } from "../../services/aiImagePalette.service";

type Props = {
  setPalette: (colors: string[]) => void;
};

export default function ImagePaletteExtractor({ setPalette }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const extract = async () => {
    if (!file) return;

    setLoading(true);

    const palette = await extractPaletteFromImage(file);

    setPalette(palette);

    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <ImageUpload onSelect={handleSelect} preview={preview} />

      <ExtractPaletteButton onClick={extract} loading={loading} />
    </div>
  );
}
