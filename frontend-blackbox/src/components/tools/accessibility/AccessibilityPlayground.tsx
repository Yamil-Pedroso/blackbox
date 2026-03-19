import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import AccessibilityTables from "./components/DoAvoidCard";

export default function AccessibilityPlayground() {
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
    <div className="bg-secondary-bg p-6">
      <Link to="/tools" className="text-sm text-white transition-colors">
        ← Back to Tools
      </Link>

      <AccessibilityTables />
    </div>
  );
}
