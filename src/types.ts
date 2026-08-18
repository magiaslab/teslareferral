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

export interface SpecRow {
  label: string;
  value: string;
}

export interface IntentSection {
  id: string;
  h2: string;
  answer: string;
  body?: string;
  tableCaption?: string;
  tableHeaders?: string[];
  tableRows?: SpecRow[];
  relatedHref?: string;
  relatedLabel?: string;
}

export interface Model {
  slug: string;
  variant: string;
  name: string;
  codename: string;
  benefit: string;
  benefitShort: string;
  intro: string;
  quickAnswer: string;
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
  intentSections: IntentSection[];
  faq: FaqItem[];
}

export interface PriceRow {
  model: string;
  version: string;
  listinoEur: number;
  note: string;
}

export interface Crumb {
  name: string;
  path: string;
}
