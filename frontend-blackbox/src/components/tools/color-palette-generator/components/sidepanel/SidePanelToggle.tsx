import { FaSlidersH, FaTimes } from "react-icons/fa";

type Props = {
  open: boolean;
  toggle: () => void;
};

export default function SidePanelToggle({ open, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="
        fixed right-6 top-6
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-primary text-black
        shadow-lg
        hover:scale-105
        transition-transform
        cursor-pointer
      "
    >
      {open ? <FaTimes /> : <FaSlidersH />}
    </button>
  );
}
