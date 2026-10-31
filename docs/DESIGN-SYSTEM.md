# Design system — teslareferral.it

Riferimento: Magias UI Protocol v0.3 (repo `magiaslab/magias-ui-protocol`, release 0.3.0-beta.1). Prima applicazione con la v0.2 il 10/10/2026, aggiornamento alla v0.3 il 31/10/2026: le 77 regole della v0.2 non cambiano, la v0.3 aggiunge movimento ricco, prestazioni e profili. Il protocollo non impone uno stile: qui serve a tenere esplicite le decisioni e a verificarle. L'identità del sito (verde CodiceEV, Space Grotesk + Inter, carta chiara, banner finale scuro) resta quella esistente.

## Contesto (P07, C01)

- **Tipo:** sito editoriale con un'azione commerciale (link referral Tesla). Indipendente, non affiliato.
- **Chi arriva:** quasi tutti da Google, con query di acquisto ("tesla pronta consegna milano", "prezzi tesla 2026"). Pochi cercano il codice referral in sé.
- **Compito principale:** capire tempi, prezzi e dove si ritira; poi, se compra, aprire Tesla.com con il codice prima di ordinare.
- **Risultato atteso:** l'utente ordina dalla pagina referral (dallo stock quando c'è, altrimenti con «Ordina ora») e riceve 1.000 km Supercharger. Conversione misurata con l'evento GA4 `referral_click` (`cta_position`, `page_path`); i clic di chi rifiuta i cookie non compaiono nei report (Consent Mode avanzato).
- **Informazioni decisive (P09, C04):** il referral non sconta il listino; vale solo su Model 3/Model Y nuove comprate da Tesla; va applicato prima dell'ordine. Sono nel primo blocco di ogni pagina d'acquisto, vicino alla CTA.
- **Voce:** quella di Alessandro, italiano parlato, "tu" al lettore, niente formule da testo generato.
- **Profilo (G05):** generico. Non è una struttura ricettiva: il profilo ospitalità non si applica.
- **Livello di movimento (MV00):** 0, fermo, su tutte le pagine. Solo feedback di stato e transizioni brevi; nessuna libreria di movimento (niente GSAP, Lenis, WebGL), quindi le regole ML non si applicano.
- **Servizi di terzi:** Google Analytics 4 (`googletagmanager.com`) con Consent Mode avanzato; link in uscita verso Tesla.com (`ts.la`). Quello che succede su Tesla.com dopo il clic (stock, configuratore, codice applicato) non si può verificare dal sito: si controlla a mano e si scrive in `src/content/availability.json`.
- **Prestazioni (PF01):** soglie Core Web Vitals del protocollo (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1). Dati di campo non disponibili (traffico troppo basso per il report CrUX).

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
- **ReferralCta / CtaBanner:** testo e etichetta personalizzabili per pagina (`summary`, `primaryLabel`); su `/consegna` la CTA apre la pagina referral su Tesla.com («Apri Tesla.com con il codice»), da cui si guarda lo stock o si ordina.
- **StockStatus:** box datato con lo stato dello stock e le stime del configuratore, da `src/content/availability.json`. Su `/consegna` e `/tempi-di-consegna`.
- **PhotoSlot:** immagine con `width`/`height` e `aspect-ratio`; `priority` solo per l'immagine della prima schermata (caricamento immediato e priorità alta), le altre in differita.
- **Nav:** sottomenu desktop su hover e focus, si chiude con Esc; menu mobile `details`, si chiude con Esc e riporta il focus sul bottone. Bottone tema con etichetta fissa "Tema scuro" e stato in `aria-pressed`.
- **Link nel testo:** dentro `main`, in `p`, `li`, `td`, `dd`, `figcaption`, `blockquote` e `.content-md` sono sottolineati; il passaggio del mouse ingrossa la riga. Per un link che non deve esserlo (navigazione, card) si usa `no-underline`.
- **Faq:** `details/summary` nativi, chevron ruotato.

## Movimento (M, MV)

Livello 0. Solo transizioni brevi: colore dei bottoni 150ms, chevron FAQ 160ms, scroll fluido alle ancore. Con `prefers-reduced-motion: reduce` tutto si annulla. Nessuna animazione decorativa, nessun loop, nessuno stato iniziale nascosto: senza JavaScript la pagina è completa (MV02, MV03).

## Dati da confermare (G03)

Un numero o una condizione va in pagina solo se ha fonte e data: listino e autonomia da `src/content/prices.json` e `src/content/models.json` con la data di `VERIFIED_DATE`, stock e attese da `src/content/availability.json`. Niente scritte «da verificare» o «segnaposto» al posto del dato: se il dato non c'è, la frase non si scrive. Restano ammessi i rimandi a cose che solo il lettore può controllare (la garanzia residua sul VIN di un'usata, l'indirizzo del Delivery Center nell'app).

## Esito review 10/10/2026

