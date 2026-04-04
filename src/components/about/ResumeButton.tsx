"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ResumeModal = dynamic(() =>
  import("./ResumeModal").then((m) => m.ResumeModal),
  { ssr: false },
);

export function ResumeButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        <span className="site-header-nav__label site-header-nav__label--rest">
          resume
        </span>
        <span
          className="site-header-nav__label site-header-nav__label--hover"
          aria-hidden
        >
          [resume]
        </span>
      </button>
      {open && <ResumeModal onClose={() => setOpen(false)} />}
    </>
  );
}
