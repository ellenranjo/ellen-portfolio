import type { ReactNode } from "react";

/**
 * Minimal full-viewport shell for the password gate (matches ellenhuynh.com structure:
 * centered wordmark + copy + form block).
 */
export function PasswordGateShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#303030] md:cursor-none">
      <div className="mx-auto flex w-full max-w-[432px] flex-1 flex-col justify-center px-6 py-12 md:px-8">
        {children}
      </div>
      <footer className="pb-8 text-center text-[65%] font-light leading-[15px] text-[#606060]">
        ©2026 Ellen Huynh. All Rights Reserved.
      </footer>
    </main>
  );
}
