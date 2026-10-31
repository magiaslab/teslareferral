// Unico punto che carica GSAP e registra i plugin (ML01). Porting da magias-ui-kit/motion/gsap.ts.

/*
 * GSAP non entra nel bundle iniziale: si scarica con import() solo quando il movimento
 * è ammesso (con «riduci movimento» non si scarica, MV01) e i plugin si registrano una
 * volta sola. Si registrano solo quelli usati: ScrollTrigger e SplitText.
 */

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerT = typeof import('gsap/ScrollTrigger').ScrollTrigger;
type SplitTextT = typeof import('gsap/SplitText').SplitText;

export type GsapKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerT; SplitText: SplitTextT };

let loading: Promise<GsapKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  loading ??= Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'),
  ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    return { gsap, ScrollTrigger, SplitText };
  });
  return loading;
}

/** Esegue fn quando il browser è libero, dopo il primo disegno: GSAP non compete con l'LCP. */
export function whenIdle(fn: () => void): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(fn, 200);
  return () => window.clearTimeout(handle);
}
