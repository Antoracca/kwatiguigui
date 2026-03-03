-- Migration 013 — Add student_description to profiles
-- Allows students to describe their ambitions to recruiters.
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS student_description TEXT NOT NULL DEFAULT '';
