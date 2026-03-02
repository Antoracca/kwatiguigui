-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 008
-- Add social links columns to profiles
-- ===========================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS linkedin_url  TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS facebook_url  TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT '';
  ADD COLUMN IF NOT EXISTS github_url TEXT NOT NULL DEFAULT '';
