"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bfcm } from "@/lib/site";

// Site-wide BFCM bar. Hides itself after the campaign ends, even without a redeploy.
export function AnnouncementBar() {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date check must run on the client
    setExpired(Date.now() >= new Date(bfcm.endsAt).getTime());
  }, []);

  if (expired) return null;

  return (
    <div className="bg-primary text-primary-foreground print:hidden">
      <Link
        href="/bfcm"
        className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-sm font-medium hover:underline sm:px-6"
      >
        <span>
          Black Friday is {bfcm.blackFriday}. <span className="text-brand">Get the free BFCM Meta ads playbook</span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden="true" />
      </Link>
    </div>
  );
}
