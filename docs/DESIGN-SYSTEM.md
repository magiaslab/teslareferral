# Design system — teslareferral.it

Riferimento: Magias UI Protocol v0.2 (repo `magiaslab/magias-ui-protocol`), applicato in modalità Review + Refactor il 10/10/2026. Il protocollo non impone uno stile: qui serve a tenere esplicite le decisioni e a verificarle. L'identità del sito (verde CodiceEV, Space Grotesk + Inter, carta chiara, banner finale scuro) resta quella esistente.

## Contesto (P07, C01)

- **Tipo:** sito editoriale con un'azione commerciale (link referral Tesla). Indipendente, non affiliato.
- **Chi arriva:** quasi tutti da Google, con query di acquisto ("tesla pronta consegna milano", "prezzi tesla 2026"). Pochi cercano il codice referral in sé.
- **Compito principale:** capire tempi, prezzi e dove si ritira; poi, se compra, aprire Tesla.com con il codice prima di ordinare.
- **Risultato atteso:** l'utente ordina dalla pagina referral (anche dallo stock in pronta consegna) e riceve 1.000 km Supercharger. Conversione misurata con l'evento GA4 `referral_click` (`cta_position`, `page_path`); i clic di chi rifiuta i cookie non compaiono nei report (Consent Mode avanzato).
- **Informazioni decisive (P09, C04):** il referral non sconta il listino; vale solo su Model 3/Model Y nuove comprate da Tesla; va applicato prima dell'ordine. Sono nel primo blocco di ogni pagina d'acquisto, vicino alla CTA.
- **Voce:** quella di Alessandro, italiano parlato, "tu" al lettore, niente formule da testo generato.

## Token

Definiti in `src/styles/global.css` (`@theme`), ridefiniti per il tema scuro in `html.dark`. Nei componenti si usano le classi Tailwind dei token, non esadecimali.

| Token | Chiaro | Scuro | Uso |
|---|---|---|---|
| `paper` | #fafaf8 | #14151a | sfondo pagina |
| `surface` | #ffffff | #1c1e24 | card, pannelli, menu |
| `ink` / `ink-soft` | #14151a / #3a3d46 | #f2f2f0 / #9ba0ab | testo / testo secondario |
| `line` | #e6e5e0 | #2c2f37 | bordi decorativi |
| `brand` | #0e7c66 | #2fa98d | link, CTA, focus |
| `brand-strong` | #0a5f4e | #3cc0a0 | testo su `brand-tint`, hover CTA chiaro |
| `brand-tint` | #e6f4ef | #16362f | box referral, hover leggeri |
| `highlight` | #f2c230 | #7a5f12 | evidenziatore dei numeri (`.num-hl`) |
| `muted` / `stripe` | #f3f3f0 / #fafaf8 | #252830 / #14151a | intestazioni e righe alterne delle tabelle |
| `night`, `night-ink`, `night-soft` | fissi | fissi | banner CTA finale, sempre scuro |
| `mark` | #0e7c66 | fisso | quadrato del marchio "C" con testo bianco |

Raggi: `--radius-btn` 10px, `--radius-card` 14px. Ombre `sm/md/lg` solo su menu e pannelli.

## Contrasti misurati (A02)

Calcolati con la formula WCAG sulle coppie usate davvero.

