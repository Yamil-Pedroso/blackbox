type Props = {
  surface: string;
  primary?: string;
};

export default function PreviewCard({ surface }: Props) {
  return (
    <div className="p-6 shadow-md max-w-md" style={{ background: surface }}>
      <h3 className="text-lg text-black font-semibold mb-2">Card Title</h3>

      <p className="text-sm opacity-80">
        This preview shows how the generated palette might look in a real UI
        component.
      </p>
    </div>
  );
}
