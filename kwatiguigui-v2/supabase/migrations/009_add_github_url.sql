-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 009
-- Add github_url column to profiles (developers & IT profiles)
-- ===========================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS github_url TEXT NOT NULL DEFAULT '';
