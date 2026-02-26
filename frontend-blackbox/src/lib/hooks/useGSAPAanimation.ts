/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import gsap from "gsap";

export const useGsapPageAnimation = <T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  animation: (tl: gsap.core.Timeline) => void,
  deps: any[] = [],
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      animation(tl);
    }, containerRef);

    return () => ctx.revert();
  }, deps);
};
