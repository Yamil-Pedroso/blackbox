interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  width?: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard = ({
  icon,
  title,
  description,
  image,
  tags,
  width = "w-full",
  height = "h-auto",
  className = "",
  children,
}: FeatureCardProps) => {
  return (
    <div
      className={`border border-border rounded-xl bg-secondary-bg text-primary shadow-sm shadow-black/5 transition hover:border-green/50 hover:bg-tertiary dark:shadow-black/20 overflow-hidden flex flex-col ${width} ${height} ${className}`}
    >
      {image && (
        <div className="h-70 bg-linear-to-br from-muted to-secondary flex items-center justify-center text-secondary text-sm">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5 space-y-3 flex flex-col flex-1">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-semibold text-base">{title}</h3>
        </div>

        {description && (
          <p className="text-sm text-secondary leading-relaxed">{description}</p>
        )}

        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-muted text-secondary rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default FeatureCard;
