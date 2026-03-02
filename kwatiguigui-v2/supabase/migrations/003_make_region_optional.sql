-- ===========================================================================
-- Migration 003 — Rend la colonne region optionnelle dans profiles
-- ===========================================================================
-- Contexte : Le formulaire d'inscription ne demande plus la région/préfecture.
-- L'utilisateur peut la renseigner depuis son profil après inscription.
-- La colonne est conservée pour la recherche d'offres et le profil éditable.
-- ===========================================================================

ALTER TABLE profiles
  ALTER COLUMN region SET DEFAULT '',
  ALTER COLUMN region DROP NOT NULL;
