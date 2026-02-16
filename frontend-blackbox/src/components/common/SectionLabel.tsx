interface SectionLabelProps {
  text: string;
}

const SectionLabel = ({ text }: SectionLabelProps) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 opacity-70">
      <div className="h-px w-4 sm:w-6 md:w-8 bg-neutral-700" />

      <span
        className="
          font-ibm-plex-mono
          text-[0.6rem] sm:text-[0.7rem] md:text-[0.75rem]
          tracking-widest
          text-secondary
          uppercase
          whitespace-nowrap
        "
      >
        [ {text} ]
      </span>

      <div className="h-px flex-1 bg-neutral-800" />
    </div>
  );
};

export default SectionLabel;
