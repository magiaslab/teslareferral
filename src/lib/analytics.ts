import { CONTACT_MAILTO, OCTOPUS_REFERRAL_URL, REFERRAL_URL } from '../consts';

export type TrackEvent =
  | 'referral_click'
  | 'whatsapp_click'
  | 'octopus_click'
  | 'contact_click'
  | 'outbound_click'
  | 'cta_click';

export interface TrackParams {
  [key: string]: string | number | boolean | undefined;
}

/** Invia un evento a GA4. `transport_type: beacon` evita la perdita sul click in uscita. */
export function track(eventName: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, {
    transport_type: 'beacon',
    ...params,
  });
}

export function isReferralHref(href: string): boolean {
  return href === REFERRAL_URL || href.startsWith('https://ts.la/');
}

export function isWhatsAppHref(href: string): boolean {
  return href.includes('wa.me') || href.includes('whatsapp.com');
}

export function trackEventForHref(href: string): TrackEvent {
  if (isReferralHref(href)) return 'referral_click';
  if (isWhatsAppHref(href)) return 'whatsapp_click';
  if (href === OCTOPUS_REFERRAL_URL || href.includes('/octo-friends/')) return 'octopus_click';
  if (href === CONTACT_MAILTO || href.startsWith('mailto:')) return 'contact_click';
  if (/^https?:\/\//.test(href)) return 'outbound_click';
  return 'cta_click';
}
