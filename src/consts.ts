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
export const VERIFIED_DATE = '2026-09-16';
export const REFERRAL_CTA =
  'Stesso prezzo di listino. In più 1.000 km Supercharger: applica il codice prima di ordinare';
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
export const GA_MEASUREMENT_ID =
  import.meta.env.PUBLIC_GA_ID || import.meta.env.PUBLIC_GA_MEASUREMENT_ID || '';
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION ?? '';
export const UMAMI_ID = import.meta.env.PUBLIC_UMAMI_ID ?? '';
export const PLAUSIBLE_DOMAIN = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN ?? '';
export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const COOKIE_CONSENT_MAX_DAYS = 180;

export const ROUTES = {
  home: '/',
  guide: '/come-funziona',
  modelY: '/model-y',
  modelYStandard: '/model-y-standard',
  model3: '/model-3',
  model3_2026: '/model-3-2026',
  charging: '/ricarica',
  homeCharging: '/ricarica-domestica',
  delivery: '/consegna',
  deliveryTimes: '/tempi-di-consegna',
  stores: '/store-tesla-italia',
  prices: '/prezzo-incentivi',
  usedVsNew: '/tesla-usata-o-nuova',
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

export interface NavItem extends SiteLink {
  children?: SiteLink[];
}

export const NAV_LINKS: NavItem[] = [
  {
    href: ROUTES.modelY,
    label: 'Model Y',
    match: 'prefix',
    children: [
      { href: ROUTES.modelY, label: 'Model Y' },
      { href: ROUTES.modelYStandard, label: 'Model Y Standard' },
    ],
  },
  {
    href: ROUTES.model3,
    label: 'Model 3',
    match: 'prefix',
    children: [
      { href: ROUTES.model3, label: 'Model 3' },
      { href: ROUTES.model3_2026, label: 'Model 3 2026' },
    ],
  },
  {
    href: ROUTES.delivery,
    label: 'Consegna',
    children: [
      { href: ROUTES.delivery, label: 'Pronta consegna' },
      { href: ROUTES.deliveryTimes, label: 'Tempi di consegna' },
      { href: ROUTES.stores, label: 'Store in Italia' },
    ],
  },
  { href: ROUTES.prices, label: 'Prezzi' },
  { href: ROUTES.usedVsNew, label: 'Usata o nuova' },
  { href: ROUTES.software, label: 'Software' },
  { href: ROUTES.guide, label: 'Referral' },
];

export const MORE_LINKS: SiteLink[] = [
  { href: ROUTES.charging, label: 'Ricarica', match: 'prefix' },
  { href: ROUTES.homeCharging, label: 'Ricarica casa' },
  { href: ROUTES.faq, label: 'FAQ' },
];

export const FOOTER_GROUPS: { title: string; links: SiteLink[] }[] = [
  {
    title: 'Referral',
    links: [
      { href: ROUTES.guide, label: 'Come funziona' },
      { href: ROUTES.faq, label: 'FAQ' },
      { href: ROUTES.modelY, label: 'Model Y' },
      { href: ROUTES.model3, label: 'Model 3' },
    ],
  },
  {
    title: 'Guide',
    links: [
      { href: ROUTES.delivery, label: 'Pronta consegna' },
      { href: ROUTES.deliveryTimes, label: 'Tempi di consegna' },
      { href: ROUTES.prices, label: 'Prezzi e incentivi' },
      { href: ROUTES.usedVsNew, label: 'Usata o nuova' },
      { href: ROUTES.stores, label: 'Store in Italia' },
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

export function isNavItemActive(path: string, item: NavItem): boolean {
  if (item.children?.some((child) => isActivePath(path, child))) return true;
  return isActivePath(path, item);
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
