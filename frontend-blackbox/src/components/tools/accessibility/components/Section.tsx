interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Section({ title, description, children }: Props) {
  return (
    <div className="border border-white/10 p-6 rounded-lg space-y-4">
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>

      <div className="pt-4">{children}</div>
    </div>
  );
}
