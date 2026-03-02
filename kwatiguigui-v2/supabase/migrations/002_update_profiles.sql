-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 002
-- 1. profiles: add last_name, username, date_of_birth  |  drop age
-- 2. profiles: change experience to predefined enum values
-- 3. Drop 4 tables Supabase handles natively (sessions, password_resets,
--    email_verifications, otp_codes)
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. PROFILES — new columns, drop age
-- ---------------------------------------------------------------------------
ALTER TABLE profiles
  ADD COLUMN last_name      TEXT NOT NULL DEFAULT '',
  ADD COLUMN username       TEXT,
  ADD COLUMN date_of_birth  DATE;

ALTER TABLE profiles
  DROP COLUMN age;

-- Unique username index
ALTER TABLE profiles
  ADD CONSTRAINT profiles_username_unique UNIQUE (username);

-- ---------------------------------------------------------------------------
-- 2. PROFILES — experience: migrate + enforce enum
-- ---------------------------------------------------------------------------

-- Migrate existing free-text values to 'none'
UPDATE profiles
  SET experience = 'none'
  WHERE experience IS NULL OR experience = '' OR
        experience NOT IN ('none','1+','3+','5+','10+','15+','20+','other');

-- Add CHECK constraint
ALTER TABLE profiles
  ADD CONSTRAINT profiles_experience_check
  CHECK (experience IN ('none','1+','3+','5+','10+','15+','20+','other'));

-- Set new default
ALTER TABLE profiles
  ALTER COLUMN experience SET DEFAULT 'none';

-- ---------------------------------------------------------------------------
-- 3. DROP unnecessary tables (Supabase Auth handles these natively)
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS otp_codes          CASCADE;
DROP TABLE IF EXISTS email_verifications CASCADE;
DROP TABLE IF EXISTS password_resets    CASCADE;
DROP TABLE IF EXISTS sessions           CASCADE;
