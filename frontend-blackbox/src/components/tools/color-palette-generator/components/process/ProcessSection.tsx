type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ProcessSection({ title, children }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl font-geist text-primary">{title}</h2>

      <div className="text-secondary font-ibm-plex-mono leading-relaxed">
        {children}
      </div>
    </section>
  );
}
