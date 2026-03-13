type Props = {
  surface: string;
  primary: string;
};

export default function PreviewCard({ surface, primary }: Props) {
  return (
    <div
      className="p-6 rounded-lg shadow-md max-w-md"
      style={{ background: surface }}
    >
      <h3 className="text-lg font-semibold mb-2" style={{ color: primary }}>
        Card Title
      </h3>

      <p className="text-sm opacity-80">
        This preview shows how the generated palette might look in a real UI
        component.
      </p>
    </div>
  );
}
