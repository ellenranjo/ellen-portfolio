"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const RESUME_PDF = "/Ellen-Huynh-Resume.pdf";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  return createPortal(
    <div
      ref={backdropRef}
      className="resume-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      <div className="resume-modal-content">
        <div className="resume-modal-toolbar">
          <span className="resume-modal-title">Ellen Huynh — Resume</span>
          <div className="resume-modal-actions">
            <a
              href={RESUME_PDF}
              download="Ellen Huynh Resume.pdf"
              className="resume-modal-btn"
              aria-label="Download resume"
            >
              <DownloadIcon />
              <span>Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="resume-modal-btn"
              aria-label="Close resume preview"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <iframe
            src={`${RESUME_PDF}#view=FitH`}
            title="Ellen Huynh Resume"
            className="resume-modal-iframe"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
