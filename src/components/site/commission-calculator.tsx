"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const fields = [
  { key: "rooms", label: "Rooms or villas", max: 2000 },
  { key: "rate", label: "Average nightly rate (US$)", max: 100000 },
  { key: "occupancy", label: "Occupancy across the year (%)", max: 100 },
  { key: "share", label: "Bookings that come through booking sites (%)", max: 100 },
  { key: "commission", label: "Commission they charge (%)", max: 100 },
] as const;

type Key = (typeof fields)[number]["key"];

// Plain arithmetic on the visitor's own numbers: what booking sites cost a year, and what moving a slice direct would free up.
export function CommissionCalculator() {
  const [v, setV] = useState<Record<Key, number>>({ rooms: 6, rate: 120, occupancy: 55, share: 70, commission: 15 });
  const [shift, setShift] = useState(20);

  const revenue = v.rooms * v.rate * 365 * (v.occupancy / 100);
  const commission = revenue * (v.share / 100) * (v.commission / 100);
  const freed = commission * (shift / 100);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4 rounded-xl border bg-card p-6 sm:p-8">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={`calc-${f.key}`}>{f.label}</Label>
            <Input
              id={`calc-${f.key}`}
              type="number"
              inputMode="decimal"
              min={0}
              max={f.max}
              value={v[f.key]}
              onChange={(e) => {
                const n = Number(e.target.value);
                setV({ ...v, [f.key]: Number.isFinite(n) ? Math.min(Math.max(n, 0), f.max) : 0 });
              }}
              className="h-11 font-mono"
            />
          </div>
        ))}
        <p className="text-xs text-muted-foreground">Starting numbers are examples. Use your own.</p>
      </div>

      <div className="rounded-xl border-2 border-primary bg-card p-6 sm:p-8" aria-live="polite">
        <p className="text-sm font-semibold text-muted-foreground">Commission paid to booking sites each year</p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight sm:text-5xl">{usd.format(commission)}</p>
        <p className="mt-2 text-sm text-muted-foreground">on about {usd.format(revenue)} of room revenue.</p>

        <div className="mt-8 space-y-2">
          <Label htmlFor="calc-shift">
            If <span className="font-mono font-semibold">{shift}%</span> of those bookings came to you directly
          </Label>
          <input
            id="calc-shift"
            type="range"
            min={5}
            max={50}
            step={5}
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <p className="mt-4">
          <span className="rounded-md bg-brand px-2 py-1 font-mono text-2xl font-bold text-brand-foreground">{usd.format(freed)}</span>
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          a year stays with you. That&apos;s the most you could spend winning those bookings yourself and be no worse off.
          Anything under it is margin.
        </p>
        <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">
          This is arithmetic on your numbers, not a forecast. Ads cost money too, and nobody can promise how many
          bookings will move.
        </p>
      </div>
    </div>
  );
}
