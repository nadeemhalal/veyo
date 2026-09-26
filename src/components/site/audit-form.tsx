"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitAudit } from "@/app/actions/audit";
import { spendOptions, type AuditFormState } from "@/lib/audit-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const initialState: AuditFormState = { status: "idle", message: "" };

export function AuditForm({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [state, formAction, pending] = useActionState(submitAudit, initialState);
  const err = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className={cn("rounded-xl border bg-card p-8 text-center", className)} role="status">
        <CheckCircle2 className="mx-auto mb-3 size-10 text-primary" aria-hidden="true" />
        <p className="text-lg font-semibold">{state.message}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll email you to set up Business Manager partner access. We never ask for passwords.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className={cn("space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8", className)}>
      <Field id="name" label="Your name" error={err.name}>
        <Input id="name" name="name" autoComplete="name" required aria-invalid={!!err.name} className="h-11" />
      </Field>
      <Field id="email" label="Work email" error={err.email}>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err.email} className="h-11" />
      </Field>
      <Field id="storeUrl" label="Store URL" error={err.storeUrl}>
        <Input id="storeUrl" name="storeUrl" inputMode="url" placeholder="yourbrand.com.au" required aria-invalid={!!err.storeUrl} className="h-11" />
      </Field>
      <Field id="spend" label="Monthly Meta ad spend" error={err.spend}>
        <select
          id="spend"
          name="spend"
          required
          defaultValue=""
          aria-invalid={!!err.spend}
          className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        >
          <option value="" disabled>
            Choose one
          </option>
          {spendOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>
      {!compact && (
        <Field id="message" label="Anything we should know? (optional)" error={err.message}>
          <Textarea id="message" name="message" rows={3} />
        </Field>
      )}

      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p className="text-sm font-medium text-destructive" aria-live="polite">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Get my free audit"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Free, no obligation. By submitting you agree to our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
