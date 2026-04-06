import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/login/LoginForm";
import { PasswordGateShell } from "@/components/PasswordGateShell";
import { hasValidGateCookie } from "@/lib/site-gate";
import { siteIcons } from "@/lib/site-icons";

export const metadata: Metadata = {
  title: "Enter password | Ellen Huynh",
  description: "Password protected portfolio access.",
  robots: { index: false, follow: false },
  icons: siteIcons,
};

function LoginFormFallback() {
  return (
    <div className="mx-auto w-full max-w-[380px] px-6 py-8 text-center text-[12px] font-light text-[#606060]">
      Loading…
    </div>
  );
}

export default async function LoginPage() {
  const cookieStore = await cookies();
  if (await hasValidGateCookie((name) => cookieStore.get(name)?.value)) {
    redirect("/");
  }

  return (
    <PasswordGateShell>
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </PasswordGateShell>
  );
}
