-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 006
-- Allow custom experience values in "X ans +" format
--
-- Problem: Migration 002 added a strict CHECK constraint on profiles.experience
-- that only allows predefined enum values. When a user enters a custom value
-- (e.g., 7 years → stored as "7 ans +"), Supabase rejects it with HTTP 400.
--
-- Fix: Replace the CHECK constraint to also accept custom values matching
-- the pattern "^[0-9]+ ans \+$" (e.g., "5 ans +", "12 ans +").
-- ===========================================================================

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_experience_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_experience_check
  CHECK (
    experience IN ('none', '1+', '3+', '5+', '10+', '15+', '20+', 'other')
    OR experience ~ '^[0-9]+ ans \+$'
  );
