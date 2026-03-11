type Props = {
  code: string;
};

export default function CodeBlock({ code }: Props) {
  return (
    <pre className="bg-secondary-bg border border-neutral-800 p-4 overflow-x-auto text-sm font-ibm-plex-mono">
      <code>{code}</code>
    </pre>
  );
}
