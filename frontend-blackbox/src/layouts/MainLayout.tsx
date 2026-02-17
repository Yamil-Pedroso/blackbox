import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isImmersive = pathname.includes("/experiments/booking-simulation/app");

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
        {children}
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">
      <TopNavbar />

      <div className="grid h-full overflow-hidden grid-cols-1 large:grid-cols-[300px_1fr_200px]">
        <LeftSidebar />

        <main
          ref={mainRef}
          className="overflow-y-auto bg-main-bg custom-scroll"
        >
          <div className="grid grid-cols-[40px_1fr] min-h-full">
            <div className="text-right pr-3 border-r border-neutral-800 font-ibm-plex-mono text-[11px] text-secondary select-none">
              {Array.from({ length: 65 }, (_, i) => (
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