| ID | Regola | Esito prima | Correzione |
|---|---|---|---|
| R1 | T06/A10 MUST: link riconoscibili non solo dal colore | FAIL (109 link nel testo e il link autore solo colorati; 2,6:1 al testo nel tema scuro) | sottolineatura dei link nel testo; le breadcrumb restano navigazione senza sottolineatura |
| R2 | A02 MUST: contrasto `.num-hl` nel tema scuro | FAIL (1,49:1, cifre chiave quasi illeggibili) | `highlight` scuro #7a5f12 (5,4:1) |
| R3 | A02 MUST: `brand-strong` su `brand-tint` scuro | FAIL (4,48:1, testo 18px semibold non è "grande") | #3cc0a0 (5,8:1) |
| R4 | A07 MUST: `aria-haspopup` su link di navigazione senza menu ARIA | FAIL | rimosso |
| R5 | A07: etichetta del bottone tema che cambia insieme a `aria-pressed` | FAIL (stato annunciato in modo contraddittorio) | etichetta fissa + `aria-pressed` |
| R6 | WCAG 1.4.13: sottomenu su hover non chiudibile senza spostare il puntatore | FAIL | Esc chiude il sottomenu e il menu mobile |
| R7 | L10 SHOULD: colori scritti a mano nei componenti | DEVIAZIONE (24 esadecimali in 9 file) | token `muted`, `stripe`, `night*`, `mark` |
| — | M04 movimento ridotto | PASS | — |
| — | A05 target ≥ 24px (bottoni 48px, voci menu 40–44px) | PASS su sorgente | — |

Non verificati in questa revisione: screen reader (A11), zoom 200%/reflow 320px e text spacing su tutte le pagine (A04, A12), registro WCAG completo (A01). Il sito non dichiara conformità AA.

## Esito review v0.3, 31/10/2026

| ID | Regola | Esito prima | Correzione |
|---|---|---|---|
| V1 | G05, MV00 SHOULD: profilo, livello di movimento e servizi di terzi nel contesto | FAIL (contesto scritto per la v0.2) | campi aggiunti in «Contesto» |
| V2 | G04 SHOULD: documento allineato al codice con controllo automatico | FAIL (descriveva ancora la CTA verso lo stock, mancava StockStatus, nessun controllo) | testo corretto, `scripts/check-design-system.mjs` (`npm run check:ds`), eseguito in `npm run check` |
| V3 | G03 SHOULD: dati da confermare | FAIL («segnaposto da verificare» in pagina su `/consegna`; prezzo e autonomia della Model Y Standard e listini nelle risposte rapide «da verificare» anche se il dato c'era) | scritte tolte, al loro posto fonte e data |
| V4 | PF06 SHOULD: script di terzi dopo il consenso | DEVIAZIONE motivata | `gtag.js` si carica prima della scelta con Consent Mode avanzato e consenso negato (nessun cookie). Era già così prima della v0.3: serve a contare i `referral_click`, in forma anonima, anche di chi non risponde al banner. Se si vuole il caricamento solo dopo «Accetta», si passa al Consent Mode base e si perdono quei dati |
| — | PF02 elemento LCP | PASS | home: immagine hero `priority`; le altre pagine: testo |
| — | PF04 spazio riservato | PASS | immagini con dimensioni; banner cookie `fixed`, non sposta il contenuto |
| — | PF01 soglie | PASS in laboratorio desktop, NON VERIFICATO su telefono | vedi prove |
| — | MV01–MV07, PF03, PF05, ML | NON APPLICABILE | livello 0: nessuna libreria, loop, video, striscia bloccata né handler di scroll |
| — | MV02, MV03 | PASS su sorgente | nessuno stato nascosto in CSS, nessun effetto d'ingresso |
| — | G01 token e contrasti | PASS | tabelle sopra |
| — | G02 controlli dei moduli | NON APPLICABILE | il sito non ha moduli |

Ancora aperti dalla v0.2: screen reader (A11), zoom 200% e reflow 320px su tutte le pagine (A04, A12), file di licenza dei font (T02.a).

## Quando si aggiunge qualcosa

- Una pagina nuova va anche in `netlify.toml` (rewrite 200 per `/pagina/`, vedi commento nel file).
- Un colore nuovo diventa un token con il valore per entrambi i temi, e se porta testo se ne misura il contrasto.
- Una sezione nuova deve servire a una decisione o all'orientamento (N03), non a riempire.
- Un componente, token o classe nuovi citati qui devono esistere nel codice: `npm run check:ds` lo controlla.
- Un effetto di movimento oltre le transizioni brevi cambia il livello (MV00): va deciso e scritto qui prima, con la scheda effetto del protocollo.

## Prove eseguite (anteprima Netlify PR #4, Chrome desktop 1241px)

- Tema scuro, `/ricarica-domestica`: evidenziatore `rgb(122, 95, 18)` sotto testo `#f2f2f0`, cifre leggibili; 9 link su 12 in `p`/`li` sottolineati, i 3 restanti erano breadcrumb (attese) e il link autore (poi corretto).
- Tema chiaro, `/prezzo-incentivi`: tabella con `muted`/`stripe`, link "Tesla pronta consegna" sottolineato.
- Tastiera: focus su "Consegna" apre il sottomenu, Esc reale lo chiude e il focus resta sulla voce; uscendo col focus il sottomenu torna disponibile.
- Bottone tema: etichetta "Tema scuro" fissa, `aria-pressed` passa da true a false; nessun `aria-haspopup` rimasto.
- Build e `astro check`: 0 errori.

## Prove eseguite v0.3 (produzione, 31/10/2026, Chrome desktop 1467px, rete di casa, senza rallentamenti)

| Pagina | LCP | Elemento LCP | CLS | TTFB |
|---|---|---|---|---|
| `/` | 144 ms | immagine hero | 0 | 32 ms |
| `/consegna` | 136 ms | primo paragrafo | 0 | 31 ms |
| `/tempi-di-consegna` | 96 ms | primo paragrafo | 0 | 52 ms |
| `/ricarica-domestica` | 320 ms | H1 | 0 | 275 ms |

Misura di laboratorio su desktop veloce: non sostituisce un telefono di fascia media con rete e CPU rallentate né i dati di campo, che restano NON VERIFICATO. INP non misurato.
