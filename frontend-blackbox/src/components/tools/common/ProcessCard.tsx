type Props = {
  title: string;
  description: string;
};

export default function ProcessCard({ title, description }: Props) {
  return (
    <div className="border border-neutral-800 p-5 bg-secondary-bg hover:border-primary transition-colors duration-300">
      <h3 className="font-geist text-primary text-lg mb-2">{title}</h3>

      <p className="text-secondary font-ibm-plex-mono text-sm">{description}</p>
    </div>
  );
}