| Coppia | Chiaro | Scuro |
|---|---|---|
| ink su paper | 17,4 | 16,3 |
| ink-soft su paper | 10,4 | 7,0 |
| link brand su paper | 4,9 | 6,2 |
| testo CTA su brand | 5,1 (bianco) | 6,2 (#14151a) |
| brand-strong su brand-tint | 6,7 | 5,8 |
| testo su highlight | 10,9 | 5,4 |
| night-soft su night | 7,0 | 7,0 |

Il link verde contro il testo normale è a 3,6 (chiaro) e 2,6 (scuro): per questo i link nel testo sono sottolineati.

## Tipografia (T01, T03)

| Classe | Ruolo | Misura |
|---|---|---|
| `.display-56` | H1 della home | 38 → 56px, Space Grotesk 700 |
| `.display-40` | H1 delle guide | 30 → 40px, 600 |
| `.heading-28` | H2 | 28px, 600 |
| `.heading-22` | H3, titoli card e passi | 22px, 600 |
| `.body-18` | paragrafi delle guide | 18px / 1,6 |
| `.body-16` | testo secondario, liste | 16px / 1,6 |
| `.caption-14` | note, fonti, didascalie | 14px / 1,5 |

La classe visiva non decide il livello: ogni pagina ha un solo H1 e i titoli seguono l'ordine H2 → H3. Font self-hosted in `/public/fonts` (Space Grotesk e Inter, entrambi distribuiti con licenza SIL OFL; il file di licenza non è nel repo, T02.a da completare), sottoinsieme latino con `font-display: swap`.

## Componenti e stati (L09)

- **Button** (`primary`, `secondary`, `ghost`, `on-dark`, `primary-on-dark`, `disabled`): hover, focus visibile (outline brand 2px), altezza minima 48px (52 in hero). Il link referral apre una nuova scheda con `rel="nofollow noopener"` e manda `referral_click`.
- **ReferralCta / CtaBanner:** testo e etichetta personalizzabili per pagina (`summary`, `primaryLabel`); su `/consegna` la CTA porta allo stock in pronta consegna.
- **Nav:** sottomenu desktop su hover e focus, si chiude con Esc; menu mobile `details`, si chiude con Esc e riporta il focus sul bottone. Bottone tema con etichetta fissa "Tema scuro" e stato in `aria-pressed`.
- **Link nel testo:** dentro `main`, in `p`, `li`, `td`, `dd`, `figcaption`, `blockquote` e `.content-md` sono sottolineati; il passaggio del mouse ingrossa la riga. Per un link che non deve esserlo (navigazione, card) si usa `no-underline`.
- **FAQ:** `details/summary` nativi, chevron ruotato.

## Movimento (M)

Solo transizioni brevi: colore dei bottoni 150ms, chevron FAQ 160ms, scroll fluido alle ancore. Con `prefers-reduced-motion: reduce` tutto si annulla. Nessuna animazione decorativa.

## Esito review 10/10/2026

| ID | Regola | Esito prima | Correzione |
|---|---|---|---|
| R1 | T06/A10 MUST: link riconoscibili non solo dal colore | FAIL (109 link nel testo solo colorati; 2,6:1 al testo nel tema scuro) | sottolineatura dei link nel testo |
| R2 | A02 MUST: contrasto `.num-hl` nel tema scuro | FAIL (1,49:1, cifre chiave quasi illeggibili) | `highlight` scuro #7a5f12 (5,4:1) |
| R3 | A02 MUST: `brand-strong` su `brand-tint` scuro | FAIL (4,48:1, testo 18px semibold non è "grande") | #3cc0a0 (5,8:1) |
| R4 | A07 MUST: `aria-haspopup` su link di navigazione senza menu ARIA | FAIL | rimosso |
| R5 | A07: etichetta del bottone tema che cambia insieme a `aria-pressed` | FAIL (stato annunciato in modo contraddittorio) | etichetta fissa + `aria-pressed` |
| R6 | WCAG 1.4.13: sottomenu su hover non chiudibile senza spostare il puntatore | FAIL | Esc chiude il sottomenu e il menu mobile |
| R7 | L10 SHOULD: colori scritti a mano nei componenti | DEVIAZIONE (24 esadecimali in 9 file) | token `muted`, `stripe`, `night*`, `mark` |
| — | M04 movimento ridotto | PASS | — |
| — | A05 target ≥ 24px (bottoni 48px, voci menu 40–44px) | PASS su sorgente | — |

Non verificati in questa revisione: screen reader (A11), zoom 200%/reflow 320px e text spacing su tutte le pagine (A04, A12), registro WCAG completo (A01). Il sito non dichiara conformità AA.

## Quando si aggiunge qualcosa

- Una pagina nuova va anche in `netlify.toml` (rewrite 200 per `/pagina/`, vedi commento nel file).
- Un colore nuovo diventa un token con il valore per entrambi i temi, e se porta testo se ne misura il contrasto.
- Una sezione nuova deve servire a una decisione o all'orientamento (N03), non a riempire.
