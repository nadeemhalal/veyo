"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { Logo } from "./logo";
import { CtaLink } from "./cta-link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                  {"children" in item && <ChevronDown className="size-3.5" aria-hidden="true" />}
                </Link>
                {"children" in item && (
                  <ul className="invisible absolute left-0 top-full min-w-56 rounded-lg border bg-popover p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink href="/services/audit" className="hidden h-10 sm:inline-flex">
            Get a free ad audit
          </CtaLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md hover:bg-muted lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t lg:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="block rounded-md px-3 py-2 font-medium hover:bg-muted" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="ml-3 border-l pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted" onClick={() => setOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-2">
              <CtaLink href="/services/audit" className="w-full">
                Get a free ad audit
              </CtaLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
