// Coreografia di scroll dichiarata con attributi data-m-*, avviata una volta dal layout.
// Porting da magias-ui-kit/motion/scroll-motion.tsx, ridotto al livello 1 (Editoriale):
// niente parallax, zoom, velo o altri effetti legati allo scroll.

import { loadGsap, whenIdle } from './gsap';
import { whileMotionAllowed } from './preferences';
import { duration, easeFn } from './tokens';

/*
 * Le pagine chiedono un effetto con un attributo. Un elemento ha un solo data-m, quindi
 * un solo effetto (MV08). Prefisso unico data-m-*, separato da data-cta-position (ML02).
 *
 *   data-m="reveal"    il blocco entra dal basso
 *   data-m="split"     titolo riga per riga (mai l'h1)
 *   data-m="curtain"   riquadro con foto che si apre dal centro
 *   data-m="line"      filetto che si scopre da sinistra
 *   data-m-scope       contenitore: i suoi p, li, figure, h3… entrano come reveal,
 *                      i suoi h2 riga per riga
 *   data-m-none        esclude un ramo: CTA referral, banner, dialog
 *
 * Regole del motore (dal kit):
 * - ciò che è visibile al caricamento non si anima;
 * - lo stato iniziale lo imposta lo script, mai il CSS: senza JavaScript la pagina è
 *   completa (MV02);
 * - si usa opacity e non visibility: un blocco in attesa resta raggiungibile da tastiera
 *   e dalla ricerca nella pagina, e se riceve il focus compare subito (MV04);
 * - con «riduci movimento», anche attivato a pagina aperta, tutto torna allo stato finale
 *   e GSAP non si scarica (MV01).
 */

const AUTO_BLOCKS = 'p, li, figure, details, blockquote, dl, table, h3, aside';
const AUTO_SPLIT = 'h2';
const START = 'top 88%';
const EXCLUDED = '[data-m-none], [role=dialog], #cookie-banner';

export function startScrollMotion(): () => void {
  let stop: (() => void) | undefined;
  const cancelIdle = whenIdle(() => {
    stop = whileMotionAllowed((alive) => start(alive));
  });
  return () => {
    cancelIdle();
    stop?.();
  };
}

