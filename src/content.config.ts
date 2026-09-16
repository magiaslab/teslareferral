import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    headingLevel: z.enum(['h2', 'h3']),
    heading: z.string(),
    order: z.number(),
    pickupNote: z.string(),
  }),
});

const stores = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stores' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    heading: z.string(),
    order: z.number(),
    address: z.string(),
    kind: z.enum(['store', 'delivery', 'store-and-delivery']),
  }),
});

const softwareNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software-notes' }),
  schema: z.object({
    id: z.string(),
    heading: z.string(),
    order: z.number(),
    updatedLabel: z.string(),
  }),
});

export const collections = { cities, stores, softwareNotes };
