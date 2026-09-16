# Prompt Cursor 03 — Contenuti keyword-driven + misurazione conversioni (repo `magiaslab/teslareferral`)

> Basato su dati reali: query GSC (18 ago–15 set 2026) e volumi DataForSEO (Italia, ago 2026). Verifica il codice esistente prima di modificare; `astro check` e `astro build` devono restare verdi; aggiorna `PROJECT.md`. **Nessun contenuto/feature sull'inventario Tesla.**

## Dati di partenza

- **GSC**: `/consegna` = 72% delle impression (553/773), 11/20 click, pos 8,5, CTR 2%. `/prezzo-incentivi` = 63 impression, pos 9,9, 0 click. Query "referral" in posizione 66–75 (non è lì che si vince).
- **Query GSC in ingresso** (impression, posizione): `tesla pronta consegna milano` (20, 7,8) · `tesla pronta consegna` (14, 14,7) · `tesla pronta consegna italia` (6, 9,0) · `tesla model y pronta consegna` (4, 19,2) · `tesla model 3 pronta consegna` (4, 27) · `tempi consegna tesla model 3` (**pos 1**) · `tempi di consegna tesla model y 2026` (9) · `tesla 2026 prezzo` (5, 7,2) · `prezzi tesla 2026` (4, 6,5) · `prezzo tesla 2026` (3, 6,7) · `costo tesla 2026` (9) · `tesla model 3 prezzo con incentivi 2026` (**pos 4**) · `incentivi tesla model 3 2026` (11) · `tesla model y prezzo 2026` (23) · `grok tesla italia` (16) · `fsd italia` (15) · `tesla model 3 grok update` (7).
- **Volumi DataForSEO (mese, Italia)**: `tesla model y` 60.500 (KD 15) · `tesla prezzo` 14.800 (KD 4) · `tesla model 3 prezzo` 12.100 · `tesla model y prezzo` 8.100 (AI Overview) · `tesla model 3 usata` 4.400 · `tesla model y usata` 2.400 · `tesla model y standard` 1.600 (AI Overview, in fortissima crescita) · `tesla model 3 autonomia` 1.600 (AI Overview) · `tesla pronta consegna` 1.000 (+171% anno) · `tesla model 3 2026` 880 (KD 7, AI Overview, +376%) · `tesla model 3 highland` 880 · `tesla model y autonomia` 480 · `tesla model 3 prezzo con incentivi` 390 (KD 2, AI Overview) · `tesla model y 7 posti` 320 · `concessionari tesla italia` 320 (local pack) · `tesla model 3 pronta consegna` 260 · `tesla model y premium` 260.

## Mappa keyword → pagina

| Cluster | Keyword principali | Pagina | Azione |
|---|---|---|---|
| Pronta consegna | tesla pronta consegna (+ milano/italia/model y/model 3) | `/consegna` | riscrivere + città |
| Tempi di consegna | tempi consegna tesla model 3, tempi di consegna tesla model y 2026 | `/tempi-di-consegna` | **nuova** |
| Prezzo/incentivi | prezzi tesla 2026, tesla prezzo, model 3 prezzo con incentivi, costo tesla 2026 | `/prezzo-incentivi` | fix CTR + ampliare |
| Model Y | tesla model y, autonomia, premium, 7 posti, prezzo, usata | `/model-y` | pillar |
| Model Y Standard | tesla model y standard (+ prezzo) | `/model-y-standard` | **nuova** |
| Model 3 | tesla model 3, autonomia, highland, prezzo, usata | `/model-3` | pillar |
| Model 3 2026 | tesla model 3 2026, highland, novità | `/model-3-2026` | **nuova** |
| Store/locale | concessionari tesla italia, tesla store milano/roma… | `/store-tesla-italia` | **nuova** |
| Usato vs nuovo | tesla model 3 usata, tesla model y usata | `/tesla-usata-o-nuova` | **nuova** (angolo conversione) |
| Software | grok tesla italia, fsd italia, grok update | `/software` | sezioni + freshness |
| Referral | (layer di conversione) | home, `/come-funziona`, `/faq` | solo link in ingresso |

## Specifica di implementazione

