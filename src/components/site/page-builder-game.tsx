"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, MessageCircle, Search, Sparkles, Star } from "lucide-react";
import { websites } from "@/lib/site";
import { cn } from "@/lib/utils";

type BuildId = "landing" | "website";
type MeterId = (typeof websites.builder.meters)[number]["id"];

const { builder } = websites;

/**
 * "Build your page": pick a build, where traffic comes from and the SEO & GEO add-on. A finished phone mock-up
 * (a made-up brand) shows the matching page while four meters fill. "Get a quote for this build" ticks the matching answers in the
 * quote form below (#quote) and notes the build in its message box.
 */
export function PageBuilderGame({ region }: { region: "au" | "lk" }) {
  const { prices } = websites[region];
  const lk = region === "lk";
  const [build, setBuild] = useState<BuildId | null>(null);
  const [traffic, setTraffic] = useState<string[]>([]);
  const [seo, setSeo] = useState(false);

  const scores = meterScores(build, seo);
  const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / builder.meters.length);
  const level = [...builder.levels].reverse().find((l) => overall >= l.min) ?? builder.levels[0];
  const wantsSearch = traffic.some((t) => builder.traffic.find((o) => o.id === t)?.needsSeo);

  const fmt = (n: number) => `${prices.currency}${n.toLocaleString("en-AU")}`;
  const total = build ? prices[build] + (seo ? prices.seo : 0) : 0;

  function toggleTraffic(id: string) {
    setTraffic((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  }

  function sendToQuote() {
    const form = document.querySelector<HTMLFormElement>("#quote form");
    if (form && build) {
      const boxes = [...form.querySelectorAll<HTMLInputElement>('input[name="problems"]')];
      const paidAds = traffic.length === 0 || traffic.includes("meta");
      const wanted =
        build === "website"
          ? ["Full business website"]
          : [paidAds ? "Landing page for Meta ads" : boxes.find((b) => b.value.startsWith("Landing page for other"))?.value ?? ""];
      if (seo) wanted.push("SEO & GEO optimisation");
      for (const b of boxes) b.checked = wanted.includes(b.value);

      const note = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
      if (note && !note.value.trim()) {
        const buildName = builder.builds.find((b) => b.id === build)?.name ?? "";
        const sources = builder.traffic.filter((t) => traffic.includes(t.id)).map((t) => t.label);
        note.value = `My build: ${buildName}${seo ? " + SEO & GEO" : ""}.${sources.length ? ` Traffic from: ${sources.join(", ")}.` : ""}`;
      }
    }
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
    form?.querySelector<HTMLInputElement>("#name")?.focus({ preventScroll: true });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-14">
      {/* Controls */}
      <div className="space-y-8">
        <Step n={1} title="What are we building?">
          <div className="grid gap-3 sm:grid-cols-2">
            {builder.builds.map((b) => {
              const on = build === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setBuild(b.id as BuildId)}
                  className={cn(
                    "group rounded-xl border-2 bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    on ? "border-primary shadow-md" : "border-border",
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-heading text-lg font-bold">{b.name}</span>
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border",
                      )}
                      aria-hidden="true"
                    >
                      {on && <Check className="size-3.5" />}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{b.blurb}</span>
                  <span className="mt-3 block font-mono text-sm font-semibold">
                    {b.id === "website" ? "From " : ""}
                    {fmt(prices[b.id as BuildId])}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={2} title="Where will people come from?" hint="Tap any">
          <div className="flex flex-wrap gap-2">
            {builder.traffic.map((t) => {
              const on = traffic.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleTraffic(t.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    on ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          {wantsSearch && !seo && (
            <p className="mt-3 flex items-center gap-2 rounded-lg bg-brand/30 px-3 py-2 text-sm animate-in fade-in slide-in-from-top-1">
              <Sparkles className="size-4 shrink-0" aria-hidden="true" />
              Google and AI answers bring people in for free. That&apos;s what the SEO &amp; GEO power-up is for.
            </p>
          )}
        </Step>

        <Step n={3} title="Power-ups">
          <ul className="space-y-2 text-sm">
            {["Meta pixel, Conversions API and analytics", "Fast on a phone", "Basic SEO: titles, descriptions, sitemap", lk ? "WhatsApp order button" : "Forms, checkout or booking links"].map(
              (p) => (
                <li key={p} className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {p}
                  <span className="ml-auto text-xs font-semibold uppercase tracking-wide">Included</span>
                </li>
              ),
            )}
          </ul>
          <button
            type="button"
            role="switch"
            aria-checked={seo}
            onClick={() => setSeo((s) => !s)}
            className={cn(
              "mt-4 flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              seo ? "border-primary bg-primary text-primary-foreground" : "border-dashed hover:border-primary",
            )}
          >
            <span
              className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", seo ? "bg-brand" : "bg-muted-foreground/30")}
              aria-hidden="true"
            >
              <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", seo ? "left-[1.375rem]" : "left-0.5")} />
            </span>
            <span className="flex-1">
              <span className="block font-heading font-bold">SEO &amp; GEO optimisation</span>
              <span className={cn("block text-sm", seo ? "text-primary-foreground/80" : "text-muted-foreground")}>
                Get found on Google, and quoted by ChatGPT and Google&apos;s AI.
              </span>
            </span>
            <span className="font-mono text-sm font-semibold">+{fmt(prices.seo)}</span>
          </button>
        </Step>
        {/* On phones the preview sits below the controls, so the score and price ride along at the bottom. */}
        <div className="sticky bottom-3 z-10 -mx-1 flex items-center gap-3 rounded-xl border bg-background/95 p-2.5 pl-4 shadow-lg backdrop-blur lg:hidden">
          <span className={cn("font-heading text-lg font-bold", level.name === "veyo!" && "text-primary")}>
            {level.name === "meh" ? <span className="text-muted-foreground line-through">meh</span> : level.name}
          </span>
          <span className="font-mono text-sm font-semibold">{build ? `${build === "website" ? "From " : ""}${fmt(total)}` : ""}</span>
          <button
            type="button"
            onClick={sendToQuote}
            disabled={!build}
            className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-50"
          >
            Get a quote <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Live preview and score */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Phone build={build} seo={seo} lk={lk} traffic={builder.traffic.filter((t) => traffic.includes(t.id)).map((t) => t.label)} />
        <p className="text-center text-xs text-muted-foreground">Example page, for illustration. Tilt it.</p>

        <div className="mt-6 rounded-xl border bg-card p-5" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-muted-foreground">Your page</p>
            <p className={cn("font-heading text-2xl font-bold", level.name === "veyo!" && "text-primary")}>
              {level.name === "meh" ? <span className="text-muted-foreground line-through">meh</span> : level.name}
            </p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{level.note}</p>
          <div className="mt-4 space-y-3">
            {builder.meters.map((m) => (
              <Meter key={m.id} label={m.label} value={scores[m.id]} />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{builder.disclaimer}</p>

          <div className="mt-5 flex items-end justify-between border-t pt-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Your build</p>
              <p className="font-mono text-2xl font-bold">
                {build ? (
                  <>
                    {build === "website" && <span className="text-base font-semibold">From </span>}
                    {fmt(total)}
                  </>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">one-off{region === "au" ? ", + GST" : ""}</p>
          </div>
          <button
            type="button"
            onClick={sendToQuote}
            disabled={!build}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {build ? "Get a quote for this build" : "Pick a build first"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function meterScores(build: BuildId | null, seo: boolean): Record<MeterId, number> {
  const base = builder.points[build ?? "none"];
  const add = build && seo ? builder.points.seo : null;
  const out = {} as Record<MeterId, number>;
  for (const m of builder.meters) out[m.id] = Math.min(100, base[m.id] + (add?.[m.id] ?? 0));
  return out;
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">{n}</span>
        <span className="font-heading text-xl font-bold">{title}</span>
        {hint && <span className="hidden text-sm text-muted-foreground sm:inline">({hint.toLowerCase()})</span>}
      </legend>
      {children}
    </fieldset>
  );
}

/** A meter that fills smoothly and pops "+N" when its value goes up. */
function Meter({ label, value }: { label: string; value: number }) {
  const prev = useRef(value);
  const [pop, setPop] = useState<{ amount: number; key: number } | null>(null);

  useEffect(() => {
    const diff = value - prev.current;
    prev.current = value;
    if (diff > 0) setPop((p) => ({ amount: diff, key: (p?.key ?? 0) + 1 }));
  }, [value]);

  return (
    <div className="relative">
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono font-semibold">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", value >= 80 ? "bg-brand" : "bg-primary")}
          style={{ width: `${value}%` }}
        />
      </div>
      {pop && (
        <span
          key={pop.key}
          className="pointer-events-none absolute -top-1 right-10 animate-[veyo-pop_0.9s_ease-out_forwards] font-mono text-sm font-bold text-primary"
          aria-hidden="true"
        >
          +{pop.amount}
        </span>
      )}
    </div>
  );
}

/**
 * The 3D phone, showing a finished page for Dewlark, a made-up skincare brand. It is always fully built:
 * the build picks only change which parts show (site nav and sections for a full website, search and AI
 * cards for SEO & GEO). It tilts towards the pointer (or a finger) and sways gently when left alone.
 * Plain CSS 3D: no extra libraries.
 */
function Phone({ build, seo, lk, traffic }: { build: BuildId | null; seo: boolean; lk: boolean; traffic: string[] }) {
  const brand = "Dewlark";
  const domain = lk ? "dewlark.lk" : "dewlark.com.au";
  const product = "Glow serum";
  const website = build === "website";
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 22, y: px * 30 });
  }
  const resetTilt = () => setTilt(null);

  return (
    <div
      className="mx-auto w-full max-w-[22rem] cursor-grab touch-pan-y select-none overflow-hidden px-8 py-6 [perspective:1100px]"
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      onPointerUp={(e) => e.pointerType !== "mouse" && resetTilt()}
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-[18rem] [transform-style:preserve-3d]",
          tilt ? "transition-transform duration-150 ease-out" : "animate-[veyo-sway_7s_ease-in-out_infinite] motion-reduce:animate-none",
        )}
        style={tilt ? { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` } : undefined}
      >
        {/* Search and AI cards float in front when SEO & GEO is on */}
        {seo && (
          <div className="mb-3 space-y-2 [transform-style:preserve-3d]">
            <div className="rounded-lg border bg-card p-3 text-xs shadow-lg" style={{ transform: "translateZ(70px)" }}>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <Search className="size-3" />
                {domain}
              </p>
              <p className="mt-0.5 font-semibold text-primary">
                {product} | {brand}
              </p>
              <p className="text-muted-foreground">★★★★★ Rated by customers · Ships {lk ? "islandwide" : "Australia-wide"}</p>
            </div>
            <div className="ml-6 flex items-start gap-2 rounded-lg border bg-card p-3 text-xs shadow-lg" style={{ transform: "translateZ(110px)" }}>
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <p>
                <span className="text-muted-foreground">AI answer: </span>
                &ldquo;For a {product.toLowerCase()}, {domain} is worth a look&hellip;&rdquo;
              </p>
            </div>
          </div>
        )}

        <div className="relative [transform-style:preserve-3d]">
          {/* The back of the phone, for thickness when it tilts */}
          <div className="absolute inset-0 rounded-[2.25rem] bg-[#0b0b10]" style={{ transform: "translateZ(-16px)" }} />
          <div className="absolute inset-0 rounded-[2.25rem] bg-[#16161D]" style={{ transform: "translateZ(-8px)" }} />

          <div className="relative rounded-[2.25rem] border-[6px] border-[#16161D] bg-[#16161D] p-1 shadow-2xl [transform-style:preserve-3d] dark:border-white/15">
            <div className="relative h-[26rem] rounded-[1.75rem] bg-background [transform-style:preserve-3d]">
              <div className="mx-auto pt-2" style={{ transform: "translateZ(4px)" }}>
                <div className="mx-auto h-4 w-20 rounded-full bg-[#16161D]" />
              </div>

              <div className="space-y-2.5 px-3 pt-2 [transform-style:preserve-3d]">
                {traffic.length > 0 && (
                  <div className="truncate rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground" style={{ transform: "translateZ(8px)" }}>
                    Visitors from: {traffic.join(" · ")}
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground" style={{ transform: "translateZ(10px)" }}>
                  <span className="font-heading text-xs font-bold tracking-tight text-foreground">{brand.toLowerCase()}</span>
                  {website && (
                    <span className="flex gap-2.5">
                      {["Shop", "About", "Contact"].map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                  )}
                </div>

                <div className="flex h-24 items-end rounded-xl bg-primary p-3" style={{ transform: "translateZ(28px)" }}>
                  <p className="font-heading text-sm font-bold leading-tight text-primary-foreground">
                    {product}.<br />
                    {lk ? "Islandwide delivery." : "Ships tomorrow."}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-md" style={{ transform: "translateZ(18px)" }}>
                  <span className="font-mono text-sm font-bold">{lk ? "Rs 4,500" : "A$49"}</span>
                  <span className="flex gap-0.5 text-primary">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="size-3 fill-current" />
                    ))}
                  </span>
                </div>

                <p className="text-[10px] leading-snug text-muted-foreground" style={{ transform: "translateZ(8px)" }}>
                  A light serum for a fresh, dewy look. Rosehip and niacinamide, 30 ml.
                </p>

                <div
                  className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-brand text-xs font-bold text-brand-foreground shadow-lg"
                  style={{ transform: "translateZ(44px)" }}
                >
                  {lk && <MessageCircle className="size-3.5" />}
                  {lk ? "Order on WhatsApp" : "Add to cart"}
                </div>

                {website && (
                  <div className="grid grid-cols-2 gap-2" style={{ transform: "translateZ(16px)" }}>
                    {["Our story", lk ? "Delivery" : "Reviews"].map((t) => (
                      <div key={t} className="rounded-lg border bg-card p-2">
                        <p className="text-[10px] font-semibold">{t}</p>
                        <div className="mt-1.5 h-1.5 w-full rounded bg-muted" />
                        <div className="mt-1 h-1.5 w-2/3 rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                )}

                {seo && (
                  <p className="flex items-center gap-1 text-[10px] font-medium text-primary" style={{ transform: "translateZ(12px)" }}>
                    <Check className="size-3" /> FAQs answered · schema markup · search-ready
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The hero demo: the finished page (full website with SEO & GEO), tiltable like the one in the game. */
export function HeroPhoneDemo({ region }: { region: "au" | "lk" }) {
  return (
    <div className="flex flex-col justify-end sm:min-h-[37rem]">
      <Phone build="website" seo lk={region === "lk"} traffic={["Meta ads", "Google search", "ChatGPT"]} />
      <p className="text-center text-xs text-muted-foreground">Example page for a made-up brand. Tilt it, then build yours below.</p>
    </div>
  );
}
