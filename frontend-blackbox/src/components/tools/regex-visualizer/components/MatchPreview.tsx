interface Props {
  highlightedText: string;
}

export default function MatchPreview({ highlightedText }: Props) {
  return (
    <div className="p-4 border rounded bg-neutral-50 text-black">
      <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
    </div>
  );
}
