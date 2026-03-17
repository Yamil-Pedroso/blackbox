import KeyboardNavigationDemo from "../demos/KeyboardNavigationDemo";
import ScreenReaderDemo from "../demos/ScreenReaderDemo";
import FocusTrapModal from "../demos/FocusTrapModal";
import ContrastChecker from "../demos/ContrastChecker";

function RenderDemo({ active }: { active: string }) {
  switch (active) {
    case "keyboard":
      return <KeyboardNavigationDemo />;

    case "screen":
      return <ScreenReaderDemo />;

    case "focus":
      return <FocusTrapModal />;

    case "contrast":
      return <ContrastChecker />;

    default:
      return <KeyboardNavigationDemo />;
  }
}

export default RenderDemo;
