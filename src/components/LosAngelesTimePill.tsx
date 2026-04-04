"use client";

import { useEffect, useState } from "react";

const LA_TZ = "America/Los_Angeles";

function formatLaTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: LA_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function LosAngelesTimePill({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatLaTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={[
        "inline-flex items-center justify-center rounded-full bg-[#f0ff00] px-3.5 py-1.5 font-mono text-[10px] font-medium leading-none tracking-[0.02em] text-[#1f2328] md:px-4 md:text-[11px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={
        time
          ? `Los Angeles, California: ${time} Pacific`
          : "Current time in Los Angeles, California"
      }
    >
      <span className="tabular-nums">
        Los Angeles[CA]{" "}
        <span aria-live="polite">{time ?? "—"}</span>
      </span>
    </div>
  );
}
