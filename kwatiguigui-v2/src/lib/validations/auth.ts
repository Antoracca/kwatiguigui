import { z } from "zod";

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  whatsapp: z
    .string()
    .min(8, "Le numero WhatsApp doit contenir au moins 8 chiffres")
    .regex(
      /^\+?\d[\d\s-]{7,}$/,
      "Format de numero invalide. Exemple: +236 74 14 34 34",
    ),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
export const registerSchema = z
  .object({
    userType: z.enum(["seeker", "employer"], {
      required_error: "Veuillez choisir votre type de profil",
    }),
    firstName: z
      .string()
      .min(2, "Le prenom doit contenir au moins 2 caracteres")
      .max(50, "Le prenom ne peut pas depasser 50 caracteres")
      .regex(/^[\p{L}\s'-]+$/u, "Le prenom contient des caracteres invalides"),
    age: z
      .number({ required_error: "L'age est requis" })
      .int("L'age doit etre un nombre entier")
      .min(18, "Vous devez avoir au moins 18 ans")
      .max(99, "Age invalide"),
    whatsapp: z
      .string()
      .min(8, "Le numero WhatsApp doit contenir au moins 8 chiffres")
      .regex(
        /^\+?\d[\d\s-]{7,}$/,
        "Format invalide. Exemple: +236 74 14 34 34",
      ),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?\d[\d\s-]{7,}$/.test(val),
        "Format de telephone invalide",
      ),
    region: z.string().min(1, "Veuillez selectionner une region"),
    city: z
      .string()
      .min(2, "La ville doit contenir au moins 2 caracteres")
      .max(100, "La ville ne peut pas depasser 100 caracteres"),
    neighborhood: z
      .string()
      .max(100, "Le quartier ne peut pas depasser 100 caracteres")
      .optional()
      .default(""),
    jobType: z.string().min(1, "Veuillez selectionner un type d'emploi"),
    experience: z
      .string()
      .max(500, "La description ne peut pas depasser 500 caracteres")
      .optional()
      .default(""),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caracteres")
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule",
      )
      .regex(
        /[0-9]/,
        "Le mot de passe doit contenir au moins un chiffre",
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir au moins un caractere special",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// ---------------------------------------------------------------------------
// Forgot password
// ---------------------------------------------------------------------------
export const forgotPasswordSchema = z.object({
  whatsapp: z
    .string()
    .min(8, "Le numero WhatsApp doit contenir au moins 8 chiffres")
    .regex(/^\+?\d[\d\s-]{7,}$/, "Format de numero invalide"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ---------------------------------------------------------------------------
// Reset password
// ---------------------------------------------------------------------------
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caracteres")
      .regex(/[A-Z]/, "Au moins une majuscule requise")
      .regex(/[0-9]/, "Au moins un chiffre requis")
      .regex(/[^A-Za-z0-9]/, "Au moins un caractere special requis"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ---------------------------------------------------------------------------
// Change password
// ---------------------------------------------------------------------------
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caracteres")
      .regex(/[A-Z]/, "Au moins une majuscule requise")
      .regex(/[0-9]/, "Au moins un chiffre requis")
      .regex(/[^A-Za-z0-9]/, "Au moins un caractere special requis"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ---------------------------------------------------------------------------
// Admin login
// ---------------------------------------------------------------------------
export const adminLoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
  totpCode: z
    .string()
    .length(6, "Le code TOTP doit contenir 6 chiffres")
    .regex(/^\d{6}$/, "Le code doit etre compose de 6 chiffres"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
