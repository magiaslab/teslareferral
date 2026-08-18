export type IconName =
  | 'arrow-right'
  | 'badge-check'
  | 'battery-charging'
  | 'book-open'
  | 'calendar-clock'
  | 'check'
  | 'cookie'
  | 'chevron-down'
  | 'circle-help'
  | 'external-link'
  | 'fuel'
  | 'globe'
  | 'home'
  | 'info'
  | 'mail'
  | 'menu'
  | 'moon'
  | 'plug-zap'
  | 'route'
  | 'settings'
  | 'sun'
  | 'trending-down'
  | 'wallet'
  | 'zap';

export interface FaqItem {
  q: string;
  a: string;
}

export interface ModelVersion {
  name: string;
  chemistry: string;
  note: string;
}

export interface Model {
  slug: string;
  variant: string;
  name: string;
  codename: string;
  benefit: string;
  benefitShort: string;
  intro: string;
  why: string;
  bullets: string[];
  versions: ModelVersion[];
  photoSrc: string;
  photoAlt: string;
  kwhPer100km: number | null;
  energyPriceEur: number | null;
  estimateEur: number | null;
  tableNote: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  keyPoints: string[];
  deliveryLead: string;
  faq: FaqItem[];
}

export interface Crumb {
  name: string;
  path: string;
}
