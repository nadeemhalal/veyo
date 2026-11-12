import { Archivo, Caveat_Brush } from "next/font/google";
import { ArrowRight, MessageCircle } from "lucide-react";
import { q4Sprint } from "@/lib/site";
import { cn } from "@/lib/utils";

// Fonts for this campaign banner only (the founder's design), not the site's brand fonts.
const display = Archivo({ subsets: ["latin"], weight: ["800", "900"], style: ["normal", "italic"], variable: "--font-bf-display" });
const script = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-bf-script" });

const blue = "#4578ff";
const pink = "#f540ab";
const gradient = `linear-gradient(90deg, ${blue}, #9d5cf5 55%, ${pink})`;

const badges = [
  { mark: "3", lines: ["Free", "creatives"], from: "#5562f6", to: "#7a5cf3" },
  { mark: "3", lines: ["Week", "sprint"], from: "#8c55f2", to: "#b04ff0" },
  { mark: "24h", lines: ["Ads", "go live"], from: "#e047c8", to: pink },
];

/**
 * Black Friday campaign banner for /sri-lanka, coded from the founder's design so the text stays real
 * (sharp on phones, readable by Google and screen readers). Wide on desktop, stacked on mobile.
 * The phone picture is cut from that design: public/images/q4/black-friday-phone.webp.
 */
export function BlackFridayBanner() {
  return (
    <section
      id="hero"
      aria-label={`${q4Sprint.bannerHeadline}. ${q4Sprint.price} fixed fee.`}
      className={cn(display.variable, script.variable, "relative overflow-hidden text-white")}
      style={{
        backgroundColor: "#07060d",
        backgroundImage: [
          "radial-gradient(55% 75% at 0% 100%, rgba(32,52,150,0.85), transparent 70%)",
          "radial-gradient(40% 65% at 100% 0%, rgba(150,40,110,0.85), transparent 70%)",
          "radial-gradient(35% 60% at 80% 50%, rgba(84,33,119,0.55), transparent 75%)",
        ].join(","),
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-x-6 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:grid-rows-[auto_auto] lg:py-14">
        {/* Top: chips, headline */}
        <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide sm:px-5 sm:py-2 sm:text-base"
              style={{ backgroundImage: gradient, fontFamily: "var(--font-bf-display)" }}
            >
              {q4Sprint.bannerLabel}
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#e22a63] shadow-[0_0_24px_rgba(245,64,171,0.45)] sm:px-5 sm:py-2 sm:text-base"
              style={{ fontFamily: "var(--font-bf-display)" }}
            >
              <span className="relative inline-flex size-3.5 items-center justify-center rounded-full bg-[#ffd1e2]">
                <span className="size-2 rounded-full bg-[#ef2f6b]" />
              </span>
              {q4Sprint.bannerEnds}
            </span>
          </div>

          <h1 className="mt-5">
            <span
              className="block whitespace-nowrap text-[clamp(1.55rem,8.3vw,2.4rem)] font-black uppercase italic leading-[0.95] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[3.3rem] xl:text-[3.9rem]"
              style={{ fontFamily: "var(--font-bf-display)", textShadow: "0 0 28px rgba(255,255,255,0.28)" }}
            >
              Get your
              <br />
              Black Friday ads
            </span>
            <span
              className="relative mt-1 inline-block pr-5 text-[3rem] sm:pr-7 leading-none sm:text-[4.2rem] lg:text-[4.1rem] xl:text-[4.8rem]"
              style={{ fontFamily: "var(--font-bf-script)", transform: "skewX(-10deg)" }}
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #6b8cff, #9f6cf6 55%, #c25cf0)" }}>
                live in 24 hours
              </span>
              <span className="absolute -top-1 right-0 text-3xl sm:text-5xl" style={{ color: pink }} aria-hidden="true">
                *
              </span>
            </span>
          </h1>
        </div>

        {/* Phone visual */}
        <div
          className="relative mx-auto mt-4 w-full max-w-sm lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-none"
          style={{ backgroundImage: "radial-gradient(closest-side, rgba(84,33,119,0.6), transparent)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- next/image is untested under vinext; the file is already a 46 KB webp */}
          <img
            src="/images/q4/black-friday-phone.webp"
            fetchPriority="high"
            width={750}
            height={667}
            alt={`A phone showing a store's Facebook ad and new cash-on-delivery orders from Colombo and Kandy. Only ${q4Sprint.price}, fixed fee.`}
            className="h-auto w-full"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 14%, black 93%, transparent), linear-gradient(to bottom, transparent, black 6%, black 90%, transparent)",
              maskComposite: "intersect",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 14%, black 93%, transparent), linear-gradient(to bottom, transparent, black 6%, black 90%, transparent)",
              WebkitMaskComposite: "source-in",
            }}
          />
          {/* Tag on the phone, matching the "More WhatsApp orders" ads */}
          <p
            className="absolute bottom-[9%] left-1/2 inline-flex -translate-x-1/2 -rotate-3 items-center gap-2 whitespace-nowrap rounded-full bg-[#25d366] py-1.5 pl-1.5 pr-4 text-sm font-extrabold uppercase tracking-wide text-[#07060d] shadow-[0_0_28px_rgba(37,211,102,0.55)] sm:gap-2.5 sm:py-2 sm:pl-2 sm:pr-5 sm:text-lg"
            style={{ fontFamily: "var(--font-bf-display)" }}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-[#07060d] text-[#25d366] sm:size-8">
              <MessageCircle className="size-4" aria-hidden="true" />
            </span>
            {q4Sprint.bannerOrders} <span aria-hidden="true">🚀</span>
          </p>
        </div>

        {/* Bottom: badges, button, conditions */}
        <div className="mt-6 lg:col-start-1 lg:row-start-2 lg:mt-8">
          <ul
            className="mx-auto flex w-fit items-stretch divide-x divide-white/15 rounded-2xl border border-white/15 bg-[#14162e]/80 py-3 lg:mx-0"
            style={{ fontFamily: "var(--font-bf-display)" }}
          >
            {badges.map((b) => (
              <li key={b.lines.join(" ")} className="flex items-center gap-1.5 px-2 sm:gap-3 sm:px-5">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold sm:size-14 sm:text-2xl"
                  style={{ backgroundImage: `linear-gradient(135deg, ${b.from}, ${b.to})` }}
                >
                  {b.mark}
                </span>
                <span className="whitespace-nowrap text-left text-[0.66rem] font-extrabold uppercase leading-tight sm:text-lg">
                  {b.lines[0]}
                  <br />
                  {b.lines[1]}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
            <a
              href="#review"
              className="inline-flex h-14 items-center gap-4 rounded-full pl-2 pr-7 text-base font-extrabold uppercase shadow-[0_0_32px_rgba(245,64,171,0.45)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:h-[4.5rem] sm:text-2xl"
              style={{ backgroundImage: `linear-gradient(90deg, #5d6cf2, #b056ee 60%, ${pink})`, fontFamily: "var(--font-bf-display)" }}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-[#6a5cf0] sm:size-14">
                <ArrowRight className="size-5 sm:size-6" aria-hidden="true" />
              </span>
              {q4Sprint.bannerCta}
            </a>
            <a href="#terms" className="text-sm font-semibold text-white/80 underline-offset-4 hover:underline sm:text-base">
              *Conditions apply
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
