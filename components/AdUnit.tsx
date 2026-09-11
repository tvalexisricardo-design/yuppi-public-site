import Script from "next/script";
import { ADSENSE_CLIENT, ADSENSE_SLOT } from "@/lib/featureFlags";

export function AdUnit({ className = "", id = "default" }: { className?: string; id?: string }) {
  // Keep ad placements completely invisible until a real AdSense publisher ID is configured.
  // This keeps the public site clean during review/development and activates the same slots later.
  if (!ADSENSE_CLIENT) return null;

  return (
    <div className={`overflow-hidden ${className}`} aria-label="Publicidade">
      <Script
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id={`adsense-init-${id}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
