import ProcessHero from "./components/process/ProcessHero";
import ProcessSection from "./components/process/ProcessSection";
import ProcessCard from "./components/process/ProcessCard";
import ProcessTimeline from "./components/process/ProcessTimeLine";
import CodeBlock from "./components/process/CodeBlock";

export default function ColorPaletteProcess() {
  return (
    <div className="space-y-20 max-w-5xl">
      <ProcessHero
        title="Color Palette Generator"
        description="A utility for generating structured color scales from a base color using HSL transformations."
      />

      <ProcessSection title="Overview">
        The Color Palette Generator is a small utility designed to help
        developers and designers quickly create structured color palettes.
        Starting from a base color, the tool generates a range of shades that
        can be used in UI systems, design explorations or component libraries.
      </ProcessSection>

      <ProcessSection title="Problem">
        Developers often need color scales when building UI systems. Manually
        creating harmonious shades is slow and inconsistent, especially when
        trying to maintain proper contrast and visual balance across an
        interface.
      </ProcessSection>

      <ProcessSection title="Solution">
        The tool converts a base color into HSL format and generates shades by
        adjusting the lightness value while keeping hue and saturation constant.
        This approach ensures the palette remains visually consistent while
        producing predictable color variations.
      </ProcessSection>

      <ProcessSection title="Features">
        <div className="grid md:grid-cols-2 gap-6">
          <ProcessCard
            title="Color Picker"
            description="Select a base color that will generate the palette."
          />

          <ProcessCard
            title="Palette Generation"
            description="Generate multiple shades automatically based on HSL lightness variations."
          />

          <ProcessCard
            title="Interactive Cards"
            description="Hover over any color to reveal HEX, RGB and HSL formats."
          />

          <ProcessCard
            title="Copy to Clipboard"
            description="Click any color format to instantly copy the value."
          />
        </div>
      </ProcessSection>

      <ProcessSection title="Architecture">
        <CodeBlock
          code={`ColorPaletteGenerator
│
├── ColorPicker
├── PaletteGrid
│    └── ColorCard
│
├── usePalette (hook)
│
└── generateShades (logic)`}
        />
      </ProcessSection>

      <ProcessSection title="Implementation">
        <p className="mb-4">
          The palette generation logic is based on modifying the lightness
          component of an HSL color. By iterating through a range of lightness
          values, the tool creates a structured sequence of shades.
        </p>

        <CodeBlock
          code={`for (let i = 90; i >= 10; i -= 10) {
  shades.push(\`hsl(\${h}, \${s}%, \${i}%)\`)
}`}
        />
      </ProcessSection>

      <ProcessSection title="Development Flow">
        <ProcessTimeline
          steps={[
            {
              title: "Idea",
              description:
                "Create a utility for generating structured color palettes.",
            },
            {
              title: "Algorithm",
              description:
                "Generate shades by adjusting the HSL lightness value.",
            },
            {
              title: "UI Design",
              description:
                "Create a responsive grid that visually represents the palette.",
            },
            {
              title: "Interaction",
              description:
                "Add tooltip interaction and copy-to-clipboard functionality.",
            },
            {
              title: "Testing",
              description:
                "Ensure interactions work correctly across devices and screen sizes.",
            },
          ]}
        />
      </ProcessSection>

      <ProcessSection title="Lessons Learned">
        <ul className="list-disc pl-6 space-y-2 font-ibm-plex-mono text-secondary">
          <li>Managing tooltip interactions between hover and click states.</li>
          <li>Handling color conversions between HEX, RGB and HSL formats.</li>
          <li>Designing reusable React hooks for palette generation.</li>
          <li>
            Solving UI layering issues caused by absolute positioning and
            z-index.
          </li>
        </ul>
      </ProcessSection>

      <ProcessSection title="Next Steps">
        <ul className="list-disc pl-6 space-y-2 font-ibm-plex-mono text-secondary">
          <li>
            Add color harmony generation (triadic, complementary, analogous).
          </li>
          <li>Create Tailwind-like color scales.</li>
          <li>Allow palette export as JSON or CSS variables.</li>
          <li>Integrate AI-based palette recommendations.</li>
        </ul>
      </ProcessSection>
    </div>
  );
}