Agisci come senior SEO/GEO content engineer + Astro developer. Applica le modifiche sotto a `teslareferral.it` (Astro 5, Tailwind 4, TS strict, static). **Non creare nulla relativo a inventario/stock live.** Ogni pagina toccata o creata deve avere: un solo H1 con la keyword; H2/H3 formulati come domande o come le frasi esatte delle query; **quick-answer** di 40–60 parole nei primi 200 caratteri; box "Punti chiave"; "Ultimo aggiornamento: {MESE ANNO}" visibile; schema `Article` + `FAQPage` (+ `ItemList` dove c'è tabella) con `dateModified` coerente; **CTA referral dominante** ("Stesso prezzo di listino. In più 1.000 km Supercharger: applica il codice prima di ordinare") almeno 2 volte; link a `/come-funziona`. **Mai inventare prezzi, autonomie o date**: usa segnaposto `{€}`, `{km}`, `{data}` dove il dato non è nel repo. Contenuti in **content collections** (MDX/Markdown) così si aggiornano senza toccare i layout.

### 1) `/consegna` — pronta consegna (massima priorità)

- **Title**: `Tesla pronta consegna Italia ({MESE} 2026): come averla subito, città e modelli`
- **Meta**: `Tesla in pronta consegna in Italia: come funziona, dove si ritira (Milano, Roma, Bologna, Padova, Torino), differenze tra Model 3 e Model Y disponibili e perché a fine trimestre ce ne sono di più. Stesso prezzo + 1.000 km Supercharger con il referral.`
- **H1**: `Tesla pronta consegna in Italia: come averla subito`
- Quick-answer sulle frasi `tesla pronta consegna` / `tesla in pronta consegna`.
- H2 in ordine: `Cosa significa "Tesla pronta consegna"?` · `Tesla pronta consegna a Milano` (sezione ampia) + H3 `Roma`, `Bologna`, `Padova`, `Torino` (collection `cities`) · `Model Y in pronta consegna` · `Model 3 in pronta consegna` · `Perché a fine trimestre ci sono più Tesla in pronta consegna` · `Pronta consegna o configurata su misura: cosa conviene?` (rimanda a `/tempi-di-consegna`).
- FAQ: "Cosa significa Tesla pronta consegna?", "Tesla pronta consegna Milano: dove si ritira?", "Posso usare il referral su una Tesla in pronta consegna?", "Conviene aspettare la fine del trimestre?".

### 2) NUOVA `/tempi-di-consegna`

- **Title**: `Tempi di consegna Tesla 2026: quanto si aspetta per Model 3 e Model Y`
- **H1**: `Tempi di consegna Tesla in Italia nel 2026`
- H2: tempi Model 3, tempi Model Y, da cosa dipendono, fasi post-ordine, come accorciare l'attesa.
- Tabella `ItemList` versione → `{settimane}`.

### 3) `/prezzo-incentivi` — fix CTR

- **Title**: `Prezzi Tesla 2026 con incentivi: quanto costano davvero Model 3 e Model Y`
- **H1**: `Prezzi Tesla 2026 con incentivi: Model 3 e Model Y`

### 4–10) Pillar e pagine nuove

`/model-y`, `/model-y-standard`, `/model-3`, `/model-3-2026`, `/store-tesla-italia` (niente `LocalBusiness`), `/tesla-usata-o-nuova` (referral **non** vale sull'usato), `/software` (FSD + Grok in collection).

### 11–13) Hub, nav, misurazione

Blocco "Stai per comprare? Parti da qui". Nav con dropdown Model Y / Model 3 / Consegna. Consent Mode v2 **advanced**: `gtag.js` sempre caricato; eventi `referral_click` e `whatsapp_click` con `transport_type: 'beacon'` visibili in DebugView anche senza consenso. Scelta consenso in cookie di prima parte.

## Checklist post-deploy

1. GA4 → Eventi: click di prova su referral e WhatsApp → verifica in **DebugView** → in "Eventi recenti" metti la **stella** a `referral_click` e `whatsapp_click` (eventi chiave); togli la stella ai 3 eventi del template non usati.
2. GSC → Controllo URL → "Richiedi indicizzazione" per tutte le pagine nuove e per `/consegna`, `/prezzo-incentivi`.
3. Compila i segnaposto `{€}`, `{km}`, `{settimane}`, `{indirizzo}` con dati verificati prima di pubblicare le pagine che li contengono.
4. Rilettura GSC tra 2–3 settimane: obiettivi `/consegna` in top 5 su `tesla pronta consegna milano`, `/prezzo-incentivi` con CTR > 5%, prime impression sulle pagine nuove (`model y standard`, `model 3 2026`, `usata`), e finalmente attribuzione dei referral per pagina.
