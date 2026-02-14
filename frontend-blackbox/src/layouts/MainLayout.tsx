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

  const hideRightSidebar = pathname === "/content1" || pathname === "/content2";

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);
  return (
    <div className="h-screen grid">
      <TopNavbar />

      <div
        className={`grid overflow-hidden ${hideRightSidebar ? "grid-cols-[300px_1fr]" : "grid-cols-[300px_1fr_200px] "}`}
      >
        <LeftSidebar />

        <main ref={mainRef} className="overflow-y-auto bg-main-bg">
          <div className="grid grid-cols-[40px_1fr] min-h-full">
            <div className="text-right pr-3 border-r border-neutral-800 font-ibm-plex-mono text-[11px] text-secondary select-none">
              {Array.from({ length: 357 }, (_, i) => (
                <div key={i + 1} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="">{children}</div>
          </div>
        </main>

        {!hideRightSidebar && <RightSidebar />}
      </div>
    </div>
  );
};

export default MainLayout;
