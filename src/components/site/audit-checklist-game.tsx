"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Mail, RotateCcw, Sparkles } from "lucide-react";
import { emailChecklistReport, viewChecklistResult, type EmailReportState } from "@/app/actions/checklist";
import { checklistMax, checklistSections, sectionLevel, type ChecklistResult, type SectionLevel } from "@/lib/audit-checklist";
import { contactFieldErrors, type ChecklistContact } from "@/lib/checklist-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Step = "contact" | "audit" | "results";
const STORAGE_KEY = "veyo-audit-progress-v1";

const levelStyle: Record<SectionLevel, string> = {
  Scaling: "bg-emerald-100 text-emerald-800",
  Steady: "bg-amber-100 text-amber-800",
  Leaky: "bg-red-100 text-red-800",
};

export function AuditChecklistGame() {
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState<ChecklistContact>({ name: "", organisation: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ChecklistContact, string>>>({});
  const [optIn, setOptIn] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [sectionIndex, setSectionIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [lastTicked, setLastTicked] = useState<string | null>(null);
  const [result, setResult] = useState<ChecklistResult | null>(null);
  const [viewError, setViewError] = useState<string | null>(null);
  const [emailState, setEmailState] = useState<EmailReportState | null>(null);
  const [viewing, startViewing] = useTransition();
  const [sending, startSending] = useTransition();

  // Restore ticked items (not personal details) so a refresh doesn't lose progress.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring saved progress on mount
      if (Array.isArray(saved?.checked)) setChecked(new Set(saved.checked));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checked: [...checked] }));
    } catch {}
  }, [checked]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const section = checklistSections[sectionIndex];
  const sectionScore = (i: number) => checklistSections[i].items.filter((it) => checked.has(it.id)).length;
  const liveScore = useMemo(() => checklistSections.reduce((a, _, i) => a + sectionScore(i), 0), [checked]); // eslint-disable-line react-hooks/exhaustive-deps
  const isLast = sectionIndex === checklistSections.length - 1;

  const payload = () => ({ ...contact, checked: [...checked], marketingOptIn: optIn, company: honeypot || undefined });

  function startAudit(e: React.FormEvent) {
    e.preventDefault();
    const errs = contactFieldErrors(contact);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep("audit");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        setLastTicked(id);
      }
      return next;
    });
  }

  function goTo(i: number) {
    const s = checklistSections[sectionIndex];
    if (i > sectionIndex) setToast(`${s.doneLine} ${sectionScore(sectionIndex)}/${s.items.length}`);
    setSectionIndex(i);
    document.getElementById("audit-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function viewResults() {
    setViewError(null);
    startViewing(async () => {
      const res = await viewChecklistResult(payload());
      if (res.ok) {
        setResult(res.result);
        setEmailState(null);
        setStep("results");
        document.getElementById("audit-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else setViewError(res.message);
    });
  }

  function sendEmail() {
    startSending(async () => setEmailState(await emailChecklistReport(payload())));
  }

  function restart() {
    setChecked(new Set());
    setSectionIndex(0);
    setResult(null);
    setEmailState(null);
    setStep("audit");
  }

  return (
    <div id="audit-top" className="scroll-mt-24">
      <Stepper step={step} />

      {step === "contact" && (
        <form onSubmit={startAudit} noValidate className="mx-auto max-w-xl space-y-4 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">First, who&apos;s getting roasted?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Takes about 10 minutes. We&apos;ll use these details to show and send your report.</p>
          </div>
          {(
            [
              ["name", "Your name", "name", "text"],
              ["organisation", "Organisation or brand", "organization", "text"],
              ["email", "Work email", "email", "email"],
            ] as const
          ).map(([key, label, autoComplete, type]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={`c-${key}`}>{label}</Label>
              <Input
                id={`c-${key}`}
                type={type}
                autoComplete={autoComplete}
                value={contact[key]}
                onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                aria-invalid={!!errors[key]}
                aria-describedby={errors[key] ? `c-${key}-error` : undefined}
                className="h-11"
              />
              {errors[key] && (
                <p id={`c-${key}-error`} className="text-sm text-destructive">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 size-4 accent-[var(--primary)]" />
            Also send me occasional Meta ads tips (optional, unsubscribe anytime).
          </label>
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="c-company">Company</label>
            <input id="c-company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>
          <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Start my audit <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <p className="text-center text-xs text-muted-foreground">
            We save your answers and score so we can send your report. See our{" "}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </form>
      )}

      {step === "audit" && (
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Scoreboard + section map */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-24">
            <div className="rounded-xl bg-primary p-5 text-primary-foreground">
              <p className="text-sm text-primary-foreground/75">Live score</p>
              <p className="font-mono text-4xl font-bold" aria-live="polite">
                {liveScore}
                <span className="text-lg text-primary-foreground/60">/{checklistMax}</span>
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${(liveScore / checklistMax) * 100}%` }} />
              </div>
            </div>
            <nav aria-label="Audit sections">
              <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {checklistSections.map((s, i) => {
                  const sc = sectionScore(i);
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={i === sectionIndex ? "step" : undefined}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors",
                          i === sectionIndex ? "border-primary bg-primary/5 text-primary" : "bg-card hover:bg-muted",
                        )}
                      >
                        <span className="truncate">
                          {i + 1}. {s.title}
                        </span>
                        <span className="shrink-0 font-mono text-muted-foreground">
                          {sc}/{s.items.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* Current section */}
          <section aria-labelledby="section-title" className="rounded-xl border bg-card p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-sm font-semibold text-primary">
                Section {sectionIndex + 1} of {checklistSections.length}
              </p>
              <LevelBadge level={sectionLevel(Math.round((sectionScore(sectionIndex) / section.items.length) * 100))} />
            </div>
            <h2 id="section-title" className="mt-2 font-heading text-2xl font-bold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-2 text-muted-foreground">{section.intro}</p>
            <p className="mt-1 text-xs text-muted-foreground">Tick it only if it&apos;s fully true today. &ldquo;Sort of&rdquo; counts as no.</p>

            <ul className="mt-6 space-y-2">
              {section.items.map((item) => {
                const on = checked.has(item.id);
                return (
                  <li key={item.id}>
                    <label
                      className={cn(
                        "relative flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                        on ? "border-primary/40 bg-brand/15" : "hover:bg-muted/60",
                      )}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggle(item.id)} className="peer sr-only" />
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                          on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background",
                        )}
                        aria-hidden="true"
                      >
                        {on && <Check className="size-3.5" />}
                      </span>
                      <span className="text-sm leading-relaxed">{item.text}</span>
                      {on && lastTicked === item.id && (
                        <span key={item.id + checked.size} className="pointer-events-none absolute right-3 top-2 animate-[veyo-pop_0.9s_ease-out_forwards] font-mono text-sm font-bold text-primary" aria-hidden="true">
                          +1
                        </span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goTo(sectionIndex - 1)}
                disabled={sectionIndex === 0}
                className="inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold hover:bg-muted disabled:opacity-40"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> Back
              </button>
              {isLast ? (
                <button
                  type="button"
                  onClick={viewResults}
                  disabled={viewing}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                >
                  <Sparkles className="size-4" aria-hidden="true" /> {viewing ? "Scoring…" : "View result"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(sectionIndex + 1)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Next section <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            {viewError && <p className="mt-3 text-sm text-destructive" role="alert">{viewError}</p>}
          </section>
        </div>
      )}

      {step === "results" && result && (
        <Results
          result={result}
          name={contact.name}
          emailState={emailState}
          sending={sending}
          onSend={sendEmail}
          onEdit={() => setStep("audit")}
          onRestart={restart}
        />
      )}

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          <span className="text-brand">✓</span> {toast}
        </div>
      )}
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: [Step, string][] = [
    ["contact", "Your details"],
    ["audit", "The audit"],
    ["results", "Your results"],
  ];
  const current = steps.findIndex(([s]) => s === step);
  return (
    <ol className="mb-8 flex items-center justify-center gap-2 text-sm" aria-label="Progress">
      {steps.map(([s, label], i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-full font-mono text-xs font-bold",
              i < current ? "bg-brand text-brand-foreground" : i === current ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
            aria-current={i === current ? "step" : undefined}
          >
            {i < current ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
          </span>
          <span className={cn("hidden sm:inline", i === current ? "font-semibold" : "text-muted-foreground")}>{label}</span>
          {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border sm:w-10" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function LevelBadge({ level }: { level: SectionLevel }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", levelStyle[level])}>{level}</span>;
}

function ScoreRing({ score, max }: { score: number; max: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 128 128" className="size-40" role="img" aria-label={`Score ${score} out of ${max}`}>
      <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
      <circle
        cx="64"
        cy="64"
        r={r}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - score / max)}
        transform="rotate(-90 64 64)"
        className="transition-[stroke-dashoffset] duration-1000"
      />
      <text x="64" y="66" textAnchor="middle" className="fill-white font-mono text-[30px] font-bold">
        {score}
      </text>
      <text x="64" y="88" textAnchor="middle" className="fill-white/60 font-mono text-[12px]">
        / {max}
      </text>
    </svg>
  );
}

function Results({
  result,
  name,
  emailState,
  sending,
  onSend,
  onEdit,
  onRestart,
}: {
  result: ChecklistResult;
  name: string;
  emailState: EmailReportState | null;
  sending: boolean;
  onSend: () => void;
  onEdit: () => void;
  onRestart: () => void;
}) {
  const first = name.trim().split(/\s+/)[0];
  const fix = result.fixFirst;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
        <ScoreRing score={result.total} max={result.max} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">{first ? `${first}'s result` : "Your result"}</p>
          <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight">{result.band.label}</h2>
          <p className="mt-2 text-lg text-primary-foreground/80">{result.band.message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {emailState?.status !== "sent" && (
              <button
                type="button"
                onClick={onSend}
                disabled={sending}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground hover:bg-brand/85 disabled:opacity-60"
              >
                <Mail className="size-4" aria-hidden="true" /> {sending ? "Sending…" : "Send to email"}
              </button>
            )}
            <button type="button" onClick={onEdit} className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/30 px-4 text-sm font-semibold hover:bg-white/10">
              <ArrowLeft className="size-4" aria-hidden="true" /> Edit answers
            </button>
          </div>
          {emailState && (
            <p role="status" className={cn("mt-3 flex items-center gap-2 text-sm", emailState.status === "sent" ? "text-brand" : "text-red-200")}>
              {emailState.status === "sent" && <CheckCircle2 className="size-4" aria-hidden="true" />}
              {emailState.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-6" aria-labelledby="by-section">
          <h3 id="by-section" className="font-heading text-lg font-bold">Score by section</h3>
          <ul className="mt-4 space-y-4">
            {result.sections.map((s) => (
              <li key={s.id}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{s.title}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-muted-foreground">
                      {s.score}/{s.max}
                    </span>
                    <LevelBadge level={s.level} />
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${s.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border-2 border-primary bg-card p-6" aria-labelledby="fix-first">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Fix this first</p>
          <h3 id="fix-first" className="mt-1 font-heading text-xl font-bold">
            {fix.title} <span className="font-mono text-base text-muted-foreground">({fix.score}/{fix.max})</span>
          </h3>
          {fix.missing.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm">
              {fix.missing.map((i) => (
                <li key={i.id} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand ring-2 ring-primary/30" aria-hidden="true" />
                  {i.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted-foreground">Nothing to fix. Show-off.</p>
          )}
        </section>
      </div>

      {result.sections.some((s) => s.id !== fix.id && s.missing.length > 0) && (
        <section className="rounded-xl border bg-card p-6" aria-labelledby="fix-list">
          <h3 id="fix-list" className="font-heading text-lg font-bold">The rest of your fix list</h3>
          <div className="mt-3 divide-y">
            {result.sections
              .filter((s) => s.id !== fix.id && s.missing.length > 0)
              .map((s) => (
                <details key={s.id} className="group py-3">
                  <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">
                    <span className="inline-flex w-full items-center justify-between">
                      {s.title}
                      <span className="text-xs text-muted-foreground">{s.missing.length} to fix ▾</span>
                    </span>
                  </summary>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                    {s.missing.map((i) => (
                      <li key={i.id}>{i.text}</li>
                    ))}
                  </ul>
                </details>
              ))}
          </div>
        </section>
      )}

      <section className="flex flex-col items-start justify-between gap-4 rounded-xl bg-muted/60 p-6 md:flex-row md:items-center">
        <div>
          <h3 className="font-heading text-lg font-bold">Rather have a specialist look?</h3>
          <p className="text-sm text-muted-foreground">We&apos;ll record a free 10-minute video roast of your ads with three fixes you can use straight away.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/services/audit" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Roast my ads (nicely) <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <button type="button" onClick={onRestart} className="inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold hover:bg-background">
            <RotateCcw className="size-4" aria-hidden="true" /> Start again
          </button>
        </div>
      </section>
      <p className="text-xs text-muted-foreground">This checklist is general guidance, not legal advice.</p>
    </div>
  );
}
