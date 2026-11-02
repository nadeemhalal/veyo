"use client";

import { useEffect } from "react";
import { trackContact, type ContactMethod } from "@/lib/track";

function methodFor(href: string): ContactMethod | null {
  if (href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/")) return "whatsapp";
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  return null;
}

// Reports clicks on any WhatsApp, email or phone link as a contact, site-wide, so new links are covered
// without extra code. Renders nothing.
export function ContactTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const method = link ? methodFor(link.getAttribute("href") ?? "") : null;
      if (method) trackContact(method);
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
