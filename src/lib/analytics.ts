import { CONTACT_MAILTO, OCTOPUS_REFERRAL_URL, REFERRAL_URL } from '../consts';

export type TrackEvent =
  | 'referral_click'
  | 'octopus_click'
  | 'contact_click'
  | 'outbound_click'
  | 'cta_click';

export function trackEventForHref(href: string): TrackEvent {
  if (href === REFERRAL_URL || href.startsWith('https://ts.la/')) return 'referral_click';
  if (href === OCTOPUS_REFERRAL_URL || href.includes('/octo-friends/')) return 'octopus_click';
  if (href === CONTACT_MAILTO || href.startsWith('mailto:')) return 'contact_click';
  if (/^https?:\/\//.test(href)) return 'outbound_click';
  return 'cta_click';
}
