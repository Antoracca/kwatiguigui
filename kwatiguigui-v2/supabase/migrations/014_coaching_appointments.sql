-- ============================================================
-- 014_coaching_appointments.sql
-- Table for coaching session booking requests
-- ============================================================

CREATE TABLE IF NOT EXISTS public.coaching_appointments (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name            TEXT        NOT NULL,
  email                TEXT        NOT NULL,
  phone                TEXT,
  preferred_date       DATE        NOT NULL,
  preferred_time_slot  TEXT        NOT NULL,
  topic                TEXT        NOT NULL,
  message              TEXT,
  status               TEXT        NOT NULL DEFAULT 'pending'
                                   CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  admin_notes          TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE public.coaching_appointments ENABLE ROW LEVEL SECURITY;

-- Users can view their own appointments
CREATE POLICY "coaching_select_own"
  ON public.coaching_appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can book a session
CREATE POLICY "coaching_insert_own"
  ON public.coaching_appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only cancel their own pending appointments
CREATE POLICY "coaching_cancel_own"
  ON public.coaching_appointments FOR UPDATE
  TO authenticated
  USING  (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (status = 'cancelled');

-- Admin / service role has full access
CREATE POLICY "coaching_service_role_all"
  ON public.coaching_appointments FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS coaching_user_idx   ON public.coaching_appointments (user_id);
CREATE INDEX IF NOT EXISTS coaching_status_idx ON public.coaching_appointments (status);
CREATE INDEX IF NOT EXISTS coaching_date_idx   ON public.coaching_appointments (preferred_date);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_coaching_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER coaching_updated_at
  BEFORE UPDATE ON public.coaching_appointments
  FOR EACH ROW EXECUTE FUNCTION public.handle_coaching_updated_at();
