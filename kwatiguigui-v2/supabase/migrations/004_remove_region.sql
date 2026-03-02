-- ===========================================================================
-- Migration 004 — Supprimer la colonne "region" (phase pilote)
--
-- Justification : Pour la phase pilote, la ville suffit à localiser
-- les annonces et les profils. La région peut être réintroduite plus tard
-- avec une vraie table de référence liée par FK.
--
-- À EXÉCUTER dans Supabase Dashboard → SQL Editor
-- ===========================================================================

-- 1. Supprimer la colonne region de la table profiles
--    (L'index associé est supprimé automatiquement par PostgreSQL)
ALTER TABLE profiles DROP COLUMN IF EXISTS region;

-- 2. Supprimer la colonne region de la table jobs
--    (L'index idx_jobs_region est supprimé automatiquement)
ALTER TABLE jobs DROP COLUMN IF EXISTS region;

-- 3. Supprimer la table regions (plus utilisée)
--    CASCADE supprime les politiques RLS associées
DROP TABLE IF EXISTS regions CASCADE;

-- ===========================================================================
-- Vérification post-migration (facultatif — à exécuter manuellement)
-- ===========================================================================
-- SELECT column_name FROM information_schema.columns
--   WHERE table_name = 'profiles' AND column_name = 'region';
-- -- Doit retourner 0 lignes
--
-- SELECT column_name FROM information_schema.columns
--   WHERE table_name = 'jobs' AND column_name = 'region';
-- -- Doit retourner 0 lignes
--
-- SELECT table_name FROM information_schema.tables
--   WHERE table_name = 'regions';
-- -- Doit retourner 0 lignes
