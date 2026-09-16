/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
  readonly PUBLIC_UMAMI_ID?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
