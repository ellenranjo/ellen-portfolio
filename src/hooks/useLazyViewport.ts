"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_ROOT_MARGIN = "480px 0px";

/** Defer heavy media until near the viewport unless `priority` is set. */
export function useLazyViewport(
  priority = false,
  rootMargin = DEFAULT_ROOT_MARGIN,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    if (priority || isInView) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, isInView, rootMargin]);

  return { containerRef, isInView };
}
