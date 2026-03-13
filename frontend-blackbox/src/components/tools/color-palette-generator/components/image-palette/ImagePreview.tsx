type Props = {
  src: string | null;
};

export default function ImagePreview({ src }: Props) {
  if (!src) return null;

  return (
    <div className="mt-4">
      <img
        src={src}
        alt="Uploaded preview"
        className="max-h-48 rounded border border-neutral-700"
      />
    </div>
  );
}
