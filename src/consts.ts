export const SITE_URL = 'https://teslareferral.it';
export const REFERRAL_URL = 'https://ts.la/alessandro519156';
export const OCTOPUS_REFERRAL_URL = 'https://octopusenergy.it/octo-friends/crisp-eland-323';
export const OCTOPUS_IO_URL = 'https://octopusenergy.it/intelligent-octopus';
export const OCTOPUS_IO_TERMS =
  'https://a.storyblok.com/f/146593/x/d7165cf193/oe-italia-regolamento-intelligent-octopus-260730.pdf';
export const OCTOPUS_FRIENDS_TERMS =
  'https://a.storyblok.com/f/146593/x/8bd0782df3/octofriends-termini-e-condizioni_30042026.pdf';
export const CONTACT_EMAIL = 'social@magiaslab.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const MAGIASLAB_URL = 'https://www.magiaslab.com';
/** Fonte unica per badge visibile e JSON-LD (`dateModified`). */
export const VERIFIED_DATE = '2026-08-01';
export const OWNER = 'Alessandro Cipriani — Magias Lab';
export const OWNER_NAME = 'Alessandro Cipriani';
export const OWNER_ORG = 'Magias Lab';
export const BRAND = 'CodiceEV';
export const DOMAIN = 'teslareferral.it';
export const OG_IMAGE_PATH = '/img/og.jpg';
export const PROGRAM_IT = 'Segnala e guadagna';
export const PROGRAM_EN = 'Refer and Earn';
export const TERMS_IN_FORCE = '2024-10-03';
export const TERMS_UPDATED = '2025-06-04';
export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '';
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION ?? '';
export const COOKIE_CONSENT_KEY = 'cookie-consent';

export const ROUTES = {
  home: '/',
  guide: '/come-funziona',
  modelY: '/model-y',
  model3: '/model-3',
  charging: '/ricarica',
  homeCharging: '/ricarica-domestica',
  delivery: '/consegna',
  software: '/software',
  faq: '/faq',
  privacy: '/privacy',
  cookie: '/cookie',
} as const;

export interface SiteLink {
  href: string;
  label: string;
  match?: 'exact' | 'prefix';
}

export const NAV_LINKS: SiteLink[] = [
  { href: ROUTES.guide, label: 'Come funziona' },
  { href: ROUTES.modelY, label: 'Model Y' },
  { href: ROUTES.model3, label: 'Model 3' },
  { href: ROUTES.charging, label: 'Ricarica', match: 'prefix' },
  { href: ROUTES.delivery, label: 'Consegna' },
  { href: ROUTES.faq, label: 'FAQ' },
];

export const MORE_LINKS: SiteLink[] = [
  { href: ROUTES.homeCharging, label: 'Ricarica casa' },
  { href: ROUTES.software, label: 'Software e Grok' },
];

export const FOOTER_GROUPS: { title: string; links: SiteLink[] }[] = [
  {
    title: 'Referral',
    links: [
      { href: ROUTES.guide, label: 'Come funziona' },
      { href: ROUTES.modelY, label: 'Model Y' },
      { href: ROUTES.model3, label: 'Model 3' },
      { href: ROUTES.faq, label: 'FAQ' },
    ],
  },
  {
    title: 'Guide',
    links: [
      { href: ROUTES.charging, label: 'Ricarica LFP/NMC' },
      { href: ROUTES.homeCharging, label: 'Ricarica casa' },
      { href: ROUTES.delivery, label: 'Pronta consegna' },
      { href: ROUTES.software, label: 'Software e Grok' },
    ],
  },
];

export function isActivePath(path: string, link: SiteLink): boolean {
  if (link.match === 'prefix') {
    return path === link.href || path.startsWith(`${link.href}-`) || path.startsWith(`${link.href}/`);
  }
  return path === link.href;
}

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
    title: 'Apri il link',
    text: 'Si apre Tesla.com con il codice già inserito. Parti da qui, non da un\'altra scheda o da una finestra anonima.',
  },
  {
    title: 'Scegli Model 3 o Model Y',
    text: 'Configura versione, colore e optional come faresti di solito.',
  },
  {
    title: 'Conferma l\'ordine',
    text: 'I chilometri Supercharger restano sul tuo account Tesla. Dopo l\'invio non si possono più aggiungere.',
  },
] as const;

export const DISCLAIMER = `${BRAND} è un sito indipendente, non ufficiale e non affiliato, sponsorizzato o approvato da Tesla, Inc. né da Octopus Energy Italia S.r.l. "Tesla", "Model 3", "Model Y", "Model S", "Model X" e "Supercharger" sono marchi di Tesla, Inc.; "Octopus Energy", "Intelligent Octopus" e "Octofriends" sono marchi di Octopus Energy, citati a scopo descrittivo. I programmi referral sono gestiti dai rispettivi titolari; questo sito si limita a segnalarli. Il referral Tesla non è un incentivo statale.`;
