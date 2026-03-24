"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PostLoginSplashOverlayProps = {
  gifSrc: string;
  onComplete: () => void;
};

/**
 * Full-screen overlay after successful password entry: clip-path “plates” press the
 * logo flat to a line, then horizontal shutters snap shut — before `onComplete`.
 */
export function PostLoginSplashOverlay({
  gifSrc,
  onComplete,
}: PostLoginSplashOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.classList.add("login-splash-open");
    return () => {
      document.body.classList.remove("login-splash-open");
    };
  }, []);

  /** Safety if animation events don’t fire in an edge browser. */
  useEffect(() => {
    const id = window.setTimeout(finish, 2600);
    return () => window.clearTimeout(id);
  }, [finish]);

  function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    finish();
  }

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const node = (
    <div
      className="login-splash-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      role="presentation"
      aria-hidden
    >
      <div className="login-splash-overlay__logo-wrap">
        <div
          className="login-splash-overlay__logo site-header-name shrink-0"
          onAnimationEnd={handleAnimationEnd}
        >
          <Image
            src={gifSrc}
            alt=""
            width={220}
            height={72}
            className="block w-full max-w-none"
            draggable={false}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
