"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { PostLoginSplashOverlay } from "@/components/login/PostLoginSplashOverlay";
import { safeInternalPath } from "@/lib/safe-redirect";
import { SITE_NAME_GIF_SRC } from "@/lib/site-assets";
import Image from "next/image";

const CONTACT_EMAIL = "ellenxoonu@gmail.com";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showSplash, setShowSplash] = useState(false);

  const from = safeInternalPath(searchParams.get("from"));

  const handleSplashComplete = useCallback(() => {
    router.replace(from);
    router.refresh();
  }, [router, from]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/site-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          setError(data.error ?? "Something went wrong.");
          return;
        }
        setShowSplash(true);
      } catch {
        setError("Could not reach the server. Try again.");
      }
    });
  }

  return (
    <>
      {showSplash ? (
        <PostLoginSplashOverlay
          gifSrc={SITE_NAME_GIF_SRC}
          onComplete={handleSplashComplete}
        />
      ) : null}
      <form
        onSubmit={onSubmit}
        aria-hidden={showSplash}
        className={`mx-auto flex w-full max-w-[378px] flex-col items-stretch gap-6 text-center ${showSplash ? "pointer-events-none invisible" : ""}`}
        noValidate
      >
      <a href="/" className="site-header-name mb-0 mx-auto block shrink-0">
        <Image
          src={SITE_NAME_GIF_SRC}
          alt="Ellen Huynh"
          width={220}
          height={72}
          className="w-full"
          priority
          unoptimized
        />
      </a>

      <div className="font-sans text-[13px] font-normal leading-[1.45] text-[#303030] md:text-[14px] md:leading-[1.5]">
        <p className="m-0">
          Please refer to my resume in the application for the
        </p>
        <p className="m-0 mt-0.5">
          password or contact me at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#303030] underline decoration-[#303030]/35 underline-offset-2 transition-colors hover:decoration-[#303030]"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[321px] flex-col gap-2.5 text-left">
        <label className="sr-only" htmlFor="site-password">
          Password
        </label>
        <input
          id="site-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="box-border w-full rounded-full border border-[#303030]/18 bg-white px-4 py-2.5 text-[13px] font-normal leading-normal text-[#303030] shadow-[0_1px_0_rgba(0,0,0,0.03)] outline-none transition-[border-color,box-shadow] placeholder:text-[#a8a8a8] focus:border-[#303030]/35 focus:shadow-[0_0_0_3px_rgba(48,48,48,0.06)] md:text-[14px]"
          placeholder="Enter your password"
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={isPending || !password.trim()}
          className="liquid-glass-button liquid-glass-pill liquid-glass-nav box-border w-full px-4 py-2.5 text-center text-[13px] font-bold !no-underline disabled:pointer-events-none disabled:opacity-45 md:text-[14px]"
        >
          {isPending ? "Checking…" : "Submit"}
        </button>
      </div>

      {error ? (
        <p
          className="text-center text-[12px] font-normal leading-[1.4] text-red-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </form>
    </>
  );
}
