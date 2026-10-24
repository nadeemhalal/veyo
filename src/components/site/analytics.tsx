// Site analytics: Hotjar always, Google Analytics 4 once NEXT_PUBLIC_GA_MEASUREMENT_ID is set (a build-time
// variable). Neither loads in development, so local traffic doesn't pollute the reports.
//
// Plain <script> tags on purpose: next/script injected nothing under vinext on Cloudflare Workers.
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Hotjar (Contentsquare) heatmaps and session recordings. The tag isn't secret, so it lives here.
const contentsquareTag = "https://t.contentsquare.net/uxa/ccc990384f471.js";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <script defer src={contentsquareTag} />
      <GoogleAnalytics />
    </>
  );
}

function GoogleAnalytics() {
  if (!measurementId) return null;
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script dangerouslySetInnerHTML={{ __html: init }} />
    </>
  );
}
