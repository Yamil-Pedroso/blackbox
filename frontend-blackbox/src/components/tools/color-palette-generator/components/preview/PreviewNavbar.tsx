type Props = {
  primary: string;
  background: string;
};

export default function PreviewNavbar({ primary, background }: Props) {
  return (
    <div
      className="flex justify-between items-center px-6 py-3 rounded-md"
      style={{ background }}
    >
      <span className="font-bold" style={{ color: primary }}>
        Brand
      </span>

      <div className="flex gap-4 text-sm">
        <span>Home</span>
        <span>Docs</span>
        <span>About</span>
      </div>
    </div>
  );
}