async function start(alive: () => boolean): Promise<() => void> {
  const { gsap, ScrollTrigger, SplitText } = await loadGsap();
  // SplitText misura le righe con il carattere definitivo.
  await document.fonts.ready;
  if (!alive()) return () => {};

  const vh = () => document.documentElement.clientHeight;
  const inViewAtLoad = (el: Element) => el.getBoundingClientRect().top < vh() * 0.88;
  const free = (el: Element) => !el.closest(EXCLUDED);
  const all = (selector: string) =>
    [...document.querySelectorAll<HTMLElement>(selector)].filter(free);
  const declared = (name: string) => all(`[data-m="${name}"]`);
  const scopes = all('[data-m-scope]');

  const ease = easeFn('editorial');
  const ctx = gsap.context(() => {
    // --- Titoli riga per riga ---------------------------------------------------------
    const autoTitles = scopes.flatMap((s) =>
      [...s.querySelectorAll<HTMLElement>(AUTO_SPLIT)].filter((el) => free(el) && !el.dataset.m),
    );
    const splitTargets = new Set(
      [...declared('split'), ...autoTitles].filter(
        (el) => el.tagName !== 'H1' && !inViewAtLoad(el),
      ),
    );
    splitTargets.forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        // aria-label sull'elemento e righe aria-hidden: il lettore di schermo legge il
        // titolo intero (MV03).
        aria: 'auto',
        onSplit: (self) => {
          // Maschera allargata: senza, le discendenti (g, p, q) restano tagliate.
          gsap.set(self.masks, {
            paddingTop: '0.12em',
            paddingBottom: '0.3em',
            marginTop: '-0.12em',
            marginBottom: '-0.3em',
          });
          return gsap.from(self.lines, {
            yPercent: 140,
            duration: duration('long'),
            ease,
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: START, once: true },
          });
        },
      });
    });

    // --- Blocchi -----------------------------------------------------------------------
    const scoped = scopes.flatMap((scope) =>
      [...scope.querySelectorAll<HTMLElement>(AUTO_BLOCKS)].filter(free),
    );
    const candidates = [...new Set([...declared('reveal'), ...scoped])].filter(
      (el) =>
        (!el.dataset.m || el.dataset.m === 'reveal') &&
        !splitTargets.has(el) &&
        !el.closest('[data-m="split"]') &&
        !el.closest('[data-m="curtain"]'),
    );
    const set = new Set(candidates);
    // Solo il più esterno di ogni gruppo: una card, non anche il suo testo.
    const blocks = candidates.filter((el) => {
      for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
      return !inViewAtLoad(el);
    });
    gsap.set(blocks, { opacity: 0, y: 40 });
    const shown = new Set<Element>();
    const show = (batch: Element[]) => {
      const fresh = batch.filter((el) => !shown.has(el));
      fresh.forEach((el) => shown.add(el));
      if (!fresh.length) return;
      gsap.to(fresh, {
        opacity: 1,
        y: 0,
        duration: duration('editorial'),
        ease,
        stagger: { amount: Math.min(0.4, (fresh.length - 1) * 0.06) },
        overwrite: true,
      });
    };
    // Nell'ultima schermata il bordo alto di un blocco non arriva mai all'88%.
    const maxScroll = ScrollTrigger.maxScroll(window);
    const reachable = (el: Element) =>
      el.getBoundingClientRect().top + window.scrollY - vh() * 0.88 <= maxScroll;
    ScrollTrigger.batch(blocks.filter(reachable), { start: START, once: true, onEnter: show });
    ScrollTrigger.batch(
      blocks.filter((el) => !reachable(el)),
      { start: 'top 98%', once: true, onEnter: show },
    );
    // Un blocco in attesa che riceve il focus compare subito (MV04).
    const onFocus = (e: FocusEvent) => {
      const block = blocks.find((b) => b.contains(e.target as Node));
      if (block && !shown.has(block)) {
        shown.add(block);
        gsap.set(block, { opacity: 1, y: 0 });
      }
    };
    document.addEventListener('focusin', onFocus);
    // Rete di sicurezza: arrivati in fondo compare tutto ciò che fosse rimasto.
    const atBottom = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        show(blocks);
      }
    };
    window.addEventListener('scroll', atBottom, { passive: true });

    // --- Sipario: il riquadro si apre dal centro ----------------------------------------
    declared('curtain')
      .filter((el) => !inViewAtLoad(el))
      .forEach((el) => {
        // Una lettura per riquadro all'avvio, non a ogni frame (PF05).
        const radius = getComputedStyle(el).borderRadius || '0px';
        gsap.fromTo(
          el,
          { clipPath: `inset(12% 10% 12% 10% round ${radius})`, opacity: 0.2 },
          {
            clipPath: `inset(0% 0% 0% 0% round ${radius})`,
            opacity: 1,
            duration: duration('long'),
            ease,
            clearProps: 'clipPath,opacity',
            scrollTrigger: { trigger: el, start: START, once: true },
          },
        );
      });

    // --- Filetti -------------------------------------------------------------------------
    declared('line')
      .filter((el) => !inViewAtLoad(el))
      .forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: duration('long'),
            ease: easeFn('inout'),
            clearProps: 'clipPath',
            scrollTrigger: { trigger: el, start: START, once: true },
          },
        );
      });

    return () => {
      document.removeEventListener('focusin', onFocus);
      window.removeEventListener('scroll', atBottom);
    };
  });

  // Font, immagini e righe dei titoli cambiano l'altezza: si ricalcola quando cambia davvero.
  let frame = 0;
  let lastHeight = document.body.scrollHeight;
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      ScrollTrigger.refresh();
    });
  });
  observer.observe(document.body);

  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    // Revert: stati iniziali tolti, contenuti nello stato finale.
    ctx.revert();
  };
}
