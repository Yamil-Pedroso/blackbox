import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import AccessibilityNav from "./components/AccessibilityNav";
import RenderDemo from "./components/RenderDemo";
import { toast } from "sonner";

export default function AccessibilityPlayground() {
  const [active, setActive] = useState("keyboard");
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) return;

    const id = toast("UI is under active development ⚠️", {
      description:
        "This interface will evolve as new accessibility demos are added.",
      duration: 10000,
    });

    hasShownToast.current = true;

    return () => {
      toast.dismiss(id);
    };
  }, []);

  return (
    <div className="h-screen p-8 overflow-scroll">
      <Link to="/tools" className="text-sm text-black transition-colors">
        ← Back to Tools
      </Link>
      <AccessibilityNav active={active} setActive={setActive} />

      <div className="max-w-4xl mx-auto">
        <RenderDemo active={active} />
      </div>
    </div>
  );
}
