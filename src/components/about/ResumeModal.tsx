"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

/** Same-origin worker — desktop / Android canvas path only. */
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const RESUME_PDF = "/Ellen-Huynh-Resume.pdf";

/**
 * iPhone / iPod, iPad (incl. “desktop” UA), and any iPadOS reporting as Mac + touch.
 * Chrome on iPad still uses WebKit — PDF.js canvas is unreliable; use native viewer.
 */
function isAppleTouchDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function NativePdfViewer({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="resume-modal-native">
      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="resume-modal-native-open"
      >
        Open full screen
      </a>
      {/* WebKit (Safari / Chrome on iPad): native PDF via embed; PDF.js canvas is unreliable */}
      <div
        className="resume-modal-native-embed-wrap"
        role="region"
        aria-label="Resume PDF preview"
      >
        <embed src={pdfUrl} type="application/pdf" className="resume-modal-native-embed" />
      </div>
    </div>
  );
}

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [useNativeViewer] = useState(isAppleTouchDevice);
  const [numPages, setNumPages] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [loadError, setLoadError] = useState(false);

  const absolutePdfUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URL(RESUME_PDF, window.location.origin).href;
  }, []);

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

  useLayoutEffect(() => {
    if (useNativeViewer) return;
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setContainerWidth(w);
    };
    measure();
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      if (w > 0) setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [useNativeViewer]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleBackdropPointerUp = (e: React.PointerEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const pageWidth =
    containerWidth > 0
      ? containerWidth
      : typeof window !== "undefined"
        ? Math.min(640, Math.floor(window.innerWidth * 0.82))
        : undefined;

  return createPortal(
    <div
      ref={backdropRef}
      className="resume-modal-backdrop"
      onClick={handleBackdropClick}
      onPointerUp={handleBackdropPointerUp}
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      <div className="resume-modal-content" ref={contentRef}>
        <button
          type="button"
          onClick={onClose}
          className="resume-modal-close"
          aria-label="Close resume preview"
        >
          <CloseIcon />
        </button>

        <div
          className={
            useNativeViewer
              ? "resume-modal-body resume-modal-body--native"
              : "resume-modal-body"
          }
        >
          {useNativeViewer && absolutePdfUrl ? (
            <NativePdfViewer pdfUrl={absolutePdfUrl} />
          ) : loadError ? (
            <div className="resume-modal-fallback">
              <p className="resume-modal-fallback__note">
                Preview couldn&apos;t load here. Use the viewer below or
                download.
              </p>
              <iframe
                title="Resume PDF"
                src={`${RESUME_PDF}#view=FitH`}
                className="resume-modal-fallback__iframe"
              />
            </div>
          ) : (
            <Document
              file={RESUME_PDF}
              onLoadSuccess={({ numPages: n }) => {
                setLoadError(false);
                setNumPages(n);
              }}
              onLoadError={() => setLoadError(true)}
              loading={
                <div className="resume-modal-loading">Loading resume…</div>
              }
              error={
                <div className="resume-modal-loading">
                  Couldn&apos;t load resume.
                </div>
              }
            >
              {Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={i}
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="resume-modal-page"
                />
              ))}
            </Document>
          )}
        </div>

        <div className="resume-modal-bottom">
          <a
            href={useNativeViewer && absolutePdfUrl ? absolutePdfUrl : RESUME_PDF}
            download={useNativeViewer ? undefined : "Ellen Huynh Resume.pdf"}
            className="resume-modal-download"
            target="_blank"
            rel="noreferrer"
          >
            <DownloadIcon />
            <span>
              {useNativeViewer ? "Open / save resume" : "Download Resume"}
            </span>
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
