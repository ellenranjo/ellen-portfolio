"use client";

import { useState } from "react";
import { ResumeModal } from "./ResumeModal";

export function ResumeButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        Resume
      </button>
      {open && <ResumeModal onClose={() => setOpen(false)} />}
    </>
  );
}
