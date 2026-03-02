import { z } from "zod";

import { PUBLICATION_STATUSES, USER_TYPES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Create / Update job
// ---------------------------------------------------------------------------
export const createJobSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prenom doit contenir au moins 2 caracteres")
    .max(50),
  age: z
    .number()
    .int()
    .min(18, "Vous devez avoir au moins 18 ans")
    .max(99),
  city: z.string().min(2, "La ville est requise").max(100),
  neighborhood: z.string().max(100).optional().default(""),
  jobType: z.string().min(1, "Le type d'emploi est requis"),
  experience: z.string().max(500).optional().default(""),
  userType: z.enum(USER_TYPES, {
    required_error: "Le type d'utilisateur est requis",
  }),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;

// ---------------------------------------------------------------------------
// Update job status (admin moderation)
// ---------------------------------------------------------------------------
export const updateJobStatusSchema = z.object({
  jobId: z.string().uuid("ID d'annonce invalide"),
  status: z.enum(PUBLICATION_STATUSES, {
    required_error: "Le statut est requis",
  }),
  reason: z.string().max(500).optional(),
});

export type UpdateJobStatusInput = z.infer<typeof updateJobStatusSchema>;

// ---------------------------------------------------------------------------
// Search jobs
// ---------------------------------------------------------------------------
export const searchJobsSchema = z.object({
  query: z.string().max(200).optional(),
  jobType: z.string().optional(),
  userType: z.enum(USER_TYPES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(12),
  sortBy: z.enum(["created_at", "expires_at"]).default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type SearchJobsInput = z.infer<typeof searchJobsSchema>;
