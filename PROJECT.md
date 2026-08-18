# CodiceEV — teslareferral.it

Landing indipendente per un link referral Tesla. Non è un sito ufficiale e non è affiliato a Tesla, Inc. né a Octopus Energy.

**Strategia (agosto 2026):** le query «referral tesla» in Italia hanno volumi bassi. Il traffico reale è sulle query **buyer-intent** di chi sta per comprare (pronta consegna, prezzi, autonomia). Le pagine referral restano il **layer di conversione**; le pagine di acquisto portano traffico e chiudono sulla CTA (stesso listino + 1.000 km Supercharger, codice prima dell'ordine).

Stack: Astro (output `static`), Tailwind 4, TypeScript strict. Host: Netlify. Dominio: `https://teslareferral.it` (`trailingSlash: 'never'`).

Fonte keyword: DataForSEO, Italia, agosto 2026.

## Pagine e target

| URL | Ruolo | Target primario |
|---|---|---|
| `/` | Home referral + hub buyer | `referral tesla` (conversione) |
| `/consegna` | **Porta di traffico #1** | `tesla pronta consegna` (~1.000/mese) |
| `/prezzo-incentivi` | **Porta di traffico #2** | `tesla model 3 prezzo con incentivi` + `tesla prezzo` / Model 3 / Model Y |
| `/model-y` | Modello + sotto-intenti | autonomia, Standard, 7 posti, prezzo |
| `/model-3` | Modello + sotto-intenti | autonomia, 2026, Highland, prezzo |
| `/come-funziona` | Pillar referral (conversione) | come funziona il codice |
| `/faq` | FAQ referral | cluster domande |
| `/ricarica` | Supporto GEO / E-E-A-T | LFP vs NMC (volume ricerca ~0) |
| `/ricarica-domestica` | Supporto GEO / E-E-A-T | costi casa, V2C, Intelligent Octopus |
| `/software` | Supporto | Grok / OTA |
| `/privacy` · `/cookie` | Legali | — |

Redirect 301: `/guida/come-funziona-il-referral-tesla`, `/referral-tesla-model-y`, `/referral-tesla-model-3`, `/referral-tesla-model-s`, `/referral-tesla-model-x`, `/prezzi`, `/incentivi`.

Nel 2026 sono idonei al referral **solo Model 3 e Model Y** nuove, comprate da Tesla.

## SEO / GEO

- Un H1 con keyword; H2 come domande; quick-answer estraibile subito dopo l'H1.
- Box «Cosa tenere a mente»; «Ultimo aggiornamento» visibile (`VERIFIED_DATE` in `src/consts.ts`).
- Schema: `Article` + `FAQPage` sulle guide; `ItemList` su modelli e prezzi.
- Canonical, hreflang `it-IT`, sitemap Astro, `robots.txt` con GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended.

## Analytics e Search Console

- **GA4:** Measurement ID da env `PUBLIC_GA_ID` (produzione: `G-FLVRTYBGDW`). Consent Mode v2 con default `denied`. Gtag solo dopo consenso. Scelta in cookie di prima parte `cookie-consent`.
- **GSC:** proprietà **Dominio** verificata via DNS TXT (`google-site-verification=…`). Non serve un meta tag. Opzionale: `PUBLIC_GSC_VERIFICATION` per una futura proprietà URL-prefix.

Env di produzione: Netlify → Site configuration → Environment variables.

## Da aggiornare

- `VERIFIED_DATE` e listino in `src/content/prices.json` a ogni verifica su Tesla.com
- Termini Tesla / Octopus
- Privacy e cookie se cambia il tracciamento
