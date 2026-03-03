-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 012
-- Pôle Étudiant — Stage & Alternance
-- Adds student profile columns to the profiles table.
-- ===========================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS is_student          BOOLEAN      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS school_name         TEXT         NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS field_of_study      TEXT         NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS study_level         TEXT         NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS school_year         TEXT         NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS internship_open     BOOLEAN      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS alternance_open     BOOLEAN      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS internship_start    DATE                  DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS internship_duration TEXT         NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS internship_mode     TEXT         NOT NULL DEFAULT '';

COMMENT ON COLUMN profiles.is_student          IS 'Pôle Étudiant activé — le profil est indexé comme chercheur de stage/alternance';
COMMENT ON COLUMN profiles.school_name         IS 'Nom de l''école ou université';
COMMENT ON COLUMN profiles.field_of_study      IS 'Domaine d''études (Informatique, Droit, Gestion…)';
COMMENT ON COLUMN profiles.study_level         IS 'Niveau d''études : Bac, BTS, Licence, Master, Doctorat, Formation pro';
COMMENT ON COLUMN profiles.school_year         IS 'Année en cours : 1ère, 2ème, 3ème, 4ème, 5ème+';
COMMENT ON COLUMN profiles.internship_open     IS 'Cherche activement un stage';
COMMENT ON COLUMN profiles.alternance_open     IS 'Cherche activement une alternance';
COMMENT ON COLUMN profiles.internship_start    IS 'Date de disponibilité pour commencer le stage/alternance';
COMMENT ON COLUMN profiles.internship_duration IS 'Durée souhaitée : 1 mois, 2 mois, 3 mois, 6 mois, Flexible';
COMMENT ON COLUMN profiles.internship_mode     IS 'Mode souhaité : Présentiel, Distanciel, Hybride';
