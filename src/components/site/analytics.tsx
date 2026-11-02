import { site } from "@/lib/site";

// Site analytics: Hotjar and Google Tag Manager always; Google Analytics 4, the Google Ads tag and the Meta pixel
// once NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_GOOGLE_ADS_ID / NEXT_PUBLIC_META_PIXEL_ID are set (build-time).
// None of them load in development, so local traffic stays out of the reports.
//
// Plain <script> tags on purpose: next/script injected nothing under vinext on Cloudflare Workers.
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Ads tag (AW-...). Shares gtag.js with GA4. Leads are reported as a conversion from trackLead().
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || site.googleAdsId;

// Meta pixel. Leads are also sent server-side (src/lib/meta-capi.ts) with the same event id, so don't add
// a Meta pixel tag in GTM as well.
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || site.metaPixelId;

// Google Tag Manager container. GA4 is loaded directly below, so don't also add a GA4 tag inside GTM
// or every page view is counted twice.
const gtmId = "GTM-PPW69ZKV";

// Hotjar (Contentsquare) heatmaps and session recordings. The tag isn't secret, so it lives here.
const contentsquareTag = "https://t.contentsquare.net/uxa/ccc990384f471.js";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      {/* eslint-disable-next-line @next/next/next-script-for-ga -- the suggested component uses next/script, which injects nothing under vinext */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      <script defer src={contentsquareTag} />
      <GoogleAnalytics />
      <MetaPixel />
    </>
  );
}

function MetaPixel() {
  if (!pixelId) return null;
  const init = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`;
  return <script dangerouslySetInnerHTML={{ __html: init }} />;
}

// GA4 and the Google Ads tag share one gtag.js. Either can be set without the other.
function GoogleAnalytics() {
  const loaderId = measurementId || googleAdsId;
  if (!loaderId) return null;
  const configs = [
    measurementId && `gtag('config','${measurementId}',{anonymize_ip:true});`,
    // allow_enhanced_conversions: the lead's email is passed (gtag hashes it) so Google can match the conversion.
    googleAdsId && `gtag('config','${googleAdsId}',{allow_enhanced_conversions:true});`,
  ]
    .filter(Boolean)
    .join("");
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${configs}`;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`} />
      <script dangerouslySetInnerHTML={{ __html: init }} />
    </>
  );
}

// GTM's fallback for visitors without JavaScript. Goes straight after <body>.
export function TagManagerNoScript() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
