"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Season in the northern hemisphere for a month index (0 = January).
function northSeason(m: number) {
  if (m === 11 || m <= 1) return "Winter";
  if (m <= 4) return "Spring";
  if (m <= 7) return "Summer";
  return "Autumn";
}

const opposite: Record<string, string> = { Winter: "Summer", Spring: "Autumn", Summer: "Winter", Autumn: "Spring" };

// Rough guide to which side of the island has its dry season.
function islandSeason(m: number) {
  if (m >= 10 || m <= 3) return { where: "South and west coast", note: "Dry season on the south and west coasts." };
  if (m >= 4 && m <= 8) return { where: "East coast", note: "Dry season on the east coast." };
  return { where: "In between", note: "Between monsoons. Hill country and culture trips carry the month." };
}

function verdict(north: string) {
  if (north === "Winter") return "\"Escape the winter\" works in London. In Sydney it's summer.";
  if (north === "Summer") return "\"Escape the winter\" works in Sydney. In London it's summer.";
  return `It's ${north.toLowerCase()} in London and ${opposite[north].toLowerCase()} in Sydney. Same island, two different reasons to come.`;
}

// Shows why one ad can't suit every market: pick a month, see the season in each place.
export function SeasonPicker() {
  const [month, setMonth] = useState(11);
  const north = northSeason(month);
  const island = islandSeason(month);

  const cards = [
    { place: "London, Berlin, Moscow", value: north },
    { place: "Sydney, Melbourne", value: opposite[north] },
    { place: "In season in Sri Lanka", value: island.where },
  ];

  return (
    <div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-12" role="group" aria-label="Month">
        {months.map((name, i) => (
          <button
            key={name}
            type="button"
            aria-pressed={i === month}
            onClick={() => setMonth(i)}
            className={cn(
              "h-10 rounded-lg border font-mono text-sm font-semibold transition-colors",
              i === month ? "border-brand bg-brand text-brand-foreground" : "border-white/20 hover:bg-white/10",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3" aria-live="polite">
        {cards.map((c) => (
          <div key={c.place} className="rounded-xl border border-white/15 bg-white/5 p-6">
            <dt className="text-sm text-primary-foreground/75">{c.place}</dt>
            <dd className="order-first mt-2 font-heading text-2xl font-bold tracking-tight">{c.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-lg font-medium">{verdict(north)}</p>
      <p className="mt-2 text-sm text-primary-foreground/70">{island.note} A rough guide: the weather doesn&apos;t read calendars.</p>
    </div>
  );
}
