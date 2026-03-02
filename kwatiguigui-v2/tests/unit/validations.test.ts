import { describe, it, expect } from "vitest";

import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/validations/auth";
import { createJobSchema, searchJobsSchema } from "@/lib/validations/jobs";
import { initiatePaymentSchema } from "@/lib/validations/payments";

// ---------------------------------------------------------------------------
// loginSchema
// ---------------------------------------------------------------------------
describe("loginSchema", () => {
  const validLogin = {
    email: "maelis@gmail.com",
    password: "MotDePasse1!",
  };

  it("valide un login correct", () => {
    expect(loginSchema.safeParse(validLogin).success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = loginSchema.safeParse({ ...validLogin, email: "pas-un-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejette un mot de passe trop court (< 8 chars)", () => {
    const result = loginSchema.safeParse({ ...validLogin, password: "court" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
    }
  });

  it("rejette des champs manquants", () => {
    expect(loginSchema.safeParse({}).success).toBe(false);
  });

  it("rejette un email vide", () => {
    const result = loginSchema.safeParse({ ...validLogin, email: "" });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// registerSchema
// ---------------------------------------------------------------------------
describe("registerSchema", () => {
  const validRegister = {
    userType: "seeker" as const,
    firstName: "Marie",
    lastName: "Ngbangui",
    username: "marie_ngb",
    dateOfBirth: "1995-06-15",   // 30 ans, valide
    email: "marie@gmail.com",
    region: "Bangui",
    city: "Bangui",
    jobType: "Aide menagere",
    experience: "3+" as const,
    password: "SecretMot1!",
    confirmPassword: "SecretMot1!",
  };

  it("valide une inscription correcte (seeker)", () => {
    expect(registerSchema.safeParse(validRegister).success).toBe(true);
  });

  it("valide une inscription employer", () => {
    expect(registerSchema.safeParse({ ...validRegister, userType: "employer" }).success).toBe(true);
  });

  it("rejette un userType invalide", () => {
    const result = registerSchema.safeParse({ ...validRegister, userType: "admin" });
    expect(result.success).toBe(false);
  });

  it("rejette une date de naissance < 18 ans", () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    const dob = today.toISOString().split("T")[0];
    const result = registerSchema.safeParse({ ...validRegister, dateOfBirth: dob });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.dateOfBirth?.[0]).toContain("18 ans");
    }
  });

  it("rejette un username trop court", () => {
    const result = registerSchema.safeParse({ ...validRegister, username: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejette un username avec caracteres speciaux", () => {
    const result = registerSchema.safeParse({ ...validRegister, username: "marie@nb" });
    expect(result.success).toBe(false);
  });

  it("rejette une experience invalide", () => {
    const result = registerSchema.safeParse({ ...validRegister, experience: "2+" });
    expect(result.success).toBe(false);
  });

  it("rejette un prenom < 2 caracteres", () => {
    const result = registerSchema.safeParse({ ...validRegister, firstName: "A" });
    expect(result.success).toBe(false);
  });

  it("rejette un mot de passe sans majuscule", () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      password: "motdepasse1!",
      confirmPassword: "motdepasse1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors.password;
      expect(errors?.some((e) => e.includes("majuscule"))).toBe(true);
    }
  });

  it("rejette un mot de passe sans chiffre", () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      password: "MotDePasseA!",
      confirmPassword: "MotDePasseA!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors.password;
      expect(errors?.some((e) => e.includes("chiffre"))).toBe(true);
    }
  });

  it("rejette un mot de passe sans caractere special", () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      password: "MotDePasse1",
      confirmPassword: "MotDePasse1",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors.password;
      expect(errors?.some((e) => e.includes("special"))).toBe(true);
    }
  });

  it("rejette si confirmPassword differ du password", () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      password: "SecretMot1!",
      confirmPassword: "AutreMotDePasse1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors.confirmPassword;
      expect(errors?.[0]).toContain("ne correspondent pas");
    }
  });

  it("rejette une region manquante", () => {
    const result = registerSchema.safeParse({ ...validRegister, region: "" });
    expect(result.success).toBe(false);
  });

  it("rejette un jobType manquant", () => {
    const result = registerSchema.safeParse({ ...validRegister, jobType: "" });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// forgotPasswordSchema
// ---------------------------------------------------------------------------
describe("forgotPasswordSchema", () => {
  it("valide un email correct", () => {
    expect(forgotPasswordSchema.safeParse({ email: "maelis@gmail.com" }).success).toBe(true);
  });

  it("rejette un email invalide", () => {
    expect(forgotPasswordSchema.safeParse({ email: "pas-un-email" }).success).toBe(false);
  });

  it("rejette un email vide", () => {
    expect(forgotPasswordSchema.safeParse({ email: "" }).success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// createJobSchema
// ---------------------------------------------------------------------------
describe("createJobSchema", () => {
  const validJob = {
    firstName: "Paul",
    age: 30,
    region: "Bangui",
    city: "Bangui",
    jobType: "Chauffeur",
    userType: "seeker" as const,
  };

  it("valide une annonce correcte", () => {
    expect(createJobSchema.safeParse(validJob).success).toBe(true);
  });

  it("rejette un prenom manquant", () => {
    const { firstName: _ignored, ...rest } = validJob;
    expect(createJobSchema.safeParse(rest).success).toBe(false);
  });

  it("rejette un type d'emploi vide", () => {
    const result = createJobSchema.safeParse({ ...validJob, jobType: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors.jobType;
      expect(errors?.[0]).toContain("type d'emploi");
    }
  });

  it("rejette un age < 18", () => {
    const result = createJobSchema.safeParse({ ...validJob, age: 17 });
    expect(result.success).toBe(false);
  });

  it("rejette un age > 99", () => {
    expect(createJobSchema.safeParse({ ...validJob, age: 100 }).success).toBe(false);
  });

  it("rejette une region vide", () => {
    const result = createJobSchema.safeParse({ ...validJob, region: "" });
    expect(result.success).toBe(false);
  });

  it("rejette un userType invalide", () => {
    expect(createJobSchema.safeParse({ ...validJob, userType: "admin" }).success).toBe(false);
  });

  it("accepte un userType 'employer'", () => {
    expect(createJobSchema.safeParse({ ...validJob, userType: "employer" }).success).toBe(true);
  });

  it("une experience optionnelle peut etre omise", () => {
    expect(createJobSchema.safeParse(validJob).success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// searchJobsSchema
// ---------------------------------------------------------------------------
describe("searchJobsSchema", () => {
  it("valide avec des parametres vides (defaults)", () => {
    const result = searchJobsSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.perPage).toBe(12);
      expect(result.data.sortBy).toBe("created_at");
      expect(result.data.sortOrder).toBe("desc");
    }
  });

  it("coerce page en nombre depuis une chaine", () => {
    const result = searchJobsSchema.safeParse({ page: "2" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
    }
  });

  it("rejette perPage > 50", () => {
    expect(searchJobsSchema.safeParse({ perPage: "100" }).success).toBe(false);
  });

  it("rejette page = 0", () => {
    expect(searchJobsSchema.safeParse({ page: "0" }).success).toBe(false);
  });

  it("valide un userType seeker", () => {
    const result = searchJobsSchema.safeParse({ userType: "seeker" });
    expect(result.success).toBe(true);
  });

  it("rejette un userType invalide", () => {
    expect(searchJobsSchema.safeParse({ userType: "unknown" }).success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// initiatePaymentSchema
// ---------------------------------------------------------------------------
describe("initiatePaymentSchema", () => {
  const validPayment = {
    plan: "monthly" as const,
    method: "orange" as const,
    phoneNumber: "+236 74 14 34 34",
  };

  it("valide un paiement Orange Money mensuel", () => {
    expect(initiatePaymentSchema.safeParse(validPayment).success).toBe(true);
  });

  it("valide un paiement Telecel Money annuel", () => {
    expect(
      initiatePaymentSchema.safeParse({
        ...validPayment,
        method: "telecel",
        plan: "annual",
      }).success,
    ).toBe(true);
  });

  it("valide un plan biannual", () => {
    expect(
      initiatePaymentSchema.safeParse({ ...validPayment, plan: "biannual" }).success,
    ).toBe(true);
  });

  it("rejette une methode invalide", () => {
    const result = initiatePaymentSchema.safeParse({ ...validPayment, method: "mtn" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.method).toBeDefined();
    }
  });

  it("rejette un plan invalide", () => {
    expect(
      initiatePaymentSchema.safeParse({ ...validPayment, plan: "weekly" }).success,
    ).toBe(false);
  });

  it("rejette un numero trop court", () => {
    const result = initiatePaymentSchema.safeParse({ ...validPayment, phoneNumber: "1234" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phoneNumber).toBeDefined();
    }
  });

  it("rejette des champs manquants", () => {
    expect(initiatePaymentSchema.safeParse({}).success).toBe(false);
  });
});
