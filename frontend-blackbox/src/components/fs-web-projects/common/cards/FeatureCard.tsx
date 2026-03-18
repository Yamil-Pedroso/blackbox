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
      className={`border border-zinc-700 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/70 transition overflow-hidden ${width} ${height} ${className}`}
    >
      {image && (
        <div className="h-70 bg-linear-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-500 text-sm">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            "Project Image"
          )}
        </div>
      )}

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-semibold text-base">{title}</h3>
        </div>

        {description && (
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
        )}

        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-zinc-800 rounded">
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
