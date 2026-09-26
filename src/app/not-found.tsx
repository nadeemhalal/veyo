import { CtaLink } from "@/components/site/cta-link";
import { Logo } from "@/components/site/logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <Logo />
      <h1 className="font-heading text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">That page doesn&apos;t exist, or it has moved.</p>
      <CtaLink href="/">Back to home</CtaLink>
    </main>
  );
}
