export const SITE_URL = 'https://teslareferral.it';
export const REFERRAL_URL = 'https://ts.la/alessandro519156';
export const WHATSAPP_URL = 'https://wa.me/393311072100';
/** Fonte unica per badge visibile e JSON-LD (`dateModified`). */
export const VERIFIED_DATE = '2026-08-01';
export const OWNER = 'Alessandro Cipriani — Magias Lab';
export const OWNER_NAME = 'Alessandro Cipriani';
export const BRAND = 'CodiceEV';
export const DOMAIN = 'teslareferral.it';
export const OG_IMAGE_PATH = '/img/og.jpg';
export const PHONE_E164 = '+393311072100';
export const PROGRAM_IT = 'Segnala e guadagna';
export const PROGRAM_EN = 'Refer and Earn';
export const TERMS_IN_FORCE = '2024-10-03';
export const TERMS_UPDATED = '2025-06-04';

export const ROUTES = {
  home: '/',
  guide: '/come-funziona',
  modelY: '/model-y',
  model3: '/model-3',
  charging: '/ricarica',
  delivery: '/consegna',
  software: '/software',
  faq: '/faq',
  privacy: '/privacy',
  cookie: '/cookie',
} as const;

export const NAV_LINKS = [
  { href: ROUTES.guide, label: 'Come funziona' },
  { href: ROUTES.delivery, label: 'Consegna' },
  { href: ROUTES.modelY, label: 'Model Y' },
  { href: ROUTES.model3, label: 'Model 3' },
] as const;

export const SILO_LINKS = [
  { href: ROUTES.charging, label: 'Ricarica' },
  { href: ROUTES.software, label: 'Software' },
  { href: ROUTES.faq, label: 'FAQ' },
] as const;

const MONTHS_IT = [
  'gennaio',
  'febbraio',
  'marzo',
  'aprile',
  'maggio',
  'giugno',
  'luglio',
  'agosto',
  'settembre',
  'ottobre',
  'novembre',
  'dicembre',
] as const;

export function formatVerifiedDateIt(iso: string = VERIFIED_DATE): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const year = match[1];
  const monthIndex = Number(match[2]) - 1;
  return `${MONTHS_IT[monthIndex]} ${year}`;
}

export const HOW_TO_STEPS = [
  {
    title: 'Apri il link referral',
    text: 'Apri il link referral prima di iniziare l\'ordine: si apre Tesla.com con il codice già applicato.',
  },
  {
    title: 'Configura Model 3 o Model Y',
    text: 'Scegli versione, colore e allestimento su Tesla.com come faresti normalmente.',
  },
  {
    title: 'Completa l\'ordine',
    text: 'Il vantaggio in crediti Supercharger risulta associato al tuo account Tesla.',
  },
] as const;

export const DISCLAIMER = `${BRAND} è un sito indipendente, non ufficiale e non affiliato, sponsorizzato o approvato da Tesla, Inc. "Tesla", "Model 3", "Model Y", "Model S", "Model X" e "Supercharger" sono marchi di Tesla, Inc., citati a scopo puramente descrittivo. Il programma referral è gestito da Tesla; questo sito si limita a segnalarlo. Il referral non è un incentivo statale.`;
