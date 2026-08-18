# CodiceEV — teslareferral.it

Landing indipendente per un link referral Tesla. Non è un sito ufficiale e non è affiliato a Tesla, Inc.

Stack: **Astro 5+**, **Tailwind CSS 4**, **TypeScript** strict. Output statico per Netlify o Vercel.

Sito: `https://teslareferral.it` (`trailingSlash: 'never'`).

## Avvio

```bash
npm install
npm run dev
npm run check
npm run build
```

In sviluppo: `astro dev --background`, poi `astro dev status` / `astro dev logs` / `astro dev stop`.

## Pagine

| URL | Ruolo |
|---|---|
| `/` | Home transazionale |
| `/come-funziona` | Pillar: come funziona il referral |
| `/model-y` · `/model-3` | Pagine modello |
| `/ricarica` | LFP vs NMC |
| `/ricarica-domestica` | Consumi casa, V2C, Intelligent Octopus |
| `/consegna` | Tesla pronta consegna e fine trimestre |
| `/prezzo-incentivi` | Listino Model 3 / Model Y, incentivi e referral |
| `/software` | Grok e OTA 2026 |
| `/faq` | FAQ |
| `/privacy` · `/cookie` | Legali |

Redirect 301 dalle URL vecchie: `/guida/come-funziona-il-referral-tesla`, `/referral-tesla-model-y`, `/referral-tesla-model-3`, `/referral-tesla-model-s`, `/referral-tesla-model-x`, `/prezzi`, `/incentivi`.

Nel 2026 sono idonei **solo Model 3 e Model Y**.

## Foto

WebP + JPEG, `width`/`height` fissi, lazy load (hero eager).

| File | Uso | Fonte |
|---|---|---|
| `public/img/home-trust` | Home, ritratto | Foto di Alessandro Cipriani con la sua Model Y |
| `public/img/model-y` | `/model-y` | Stessa foto, ritaglio 4:3 |
| `public/img/home-hero` | Home, Supercharger | [Unsplash](https://unsplash.com/photos/W8IvFdsKsl8) |
| `public/img/model-3` | `/model-3` | [Unsplash](https://unsplash.com/photos/aFOElqcfkks) |
| `public/img/ricarica` | `/ricarica` | [Unsplash](https://unsplash.com/photos/JkTjKEVcckg) |
| `public/img/og.jpg` | Open Graph | Locale |

Le foto Unsplash sono usate sotto [Unsplash License](https://unsplash.com/license).

## Variabili d'ambiente (produzione)

In produzione le env stanno su **Netlify** (Site configuration → Environment variables), non in un file `.env` committato.

| Key | Note |
|---|---|
| `PUBLIC_GA_ID` | Measurement ID GA4 (es. `G-XXXXXXXXXX`). Gtag parte solo dopo il consenso. |
| `PUBLIC_GSC_VERIFICATION` | Opzionale. Solo se in futuro vuoi una proprietà Search Console URL-prefix. |

La proprietà Search Console **Dominio** si verifica con un record DNS TXT sul dominio, non con una variabile Netlify.

Vedi `.env.example` per lo sviluppo locale.

## SEO

Mappa keyword e kit DataForSEO: `keyword-map-e-dataforseo-kit.md`. Script: `scripts/dataforseo_keywords.py` (credenziali solo in `.env`, vedi `.env.example`).

## Da aggiornare nel tempo

- `VERIFIED_DATE` in `src/consts.ts` a ogni verifica dei termini Tesla
- `src/content/software.json` a ogni OTA
- Privacy/cookie: e-mail, sede/P.IVA Magias Lab, eventuale analytics
- Listino in `src/content/prices.json` a ogni verifica su Tesla.com
- Schema Person: aggiungere LinkedIn / sito Magias Lab in `sameAs`
