import { CtaLink } from "@/components/site/cta-link";
import { Logo } from "@/components/site/logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <Logo />
      <h1 className="font-heading text-4xl font-bold tracking-tight">Well, that&apos;s a bit meh.</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist, or it has moved. Let&apos;s get you somewhere with an exclamation mark.</p>
      <CtaLink href="/">Back to home</CtaLink>
    </main>
  );
}
