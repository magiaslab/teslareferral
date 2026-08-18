import {
  BRAND,
  DOMAIN,
  HOW_TO_STEPS,
  OG_IMAGE_PATH,
  OWNER_NAME,
  PHONE_E164,
  SITE_URL,
  VERIFIED_DATE,
  WHATSAPP_URL,
} from '../consts';
import faq from '../content/faq.json';
import models from '../content/models.json';
import type { Crumb, FaqItem, Model } from '../types';

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    disambiguatingDescription:
      'Sito indipendente che segnala il programma referral Tesla. Non è affiliato, sponsorizzato o approvato da Tesla, Inc.',
    founder: { '@id': PERSON_ID },
  };
}

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: OWNER_NAME,
    jobTitle: 'Proprietario di veicolo elettrico e curatore di CodiceEV',
    worksFor: { '@id': ORG_ID },
    telephone: PHONE_E164,
    sameAs: [WHATSAPP_URL],
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BRAND,
    alternateName: DOMAIN,
    inLanguage: 'it-IT',
    publisher: { '@id': ORG_ID },
  };
}

export function faqEntities(items: FaqItem[]) {
  return items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  }));
}

export function breadcrumbList(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function howToNode(id: string) {
  return {
    '@type': 'HowTo',
    '@id': id,
    name: 'Referral Tesla come funziona',
    description:
      'Tre passi: apri il link prima dell\'ordine, configura Model 3 o Model Y, completa l\'acquisto su Tesla.com.',
    inLanguage: 'it-IT',
    step: HOW_TO_STEPS.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  };
}

export function articleNode(opts: {
  url: string;
  headline: string;
  description: string;
  about: string;
  dateModified?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    inLanguage: 'it-IT',
    datePublished: VERIFIED_DATE,
    dateModified: opts.dateModified ?? VERIFIED_DATE,
    mainEntityOfPage: opts.url,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    about: opts.about,
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
  };
}

export function pageGraph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), personNode(), websiteNode(), ...nodes],
  };
}

const HOME_FAQ = (faq as FaqItem[]).slice(0, 5);

export function homeJsonLd() {
  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }];
  return pageGraph([
    breadcrumbList(crumbs),
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqEntities(HOME_FAQ),
    },
    howToNode(`${SITE_URL}/#howto`),
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#modelli`,
      name: 'Modelli Tesla idonei al referral 2026',
      numberOfItems: models.length,
      itemListElement: (models as Model[]).map((model, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `Referral Tesla ${model.name}`,
        description: model.benefit,
        url: `${SITE_URL}/${model.slug}`,
      })),
    },
  ]);
}

export function guideJsonLd() {
  const url = `${SITE_URL}/come-funziona`;
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Come funziona', path: '/come-funziona' },
  ];
  return pageGraph([
    breadcrumbList(crumbs),
    articleNode({
      url,
      headline: 'Referral Tesla come funziona: guida 2026 in Italia',
      description:
        'Referral Tesla come funziona nel 2026 in Italia: programma «Segnala e guadagna», modelli idonei, 1.000 km Supercharger e come applicare il codice prima dell\'ordine.',
      about: 'Programma referral Tesla Segnala e guadagna',
    }),
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqEntities(faq as FaqItem[]),
    },
    howToNode(`${url}#howto`),
  ]);
}

export function modelJsonLd(model: Model) {
  const url = `${SITE_URL}/${model.slug}`;
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Come funziona', path: '/come-funziona' },
    { name: model.name, path: `/${model.slug}` },
  ];
  return pageGraph([
    breadcrumbList(crumbs),
    articleNode({
      url,
      headline: model.h1,
      description: model.seoDescription,
      about: `Referral Tesla ${model.name}`,
    }),
    {
      '@type': 'ItemList',
      '@id': `${url}#versioni`,
      name: `Versioni ${model.name} idonee al referral`,
      numberOfItems: model.versions.length,
      itemListElement: model.versions.map((version, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${model.name} ${version.name}`,
        description: `${version.note}. Chimica: ${version.chemistry}.`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqEntities(model.faq),
    },
  ]);
}

export function articlePageJsonLd(opts: {
  path: string;
  crumbName: string;
  headline: string;
  description: string;
  about: string;
  faqItems?: FaqItem[];
}) {
  const url = `${SITE_URL}${opts.path}`;
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: opts.crumbName, path: opts.path },
  ];
  const nodes: object[] = [
    breadcrumbList(crumbs),
    articleNode({
      url,
      headline: opts.headline,
      description: opts.description,
      about: opts.about,
    }),
  ];
  if (opts.faqItems?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqEntities(opts.faqItems),
    });
  }
  return pageGraph(nodes);
}

export function faqPageJsonLd() {
  return articlePageJsonLd({
    path: '/faq',
    crumbName: 'FAQ',
    headline: 'Domande frequenti sul referral Tesla 2026 (Italia)',
    description:
      'FAQ sul codice referral Tesla 2026: è ufficiale? costa? si applica dopo l\'ordine? quali modelli? quando scadono i crediti?',
    about: 'Referral Tesla domande frequenti',
    faqItems: faq as FaqItem[],
  });
}

export function absoluteUrl(pathname: string): string {
  if (pathname === '/') return SITE_URL;
  return new URL(pathname.replace(/\/$/, ''), SITE_URL).href;
}
