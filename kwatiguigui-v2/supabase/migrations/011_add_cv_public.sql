-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 011
-- CV public sharing
-- Adds cv_public boolean to profiles.
-- When cv_public = true, authenticated users (employers) can read / download
-- the seeker's CV via /api/cv/public/[userId].
-- ===========================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS cv_public BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN profiles.cv_public IS
  'Autorisation de partage CV : true → les recruteurs peuvent lire/télécharger le CV via /api/cv/public/[userId]';
