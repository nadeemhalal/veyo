"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Opens the browser print dialog, where people can choose "Save as PDF".
export function PrintButton({ className, children = "Save as PDF" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-muted print:hidden",
        className,
      )}
    >
      <Download className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}
