"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type MakeoverAd = { text: string; headline: string; cta: string; notes: readonly string[]; tag?: string };
export type Makeover = { type: string; meh: MakeoverAd; veyo: MakeoverAd };

// Before/after ad mock-ups: pick an example, see the "meh" ad beside the "veyo!" one. All ads are made-up examples.
export function AdMakeover({
  makeovers,
  groupLabel,
  mehCaption = "BEST QUALITY",
}: {
  makeovers: readonly Makeover[];
  groupLabel: string;
  /** Slogan printed across the "meh" ad's picture. */
  mehCaption?: string;
}) {
  const [active, setActive] = useState(0);
  const makeover = makeovers[active];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={groupLabel}>
        {makeovers.map((m, i) => (
          <button
            key={m.type}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "h-10 rounded-full border px-5 text-sm font-semibold transition-colors",
              i === active ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted",
            )}
          >
            {m.type}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <AdColumn label="Meh" ad={makeover.meh} good={false} caption={mehCaption} />
        <AdColumn label="veyo!" ad={makeover.veyo} good caption={mehCaption} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Made-up examples. Your ads would use your real prices, photos and reviews.
      </p>
    </div>
  );
}

function AdColumn({ label, ad, good, caption }: { label: string; ad: MakeoverAd; good: boolean; caption: string }) {
  return (
    <div>
      <p className={cn("mb-3 text-sm font-semibold uppercase tracking-wider", good ? "text-primary" : "text-muted-foreground line-through decoration-brand decoration-2")}>
        {label}
      </p>
      <article className={cn("overflow-hidden rounded-xl border bg-card", good ? "border-primary ring-2 ring-primary/20" : "opacity-80")}>
        <div className="flex items-center gap-3 p-4">
          <span className="size-9 rounded-full bg-muted" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold">Your business</p>
            <p className="text-xs text-muted-foreground">Sponsored</p>
          </div>
        </div>
        <p className="px-4 pb-4 text-sm">{ad.text}</p>
        <AdArt good={good} tag={ad.tag} caption={caption} />
        <div className="flex items-center justify-between gap-3 bg-muted/60 p-4">
          <p className="text-sm font-semibold">{ad.headline}</p>
          <span className="shrink-0 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold">{ad.cta}</span>
        </div>
      </article>
      <ul className="mt-4 space-y-2 text-sm">
        {ad.notes.map((n) => (
          <li key={n} className="flex gap-2">
            {good ? (
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            )}
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Flat placeholder standing in for the ad's photo or video.
function AdArt({ good, tag, caption }: { good: boolean; tag?: string; caption: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 400 220" className={cn("block w-full", !good && "grayscale")} aria-hidden="true">
        <rect width="400" height="220" fill={good ? "#1E1B5E" : "#6B6F80"} />
        <circle cx="300" cy="70" r="34" fill={good ? "#C6F24E" : "#FAFAF7"} />
        <rect y="140" width="400" height="80" fill="#16161D" opacity="0.55" />
        <path d="M0 175 Q100 150 200 172 T400 165 V220 H0Z" fill="#FAFAF7" opacity="0.9" />
        <path d="M88 178 C92 130 96 105 108 80" stroke="#FAFAF7" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M108 80 C80 70 62 78 50 96 M108 80 C92 56 72 50 56 54 M108 80 C120 54 142 48 158 56 M108 80 C136 74 152 84 162 102" stroke="#FAFAF7" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      {good && tag ? (
        <span className="absolute bottom-3 left-3 rounded-md bg-brand px-3 py-1.5 font-mono text-sm font-semibold text-brand-foreground">{tag}</span>
      ) : (
        !good && <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-lg font-semibold tracking-[0.3em] text-white/80">{caption}</span>
      )}
    </div>
  );
}
