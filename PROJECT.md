# CodiceEV — teslareferral.it

Landing indipendente per un link referral Tesla. Non è un sito ufficiale e non è affiliato a Tesla, Inc. né a Octopus Energy.

**Strategia (settembre 2026):** le query «referral tesla» in Italia hanno volumi bassi. Il traffico reale (GSC 18 ago–15 set 2026) è sulle query **buyer-intent**: `/consegna` = 72% delle impression. Le pagine referral restano il **layer di conversione**; le pagine di acquisto portano traffico e chiudono sulla CTA (stesso listino + 1.000 km Supercharger, codice prima dell'ordine). **Nessuna feature di inventario/stock live.**

Stack: Astro (output `static`), Tailwind 4, TypeScript strict. Host: Netlify. Dominio: `https://teslareferral.it` (`trailingSlash: 'never'`).

Fonte keyword: DataForSEO Italia agosto 2026 + GSC agosto–settembre 2026.

## Pagine e target

| URL | Ruolo | Target primario |
|---|---|---|
| `/` | Home referral + hub buyer | conversione referral |
| `/consegna` | **Porta di traffico #1** | `tesla pronta consegna` (+ Milano/Italia/modelli) |
| `/tempi-di-consegna` | Attesa ordine configurato | `tempi consegna tesla model 3` (pos 1 GSC) |
| `/prezzo-incentivi` | **Porta di traffico #2** | `prezzi tesla 2026`, incentivi Model 3 |
| `/model-y` | Pillar SUV | `tesla model y` (60.500/mese) |
| `/model-y-standard` | Sotto-intento in crescita | `tesla model y standard` |
| `/model-3` | Pillar berlina | autonomia, Highland, prezzo |
| `/model-3-2026` | Novità / AI Overview | `tesla model 3 2026` |
| `/store-tesla-italia` | Locale (niente concessionari) | `concessionari tesla italia` |
| `/tesla-usata-o-nuova` | Usato → nuovo | `tesla model 3/y usata` |
| `/come-funziona` | Pillar referral | come funziona il codice |
| `/faq` | FAQ referral | cluster domande |
| `/software` | Grok / FSD | `grok tesla italia`, `fsd italia` |
| `/ricarica` · `/ricarica-domestica` | Supporto E-E-A-T | non traffico |
| `/privacy` · `/cookie` | Legali | — |

Redirect 301: `/guida/come-funziona-il-referral-tesla`, `/referral-tesla-model-y`, `/referral-tesla-model-3`, `/referral-tesla-model-s`, `/referral-tesla-model-x`, `/prezzi`, `/incentivi`.

Nel 2026 sono idonei al referral **solo Model 3 e Model Y** nuove, comprate da Tesla. **Non vale sull'usato.**

## Content collections

Aggiornare il testo senza toccare i layout:

- `src/content/cities/` — sezioni città di `/consegna`
- `src/content/stores/` — Store/Delivery Center
- `src/content/software-notes/` — FSD e Grok
- `src/content/wait-times.json` — attese configurate vs pronta consegna
- `src/content/prices.json` — listino (verificare su Tesla.com)
- `src/content/models.json` — pillar Model 3 / Model Y

## SEO / GEO

- Un H1 con keyword; H2 come domande o query esatte; quick-answer estraibile subito dopo l'H1.
- Box «Punti chiave»; «Ultimo aggiornamento: {MESE ANNO}» (`VERIFIED_DATE` in `src/consts.ts`).
- Schema: `Article` + `FAQPage`; `ItemList` su tabelle. **Niente `LocalBusiness`** su `/store-tesla-italia`.
- Canonical, hreflang `it-IT`, sitemap Astro, `robots.txt` con GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended.

## Analytics e Search Console

- **GA4:** `PUBLIC_GA_ID` (produzione: `G-FLVRTYBGDW`). Consent Mode v2 **advanced**: `gtag.js` sempre caricato; default storage `denied`; `url_passthrough` e `ads_data_redaction`; al consenso `analytics_storage: granted`. Scelta in cookie di prima parte `cookie-consent` (non `localStorage`).
- Eventi: `referral_click` (`data-referral-cta`, `cta_position`, `page_path`, `model`) e `whatsapp_click` su `wa.me`, entrambi con `transport_type: 'beacon'` anche senza consenso (DebugView). Helper: `src/lib/analytics.ts` → `track()`.
- Facoltativi cookieless: `PUBLIC_UMAMI_ID`, `PUBLIC_PLAUSIBLE_DOMAIN` (non si caricano se vuoti).
- **GSC:** proprietà **Dominio** verificata via DNS TXT. Opzionale: `PUBLIC_GSC_VERIFICATION`.

Env di produzione: Netlify → Site configuration → Environment variables.

## Da aggiornare

- `VERIFIED_DATE` e listino in `src/content/prices.json` a ogni verifica su Tesla.com
- Tempi in `wait-times.json` e indirizzi in `stores/` / `cities/` se Tesla sposta hub o finestre
- Termini Tesla / Octopus
- Privacy e cookie se cambia il tracciamento
