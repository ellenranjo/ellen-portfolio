"use client";

import { useCallback, useId, useState } from "react";

export type PeerTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

type Props = {
  testimonials: PeerTestimonial[];
};

export function PeerTestimonials({ testimonials }: Props) {
  const baseId = useId();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = useCallback((id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {testimonials.map((item) => {
        const isOpen = !!open[item.id];
        const panelId = `${baseId}-panel-${item.id}`;
        const headerId = `${baseId}-header-${item.id}`;

        return (
          <div key={item.id} className="peer-item mx-0">
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="peer-name liquid-glass-button liquid-glass-pill liquid-glass-nav group flex w-full cursor-none items-center justify-between gap-3 text-left font-bold leading-snug [--liquid-glass-hover-scale:1.03] md:gap-4"
            >
              <div className="min-w-0 flex-1 font-sans text-[12px] md:text-[12px]">
                <span className="block">{item.name}</span>
                <span className="mt-0.5 block font-light opacity-90">
                  {item.role}
                </span>
              </div>
              <div
                className="arrow-accordian flex h-7 w-7 shrink-0 items-center justify-center overflow-visible"
                aria-hidden
              >
                <svg
                  key={`${item.id}-${isOpen ? "open" : "shut"}`}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className="peer-icon-toggle text-[#303030]"
                  fill="none"
                >
                  {isOpen ? (
                    <path
                      d="M2 7h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ) : (
                    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="7" y1="2" x2="7" y2="12" />
                      <line x1="2" y1="7" x2="12" y2="7" />
                    </g>
                  )}
                </svg>
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!isOpen}
              className={`peer-paragraph overflow-hidden transition-[max-height] duration-300 ease-out ${
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="mx-0 my-5 px-5 font-sans text-[12px] font-light leading-[18px] tracking-[0.5px] md:text-[12px] md:leading-[18px]">
                &quot;{item.quote}&quot;
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
