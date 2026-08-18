# Mappa keyword + kit DataForSEO

Volumi e difficoltà in questa mappa sono **stime da analisi SERP**, da confermare con i CSV dello script. Location: Italia / italiano.

Come leggere: `[P]` primaria della pagina, `[S]` secondarie, intent e priorità da validare sui numeri reali.

## Cluster A — Transazionale (home + modelli)

| Keyword | Pagina | Intent | Priorità |
|---|---|---|---|
| codice referral tesla | `/` | transazionale | Alta |
| referral tesla italia | `/` | transazionale | Alta |
| codice sconto tesla | `/` | commerciale | Alta |
| link referral tesla | `/` | transazionale | Media |
| referral tesla 2026 | `/` | transazionale | Alta |
| codice referral tesla model y | `/model-y` | transazionale | Alta |
| referral tesla model y | `/model-y` | transazionale | Alta |
| codice referral tesla model 3 | `/model-3` | transazionale | Alta |
| referral tesla model 3 | `/model-3` | transazionale | Alta |
| sconto tesla model y | `/model-y` | commerciale | Media |
| sconto tesla model 3 | `/model-3` | commerciale | Media |

Copy on-page: «codice sconto» solo per chiarire che **non** è uno sconto sul listino.

## Cluster B — Informazionale / pillar (motore GEO)

| Keyword | Pagina | Intent | Priorità |
|---|---|---|---|
| come funziona il referral tesla | `/come-funziona` | informazionale | Massima |
| programma segnala e guadagna tesla | `/come-funziona` | informazionale | Alta |
| refer and earn tesla italia | `/come-funziona` | informazionale | Media |
| vantaggi referral tesla | `/come-funziona` | informazionale | Media |
| referral tesla è ufficiale | `/come-funziona`, `/faq` | commerciale | Alta |
| il referral tesla si applica dopo l'ordine | `/come-funziona`, `/faq` | informazionale | Alta |
| quanto valgono 1000 km supercharger | `/come-funziona`, `/faq` | informazionale | Media |
| referral tesla conviene | `/faq` | commerciale | Media |

## Cluster C — Ricarica / batteria

| Keyword | Pagina | Intent | Priorità |
|---|---|---|---|
| quando caricare tesla 80 o 100 | `/ricarica` | informazionale | Alta |
| ricarica tesla model y | `/ricarica` | informazionale | Alta |
| batteria lfp o nmc tesla | `/ricarica` | informazionale | Media |
| caricare tesla al 100% | `/ricarica` | informazionale | Media |
| limite carica tesla | `/ricarica` | informazionale | Media |
| strategia ricarica tesla | `/ricarica` | informazionale | Bassa |

## Cluster D — Consegna / acquisto

| Keyword | Pagina | Intent | Priorità |
|---|---|---|---|
| tempi di consegna tesla italia | `/consegna` | informazionale | Media |
| consegne tesla fine trimestre | `/consegna` | informazionale | Media |
| tesla pronta consegna | `/consegna` | commerciale | Media |
| quanto si aspetta una tesla | `/consegna` | informazionale | Bassa |

## Cluster E — Software

| Keyword | Pagina | Intent | Priorità |
|---|---|---|---|
| aggiornamento tesla 2026 | `/software` | informazionale | Media |
| tesla summer update 2026 | `/software` | informazionale | Media |
| novità software tesla | `/software` | informazionale | Bassa |
| grok tesla | `/software` | informazionale | Bassa |

---

## Script DataForSEO

Nessuna chiave in repo. Lo script legge `DATAFORSEO_LOGIN` e `DATAFORSEO_PASSWORD` dall'ambiente o da `.env` (già in `.gitignore`). Usa la password **API** del dashboard DataForSEO, non quella dell'account.

```bash
python3 -m pip install -r scripts/requirements-dataforseo.txt
cp .env.example .env   # poi inserisci login e password API
python3 scripts/dataforseo_keywords.py
python3 scripts/dataforseo_keywords.py --serp   # opzionale: SERP feature sui top 5 seed
```

Output (gitignorati):

- `data/seo/keywords_seed.csv` — volume, CPC, competition, difficulty
- `data/seo/keywords_suggestions.csv` — long-tail dai 4 seed informazionali
- `data/seo/keywords_serp.csv` — solo con `--serp` (`item_types`: `ai_overview`, `people_also_ask`, …)

### Come interpretare

- Volume alto + difficulty alta → head (home/modelli): puntale, niente vittorie rapide.
- Volume medio/basso + difficulty bassa → long-tail (pillar, ricarica, FAQ): rank e citazioni AI prima.
- Ordina `keywords_suggestions.csv` per volume e pesca nuove H2/H3/FAQ.
- Se in SERP vedi `ai_overview` / `people_also_ask`, rinforza quick-answer e FAQ.

### Prossimo passo

Incolla i CSV (o i primi 30–40 per volume). Con i numeri reali: riordino le priorità, aggiungo le long-tail emerse, e se serve genero le FAQ dallo suggestions file.
