const sections = [
  { id: "keyboard", label: "Keyboard" },
  { id: "screen", label: "ScreenReader" },
  { id: "focus", label: "Focus" },
  { id: "contrast", label: "Contrast" },
];

function AccessibilityNav({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <div
      className="

      flex justify-center gap-6
      mb-10
      font-mono
    "
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActive(section.id)}
          className={`
            transition
            ${active === section.id ? "text-blue-700" : "text-gray-400"}
            hover:text-black/80
          `}
        >
          [{section.label}]
        </button>
      ))}
    </div>
  );
}

export default AccessibilityNav;
