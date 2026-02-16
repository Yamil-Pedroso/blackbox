import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import Lenis from "lenis";
import MainLayout from "../layouts/MainLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const main = document.querySelector("main");

    if (!main) return;

    const lenis = new Lenis({
      wrapper: main,
      content: main,
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </QueryClientProvider>
  );
}
