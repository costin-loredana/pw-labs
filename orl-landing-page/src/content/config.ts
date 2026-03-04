import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['realizare', 'conferinta', 'tehnologie', 'medic']),
    author: z.string(),
    excerpt: z.string(),
  }),
});

const doctors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string().optional(),
    bio: z.string(),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    color: z.string(),
    order: z.number().default(0),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    heroLabel: z.string().optional(),
    heroDesc: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    hours: z.string().optional(),
  }),
});

export const collections = { news, doctors, services, pages };