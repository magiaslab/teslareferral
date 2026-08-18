# Prompt — Modifiche keyword-driven + GA4/GSC (repo `magiaslab/teslareferral`)

Prompt di **modifica** per il repo Astro esistente (Astro 5+, Tailwind 4, TS strict, output static, su `teslareferral.it`).

## Valori reali da usare

- **GA4 Measurement ID:** `G-FLVRTYBGDW` (letto da env `PUBLIC_GA_ID`)
- **GSC (Domain property):** verifica via DNS TXT `google-site-verification=tbZQ8UxjhqLQHfzvvQaUpSmri5_prlyvHSZGiSIKCso` (NON è un meta tag; è già impostata la proprietà Dominio)
- Fonte dati keyword: DataForSEO, Italia, agosto 2026 (volumi mensili).

---

## Contesto strategico

I dati reali mostrano che le keyword "referral tesla" hanno volumi minuscoli in Italia (`referral tesla` ~480/mese, `codice referral tesla` ~90, la maggior parte 10–30, molte a zero). Il traffico vero è nelle query **di chi sta per comprare una Tesla** — lo stesso pubblico che poi usa il referral. Inoltre **l'AI Overview è già attivo** su gran parte di queste query: serve struttura GEO estraibile. Quindi: manteniamo le pagine referral come **layer di conversione**, ma costruiamo/ottimizziamo pagine **buyer-intent** che portano traffico e rimandano alla CTA referral.

## 1) Pagina `/consegna` — target primario

Ottimizza per **`tesla pronta consegna`** (≈1.000/mese, transazionale, +171% su base annua) e cluster consegna.

- Title: `Tesla in pronta consegna in Italia (2026): tempi e come averla subito`
- H1 con "Tesla pronta consegna"; **quick-answer** estraibile nei primi 200 caratteri.
- Keyword secondarie in H2/H3 e testo: `tesla model 3 pronta consegna`, `tesla model y pronta consegna`, `tempi di consegna tesla italia`, `consegne tesla fine trimestre`; varianti città: `tesla pronta consegna milano / bologna / padova`.
- Sezione "Perché a fine trimestre trovi più auto in pronta consegna" + CTA referral.
- Schema: `Article` + `FAQPage`.

## 2) NUOVA pagina `/prezzo-incentivi`

Target: **`tesla model 3 prezzo con incentivi`** + `tesla model y prezzo`, `tesla model 3 prezzo`, `tesla prezzo`.

- Title: `Prezzi Tesla 2026 con incentivi (Model 3 e Model Y) + 1.000 km referral`
- Tabella prezzi listino per modello/versione (segnaposto, nota "verificato a {VERIFIED_DATE}") + Ecobonus/incentivi indipendenti e cumulabili col referral.
- Quick-answer + box "Come sommare incentivi e referral".
- Schema `Article` + `FAQPage` + `ItemList`. Nav e link interni da home, `/model-3`, `/model-y`.

## 3) `/model-y` — sotto-intenti

Sezioni H2 domanda per: `tesla model y autonomia`, `tesla model y standard`, `tesla model y 7 posti`, `tesla model y prezzo`. CTA referral + schema `Article`+`FAQPage`+`ItemList`.

## 4) `/model-3` — sotto-intenti

Sezioni per: `tesla model 3 autonomia`, `tesla model 3 2026`, `tesla model 3 highland`, `tesla model 3 prezzo`.

## 5) `/ricarica` e `/ricarica-domestica`

Non ottimizzare per traffico di ricerca. Mantenere il contenuto (E‑E‑A‑T). Aggancio verso autonomia Model 3 / Model Y.

## 6) Home `/`

Impianto referral invariato. Nav/hub verso `/consegna` e `/prezzo-incentivi`. Blocco "Stai per comprare? Parti da qui".

## 7) Referral pages

`/come-funziona`, `/faq` restano. Ogni pagina buyer-intent chiude con CTA referral + link a `/come-funziona`.

## 8) SEO/GEO tecnico

- Un solo H1 con keyword; H2/H3 come domande; quick-answer 40–60 parole nei primi 200 caratteri.
- Box punti chiave; `dateModified` visibile; canonical; sitemap; robots AI crawler.

## 9) GA4 — consenso GDPR

- ID da `import.meta.env.PUBLIC_GA_ID`. Non hardcodare.
- Consent Mode v2: default `denied` per `analytics_storage`/`ad_storage`.
- Banner cookie minimale; scelta in cookie di prima parte (NON localStorage/sessionStorage).
- Nessun tracciamento prima del consenso.

## 10) GSC

Proprietà Dominio (DNS TXT). Meta `google-site-verification` solo se esiste `PUBLIC_GSC_VERIFICATION`.

## 11) Env

`.env.example`: `PUBLIC_GA_ID=` e opzionale `PUBLIC_GSC_VERIFICATION=`. Produzione su Netlify.
