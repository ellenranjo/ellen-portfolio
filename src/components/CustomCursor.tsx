"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const supportsFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!supportsFinePointer) return;

    const updateCursor = (clientX: number, clientY: number, interactive: boolean) => {
      if (!cursorRef.current) return;
      const scale = interactive ? 1.2 : 1;
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const handleMove = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const interactive =
        !!target?.closest("button") ||
        !!target?.closest("a.group") ||
        !!target?.closest("a.liquid-glass-button");

      if (!isVisible) setIsVisible(true);
      setIsInteractive((prev) => (prev === interactive ? prev : interactive));
      updateCursor(event.clientX, event.clientY, interactive);
    };

    const handleLeaveWindow = () => setIsVisible(false);
    const handleEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeaveWindow);
    window.addEventListener("mouseover", handleEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeaveWindow);
      window.removeEventListener("mouseover", handleEnterWindow);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={[
        "custom-cursor",
        isVisible ? "opacity-100" : "opacity-0",
        isInteractive ? "custom-cursor--interactive" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
