-- ===========================================================================
-- KWATIGUIGUI V2 — Migration 005
-- Fonction : check_email_available
--
-- Vérifie si une adresse email est déjà enregistrée dans auth.users.
-- Utilisée par l'API /api/check-availability pour le feedback en temps réel
-- lors de l'inscription.
--
-- SECURITY DEFINER : la fonction s'exécute avec les droits du owner (postgres)
-- ce qui lui permet de lire auth.users depuis le schema public.
-- L'accès direct est restreint : anon et authenticated ne peuvent pas l'appeler.
-- Seul le service role (API route server-side) peut l'invoquer.
-- ===========================================================================

CREATE OR REPLACE FUNCTION public.check_email_available(email_to_check TEXT)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = auth, public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE lower(email) = lower(trim(email_to_check))
  );
END;
$$;

-- Restreindre au service role uniquement — empêche appel direct depuis le client
REVOKE EXECUTE ON FUNCTION public.check_email_available(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_email_available(TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_email_available(TEXT) FROM authenticated;

-- Note : le service role bypass ces restrictions et peut toujours appeler la fonction.
-- L'API route (/api/check-availability) utilise supabaseAdmin (service role key).

-- ===========================================================================
-- Fonction : check_phone_available
--
-- Compare les numéros en chiffres purs (strip espaces, +, tirets...)
-- pour éviter les faux négatifs liés au format (+236 70 12 34 56 vs 236701234).
-- Fonctionne sur public.profiles (pas besoin de SECURITY DEFINER).
-- Accessible par le service role uniquement.
-- ===========================================================================

CREATE OR REPLACE FUNCTION public.check_phone_available(phone_to_check TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  digits TEXT;
BEGIN
  digits := regexp_replace(trim(phone_to_check), '[^0-9]', '', 'g');

  -- Numéro trop court → pas valide, on laisse la validation form gérer
  IF length(digits) < 7 THEN
    RETURN TRUE;
  END IF;

  RETURN NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE phone IS NOT NULL
      AND phone <> ''
      AND regexp_replace(phone, '[^0-9]', '', 'g') = digits
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.check_phone_available(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_phone_available(TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_phone_available(TEXT) FROM authenticated;
