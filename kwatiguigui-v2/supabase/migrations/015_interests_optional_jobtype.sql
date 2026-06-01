-- ===========================================================================
-- KUSSALA V2 — Migration 015
-- 1. Ajoute la colonne "interests" (centres d'intérêt) — TABLEAU, FACULTATIF
-- 2. Rend "job_type" (poste recherché) NON obligatoire à l'inscription
-- 3. Rend "experience" (niveau d'expérience) NON obligatoire à l'inscription
--
-- Contexte : l'onboarding ne demande plus le poste recherché ni l'expérience.
-- L'utilisateur choisit librement plusieurs centres d'intérêt (facultatif).
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. Centres d'intérêt — tableau de texte, vide par défaut (facultatif)
-- ---------------------------------------------------------------------------
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS interests TEXT[] NOT NULL DEFAULT '{}';

-- ---------------------------------------------------------------------------
-- 2. job_type — n'est plus obligatoire (garde une valeur par défaut vide)
-- ---------------------------------------------------------------------------
ALTER TABLE profiles
  ALTER COLUMN job_type DROP NOT NULL,
  ALTER COLUMN job_type SET DEFAULT '';

-- ---------------------------------------------------------------------------
-- 3. experience — n'est plus obligatoire (garde une valeur par défaut 'none')
--    On conserve la contrainte CHECK mais on autorise aussi NULL / vide.
-- ---------------------------------------------------------------------------
ALTER TABLE profiles
  ALTER COLUMN experience DROP NOT NULL,
  ALTER COLUMN experience SET DEFAULT 'none';

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_experience_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_experience_check
  CHECK (
    experience IS NULL
    OR experience = ''
    OR experience IN ('none', '1+', '3+', '5+', '10+', '15+', '20+', 'other')
    OR experience ~ '^[0-9]+ ans \+$'
  );
