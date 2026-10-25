"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const rs = (n: number) => `Rs ${Math.round(n).toLocaleString("en-US")}`;

const fields = [
  { key: "spend", label: "Meta ad spend this month (Rs)", max: 100_000_000 },
  { key: "orders", label: "Orders placed from ads", max: 1_000_000 },
  { key: "cod", label: "Orders paid cash on delivery (%)", max: 100 },
  { key: "refused", label: "COD orders refused or not collected (%)", max: 100 },
  { key: "courier", label: "Courier cost of a failed delivery (Rs)", max: 100_000 },
] as const;

type Key = (typeof fields)[number]["key"];

// Plain arithmetic on the visitor's own numbers: cost per order as Ads Manager shows it, and per order actually paid for.
export function CodCalculator() {
  const [v, setV] = useState<Record<Key, number>>({ spend: 150000, orders: 300, cod: 60, refused: 15, courier: 400 });

  const failed = v.orders * (v.cod / 100) * (v.refused / 100);
  const paid = Math.max(v.orders - failed, 0);
  const perPlaced = v.orders > 0 ? v.spend / v.orders : 0;
  const perPaid = paid > 0 ? (v.spend + failed * v.courier) / paid : 0;
  const gap = perPlaced > 0 ? (perPaid / perPlaced - 1) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4 rounded-xl border bg-card p-6 sm:p-8">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={`cod-${f.key}`}>{f.label}</Label>
            <Input
              id={`cod-${f.key}`}
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
        <p className="text-sm font-semibold text-muted-foreground">What Ads Manager shows: cost per order</p>
        <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-muted-foreground">{rs(perPlaced)}</p>

        <p className="mt-8 text-sm font-semibold text-muted-foreground">What you actually pay per order that&apos;s paid for</p>
        <p className="mt-2">
          <span className="rounded-md bg-brand px-2 py-1 font-mono text-4xl font-bold tracking-tight text-brand-foreground">{rs(perPaid)}</span>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          That&apos;s <span className="font-mono font-semibold text-foreground">{Math.round(gap)}%</span> more, after{" "}
          <span className="font-mono font-semibold text-foreground">{Math.round(failed)}</span> orders that never got paid for
          and {rs(failed * v.courier)} in courier costs for them.
        </p>
        <p className="mt-6 border-t pt-4 text-sm">
          If the ads are judged on the first number, they&apos;ll happily keep buying orders that never get paid for. We
          set them up to learn from the second.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Arithmetic on your numbers, not a forecast.</p>
      </div>
    </div>
  );
}
