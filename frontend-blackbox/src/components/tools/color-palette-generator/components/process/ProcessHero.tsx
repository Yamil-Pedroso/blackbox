type Props = {
  title: string;
  description: string;
};

export default function ProcessHero({ title, description }: Props) {
  return (
    <div className="space-y-4 border-b border-neutral-800 pb-10">
      <h1 className="text-3xl md:text-4xl font-geist text-primary">{title}</h1>

      <p className="text-secondary font-ibm-plex-mono max-w-2xl">
        {description}
      </p>
    </div>
  );
}
