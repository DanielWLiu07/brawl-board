import { useEffect } from "react";
import { gsap } from "gsap";

export const useSidebarAnimations = (
  isOpen: boolean,
  sidebarRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!sidebarRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(sidebarRef.current, {
          width: 240,
          duration: 0.5,
          ease: "power3.inOut",
        });
        gsap.to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(sidebarRef.current, {
          width: 0,
          duration: 0.5,
          delay: 0.1,
          ease: "power3.inOut",
        });
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, [isOpen, sidebarRef, contentRef]);
};
