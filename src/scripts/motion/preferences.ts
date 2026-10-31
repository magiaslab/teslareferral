// Preferenza di movimento ascoltata per tutta la vita della pagina (MV01).
// Porting da magias-ui-kit/motion/preferences.ts, senza la parte React.

export const QUERY_MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Avvia start quando il movimento è ammesso e lo ferma quando non lo è più, anche a
 * pagina aperta. start riceve alive(): dopo ogni await, se restituisce false l'avvio è
 * stato annullato e non va creato niente.
 */
export function whileMotionAllowed(
  start: (alive: () => boolean) => Promise<(() => void) | void> | (() => void) | void,
  query = QUERY_MOTION_OK,
): () => void {
  const mq = window.matchMedia(query);
  let stop: (() => void) | void;
  let generation = 0;
  const run = async (ok: boolean) => {
    const current = ++generation;
    stop?.();
    stop = undefined;
    if (!ok) return;
    const cleanup = await start(() => current === generation);
    if (current !== generation) cleanup?.();
    else stop = cleanup;
  };
  const onChange = () => void run(mq.matches);
  void run(mq.matches);
  mq.addEventListener('change', onChange);
  return () => {
    generation++;
    mq.removeEventListener('change', onChange);
    stop?.();
  };
}
