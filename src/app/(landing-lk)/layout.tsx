import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/site/logo";

// Same minimal layout as (landing), for Sri Lankan visitors: shows where we are instead of AEST hours.
export default function SriLankaLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <span className="text-sm text-muted-foreground">{site.base}</span>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name} ·{" "}
        <Link href="/privacy" className="hover:text-foreground">Privacy</Link> ·{" "}
        <Link href="/terms" className="hover:text-foreground">Terms</Link>
      </footer>
    </>
  );
}
