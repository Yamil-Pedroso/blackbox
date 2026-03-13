import { useState } from "react";

type Props = {
  onSelect: (file: File) => void;
  preview: string | null;
};

export default function ImageUpload({ onSelect, preview }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <label
      htmlFor="imageUpload"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      className={`relative flex items-center justify-center border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition
      ${
        dragging
          ? "border-primary bg-primary/10"
          : "border-neutral-700 hover:border-neutral-500"
      }`}
      style={{ height: "300px", width: "280px" }}
    >
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* IMAGE */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {/* TEXT */}
      {!preview && (
        <div className="text-sm text-neutral-400 text-center">
          Drag & Drop image here
          <div className="text-xs text-neutral-500 mt-1">
            or Upload from device
          </div>
        </div>
      )}
    </label>
  );
}
