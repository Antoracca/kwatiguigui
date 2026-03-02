import { z } from "zod";
import { EXPERIENCE_VALUES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z
    .string()
    .email("Veuillez entrer une adresse e-mail valide"),
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
    lastName: z
      .string()
      .max(50, "Le nom ne peut pas depasser 50 caracteres")
      .optional()
      .default(""),
    username: z
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caracteres")
      .max(30, "Le nom d'utilisateur ne peut pas depasser 30 caracteres")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et _",
      ),
    dateOfBirth: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // optionnel pour les comptes entreprise
          const dob = new Date(val);
          if (isNaN(dob.getTime())) return false;
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const m = today.getMonth() - dob.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
          return age >= 18 && age <= 99;
        },
        "Vous devez avoir au moins 18 ans",
      ),
    email: z
      .string()
      .email("Veuillez entrer une adresse e-mail valide"),
    phone: z
      .string()
      .min(1, "Le numero de telephone est obligatoire")
      .refine(
        (val) => /^\+?[\d\s()\-]{6,}$/.test(val),
        "Format de telephone invalide (+236 XX XX XX XX)",
      ),
    city: z
      .string()
      .min(2, "La ville doit contenir au moins 2 caracteres")
      .max(100, "La ville ne peut pas depasser 100 caracteres"),
    neighborhood: z
      .string()
      .max(100, "Le quartier ne peut pas depasser 100 caracteres")
      .optional()
      .default(""),
    jobType: z.string().optional().default(""),
    experience: z.enum(EXPERIENCE_VALUES, {
      required_error: "Veuillez selectionner votre niveau d'experience",
      invalid_type_error: "Valeur d'experience invalide",
    }).optional(),
    companyName: z.string().optional(),
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
  email: z
    .string()
    .email("Veuillez entrer une adresse e-mail valide"),
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
