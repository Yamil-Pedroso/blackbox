type Props = {
  primary?: string;
  background: string;
};

export default function PreviewNavbar({ background }: Props) {
  return (
    <div
      className="flex justify-between items-center px-6 py-3"
      style={{ background }}
    >
      <span className="font-bold text-black">Brand</span>

      <div className="flex gap-4 text-sm text-black">
        <span>Home</span>
        <span>Docs</span>
        <span>About</span>
      </div>
    </div>
  );
}
