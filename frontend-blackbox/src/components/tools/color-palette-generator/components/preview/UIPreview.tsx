import PreviewButton from "./PreviewButton";
import PreviewCard from "./PreviewCard";
import PreviewNavbar from "./PreviewNavbar";

type Props = {
  palette: string[];
};

export default function UIPreview({ palette }: Props) {
  const primary = palette[4] || palette[0];
  const secondary = palette[6] || palette[1];
  const background = palette[0];
  const surface = palette[2];

  return (
    <div className="mt-16 space-y-8">
      <h2 className="text-2xl font-semibold">UI Preview</h2>

      <PreviewNavbar primary={primary} background={background} />

      <PreviewCard surface={surface} primary={primary} />

      <div className="flex gap-4">
        <PreviewButton color={primary}>Primary</PreviewButton>

        <PreviewButton color={secondary}>Secondary</PreviewButton>
      </div>
    </div>
  );
}
