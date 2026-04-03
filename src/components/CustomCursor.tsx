"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_MQ = "(min-width: 992px)";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerMq = window.matchMedia("(pointer: fine)");
    const desktopMq = window.matchMedia(DESKTOP_MQ);

    const checkEnabled = () => setEnabled(pointerMq.matches && desktopMq.matches);
    checkEnabled();

    pointerMq.addEventListener("change", checkEnabled);
    desktopMq.addEventListener("change", checkEnabled);

    return () => {
      pointerMq.removeEventListener("change", checkEnabled);
      desktopMq.removeEventListener("change", checkEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

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

      setIsVisible(true);
      setIsInteractive((prev) => (prev === interactive ? prev : interactive));
      updateCursor(event.clientX, event.clientY, interactive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled]);

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
