import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Toaster, toast } from "sonner";
import { FaGear } from "react-icons/fa6";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const hasShownGlobalToast = useRef(false);
  const prevPath = useRef<string | null>(null);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isImmersive =
    pathname.includes("/experiments/booking-simulation/app") ||
    pathname.includes("/experiments/booking-platform/app") ||
    pathname.includes("/experiments/booking-platform/success") ||
    pathname.includes("/tools/color-palette-generator/launch") ||
    pathname.includes("/tools/regex-visualizer/launch") ||
    pathname.includes("/tools/accessibility-playground/launch");

  useEffect(() => {
    const wasLaunch = prevPath.current?.includes("/launch");
    const isNowLaunch = pathname.includes("/launch");

    if (wasLaunch && !isNowLaunch) {
      toast.dismiss();
    }

    if (isNowLaunch) {
      prevPath.current = pathname;
      return;
    }

    if (!hasShownGlobalToast.current) {
      const timer = setTimeout(() => {
        toast.custom(
          () => (
            <div
              className="w-60 bg-[#181818] text-green-400 px-5 py-4 border border-green-500/30 font-mono text-sm flex flex-col gap-1 toast-slide-in"
              style={{ borderRadius: 0 }}
            >
              <div className="flex gap-2 text-green-300">
                🧠 <span className="uppercase">Blackbox System</span>
              </div>
              <div className="flex text-green-500">
                <div>
                  <FaGear
                    className="inline-block animate-spin"
                    style={{ animationDuration: "5s" }}
                  />
                </div>
                <p className="mx-2">Building new tools and experiments...</p>
              </div>
              <div className="text-xs text-green-500/60">● Status: Active</div>
            </div>
          ),
          { duration: 20000 },
        );

        hasShownGlobalToast.current = true;
      }, 5000);

      return () => clearTimeout(timer);
    }

    prevPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);

  if (isImmersive) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-white">
        <Toaster position="top-right" />
        {children}
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-y-auto">
      <Toaster position="bottom-right" expand />

      <TopNavbar />

      <div className="grid h-full overflow-hidden grid-cols-1 large:grid-cols-[300px_1fr_200px]">
        <LeftSidebar />

        <main
          ref={mainRef}
          className="overflow-y-auto bg-main-bg custom-scroll h-full"
        >
          <div className="grid grid-cols-[40px_1fr] min-h-full">
            <div className="text-right pr-3 border-r border-neutral-800 font-ibm-plex-mono text-[11px] text-secondary select-none">
              {Array.from({ length: 150 }, (_, i) => (
                <div key={i + 1} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {children}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
