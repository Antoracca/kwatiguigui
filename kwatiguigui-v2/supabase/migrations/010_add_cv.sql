-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 010
-- CV upload system
-- Adds cv_path, cv_filename, cv_size to profiles.
-- Creates private 'cvs' Supabase Storage bucket with per-user RLS.
-- ===========================================================================

-- ── Colonnes profil ────────────────────────────────────────────────────────
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS cv_path      TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS cv_filename  TEXT    DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS cv_size      INTEGER DEFAULT NULL;
-- cv_path     : chemin dans le bucket, ex. "uuid/cv.pdf"
-- cv_filename : nom original du fichier choisi par l'utilisateur
-- cv_size     : taille en octets (affichage côté client sans re-fetch)

-- ── Bucket privé 'cvs' ─────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cvs',
  'cvs',
  false,       -- bucket PRIVÉ → accès via signed URL uniquement
  5242880,     -- 5 Mo max
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- ── RLS Storage : chaque utilisateur accède uniquement à son dossier ───────
-- Lecture : le propriétaire uniquement (bucket privé)
CREATE POLICY "cv_owner_select" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'cvs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Insertion
CREATE POLICY "cv_owner_insert" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'cvs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Mise à jour (upsert)
CREATE POLICY "cv_owner_update" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'cvs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Suppression
CREATE POLICY "cv_owner_delete" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'cvs'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
