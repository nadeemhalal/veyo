"use client";

import { useState } from "react";
import { CtaLink } from "./cta-link";

export type LeakStage = { stage: string; items: readonly { id: string; label: string }[] };

function level(score: number, total: number) {
  if (score <= total * 0.4) return { name: "Leaky", body: "Buyers are getting lost between the ad and the order. The good news: the first fixes are usually cheap." };
  if (score < total - 1) return { name: "Steady", body: "The basics are there. The boxes you left empty are where to look next." };
  return { name: "Scaling", body: "You're ahead of most ads we looked at. From here it's testing creative and markets." };
}

// Self-check that follows one buyer from scroll to sale. Nothing is saved or sent.
export function LeakCheck({ stages }: { stages: readonly LeakStage[] }) {
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const total = stages.reduce((n, s) => n + s.items.length, 0);
  const score = Object.values(ticked).filter(Boolean).length;
  const result = level(score, total);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <ol className="space-y-4">
        {stages.map((s, i) => (
          <li key={s.stage} className="rounded-xl border bg-card p-5">
            <p className="font-mono text-xs font-semibold text-primary">
              {String(i + 1).padStart(2, "0")} · {s.stage}
            </p>
            <div className="mt-3 space-y-3">
              {s.items.map((item) => (
                <label key={item.id} className="flex cursor-pointer gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={!!ticked[item.id]}
                    onChange={(e) => setTicked({ ...ticked, [item.id]: e.target.checked })}
                    className="mt-0.5 size-4 shrink-0 accent-primary"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="h-fit rounded-xl border-2 border-primary bg-card p-6 sm:p-8 lg:sticky lg:top-6" aria-live="polite">
        <p className="text-sm font-semibold text-muted-foreground">Your score</p>
        <p className="mt-2 font-mono text-5xl font-bold tracking-tight">
          {score}
          <span className="text-2xl text-muted-foreground">/{total}</span>
        </p>
        <p className="mt-4 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-brand-foreground">{result.name}</p>
        <p className="mt-3 text-sm text-muted-foreground">{result.body}</p>
        <CtaLink href="#review" className="mt-6 w-full" arrow>
          Get the empty boxes reviewed
        </CtaLink>
        <p className="mt-3 text-center text-xs text-muted-foreground">Nothing you tick here is saved or sent.</p>
      </div>
    </div>
  );
}
