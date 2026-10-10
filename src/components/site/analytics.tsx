// Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_MEASUREMENT_ID is set (a build-time variable),
// and never in development, so local traffic doesn't pollute the reports.
//
// Plain <script> tags on purpose: next/script injected nothing under vinext on Cloudflare Workers.
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  if (!measurementId || process.env.NODE_ENV !== "production") return null;
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script dangerouslySetInnerHTML={{ __html: init }} />
    </>
  );
}
