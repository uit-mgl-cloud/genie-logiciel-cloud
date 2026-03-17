import { defineCollection, z } from 'astro:content';

const cours = defineCollection({
  type: 'content',
  schema: z.object({
    module: z.number().int().min(1).max(12),
    seance: z.number().int().min(1),
    titre: z.string().max(80),
    description: z.string().max(200),
    duree: z.string(),
    niveau: z.enum(['fondamental', 'intermédiaire', 'avancé']),
    date: z.date(),
    outils: z.array(z.string()).optional(),
    tp_associe: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const tp = defineCollection({
  type: 'content',
  schema: z.object({
    numero: z.number().int().min(1).max(20),
    titre: z.string().max(100),
    description: z.string().max(300),
    module: z.number().int(),
    difficulte: z.enum(['débutant', 'intermédiaire', 'avancé']),
    duree_estimee: z.string(),
    statut: z.enum(['ouvert', 'a-venir', 'termine']),
    outils: z.array(z.string()),
    prerequis: z.array(z.string()).optional(),
    date_ouverture: z.date().optional(),
  }),
});

const projets = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    description: z.string().max(400),
    modules: z.array(z.number()),
    deadline: z.date().optional(),
    equipe: z.number().int().min(1).max(5).default(2),
    livrable: z.string(),
  }),
});

const contributions = defineCollection({
  type: 'content',
  schema: z.object({
    type: z.enum(['etude-de-cas', 'solution-tp', 'ressource', 'implementation']),
    titre: z.string().max(120),
    description: z.string().max(300),
    auteur: z.string(),
    module: z.number().int().optional(),
    tp_reference: z.string().optional(),
    outils: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  cours,
  tp,
  projets,
  contributions,
};
