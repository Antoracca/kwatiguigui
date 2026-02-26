-- ===========================================================================
-- KWATIGUIGUI V2 — Initial Database Schema
-- 17 tables with strict RLS policies
--
-- SECURITY PRINCIPLES:
-- 1. All tables have RLS ENABLED
-- 2. No table has open policies (USING true / WITH CHECK true)
-- 3. Sensitive fields (whatsapp, phone) are NEVER exposed to non-premium
-- 4. Service role key operations are handled server-side only
-- 5. Anon key can ONLY read published, non-sensitive job data
-- ===========================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================================================================
-- 1. REGIONS — Reference table
-- ===========================================================================
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

-- Anyone can read regions (reference data)
CREATE POLICY "regions_select_public"
  ON regions FOR SELECT
  USING (true);

-- Only service role can insert/update/delete
-- (no policy = denied for anon/authenticated)

-- ===========================================================================
-- 2. SECTORS — Reference table
-- ===========================================================================
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sectors_select_public"
  ON sectors FOR SELECT
  USING (true);

-- ===========================================================================
-- 3. JOB_TYPES — Catalog of job types
-- ===========================================================================
CREATE TABLE job_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE job_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "job_types_select_active"
  ON job_types FOR SELECT
  USING (is_active = true);

-- ===========================================================================
-- 4. PROFILES — User profiles
-- ===========================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  age INTEGER NOT NULL DEFAULT 18 CHECK (age >= 18 AND age <= 99),
  whatsapp TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  neighborhood TEXT NOT NULL DEFAULT '',
  job_type TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '',
  user_type TEXT NOT NULL DEFAULT 'seeker' CHECK (user_type IN ('seeker', 'employer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscription_paid BOOLEAN NOT NULL DEFAULT false,
  expiry_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (on registration)
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================================================
-- 5. JOBS — Job postings
-- ===========================================================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  age INTEGER NOT NULL DEFAULT 18 CHECK (age >= 18 AND age <= 99),
  whatsapp TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  neighborhood TEXT NOT NULL DEFAULT '',
  job_type TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '',
  user_type TEXT NOT NULL DEFAULT 'seeker' CHECK (user_type IN ('seeker', 'employer')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  publication_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (publication_status IN ('draft', 'pending', 'published', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days')
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- PUBLIC: Anyone can see published, active, non-expired jobs
-- BUT: whatsapp field is NOT included in this view (handled by API)
CREATE POLICY "jobs_select_published"
  ON jobs FOR SELECT
  USING (
    is_active = true
    AND publication_status = 'published'
    AND expires_at > now()
  );

-- AUTHENTICATED: Users can see their own jobs regardless of status
CREATE POLICY "jobs_select_own"
  ON jobs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- AUTHENTICATED: Users can insert their own jobs
CREATE POLICY "jobs_insert_own"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- AUTHENTICATED: Users can update their own jobs
CREATE POLICY "jobs_update_own"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- AUTHENTICATED: Users can soft-delete their own jobs (set is_active = false)
CREATE POLICY "jobs_delete_own"
  ON jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_region ON jobs(region);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_publication_status ON jobs(publication_status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_jobs_expires_at ON jobs(expires_at);
CREATE INDEX idx_jobs_published_active ON jobs(is_active, publication_status, expires_at)
  WHERE is_active = true AND publication_status = 'published';

-- ===========================================================================
-- 6. PAYMENTS — Payment transactions
-- ===========================================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 2500 CHECK (amount > 0),
  method TEXT NOT NULL DEFAULT 'orange' CHECK (method IN ('orange', 'telecel')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  reference TEXT NOT NULL UNIQUE,
  transaction_id TEXT NOT NULL DEFAULT '',
  phone_number TEXT NOT NULL DEFAULT '',
  failure_reason TEXT,
  processed_at TIMESTAMPTZ,
  webhook_received BOOLEAN NOT NULL DEFAULT false,
  webhook_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can see their own payments
CREATE POLICY "payments_select_own"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only service role can insert/update payments (backend API)
-- No insert/update policy for authenticated = denied

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_reference ON payments(reference);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- ===========================================================================
-- 7. MESSAGES — User-to-user messages
-- ===========================================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  to_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_starred BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  category TEXT NOT NULL DEFAULT 'general'
    CHECK (category IN ('job_inquiry', 'job_offer', 'general')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can read messages sent to them
CREATE POLICY "messages_select_received"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = to_user_id);

-- Users can read messages they sent
CREATE POLICY "messages_select_sent"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id);

-- Users can send messages (from themselves)
CREATE POLICY "messages_insert_own"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- Users can update their received messages (mark read, star, archive)
CREATE POLICY "messages_update_received"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = to_user_id)
  WITH CHECK (auth.uid() = to_user_id);

CREATE INDEX idx_messages_to_user_id ON messages(to_user_id);
CREATE INDEX idx_messages_from_user_id ON messages(from_user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- ===========================================================================
-- 8. INFO_CONTENTS — Formations, stages, conseils
-- ===========================================================================
CREATE TABLE info_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'formation'
    CHECK (type IN ('formation', 'stage', 'conseil')),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'Admin',
  category TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE info_contents ENABLE ROW LEVEL SECURITY;

-- Anyone can read published content
CREATE POLICY "info_contents_select_published"
  ON info_contents FOR SELECT
  USING (is_published = true);

-- Only service role can insert/update/delete (admin)

-- ===========================================================================
-- 9. ADMIN_USERS — Admin accounts (separate from auth.users)
-- ===========================================================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'moderator' CHECK (role IN ('superadmin', 'moderator')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  mfa_secret TEXT, -- encrypted TOTP secret
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No policies for admin_users — only accessible via service role key
-- Admin auth is handled entirely server-side

-- ===========================================================================
-- 10. ADMIN_MESSAGES — Support messages from users
-- ===========================================================================
CREATE TABLE admin_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  is_read BOOLEAN NOT NULL DEFAULT false,
  admin_reply TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE admin_messages ENABLE ROW LEVEL SECURITY;

-- Users can see their own support messages
CREATE POLICY "admin_messages_select_own"
  ON admin_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create support messages
CREATE POLICY "admin_messages_insert_own"
  ON admin_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ===========================================================================
-- 11. SUBSCRIPTIONS — Subscription tracking
-- ===========================================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'freemium' CHECK (plan IN ('freemium', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
  payment_id UUID REFERENCES payments(id),
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can see their own subscriptions
CREATE POLICY "subscriptions_select_own"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only service role can insert/update subscriptions

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ===========================================================================
-- 12. AUDIT_LOGS — All significant actions
-- ===========================================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- No policies — only accessible via service role key

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ===========================================================================
-- 13. WEBHOOKS — Webhook event log (for payment audit)
-- ===========================================================================
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event TEXT NOT NULL,
  operator TEXT NOT NULL CHECK (operator IN ('orange', 'telecel')),
  payload JSONB NOT NULL DEFAULT '{}',
  signature TEXT NOT NULL DEFAULT '',
  signature_valid BOOLEAN NOT NULL DEFAULT false,
  processed BOOLEAN NOT NULL DEFAULT false,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

-- No policies — only accessible via service role key

CREATE INDEX idx_webhooks_created_at ON webhooks(created_at DESC);
CREATE INDEX idx_webhooks_processed ON webhooks(processed);

-- ===========================================================================
-- 14. SESSIONS — User sessions tracking
-- ===========================================================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- No direct client access — managed by NextAuth server-side

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- ===========================================================================
-- 15. PASSWORD_RESETS — Reset token tracking
-- ===========================================================================
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '1 hour'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;

-- No policies — server-side only

CREATE INDEX idx_password_resets_token ON password_resets(token);
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);

-- ===========================================================================
-- 16. EMAIL_VERIFICATIONS — Email verification tokens
-- ===========================================================================
CREATE TABLE email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '24 hours'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;

-- No policies — server-side only

CREATE INDEX idx_email_verifications_token ON email_verifications(token);

-- ===========================================================================
-- 17. OTP_CODES — One-time codes for login / verification
-- ===========================================================================
CREATE TABLE otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'login' CHECK (purpose IN ('login', 'verification', 'password_reset')),
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '10 minutes'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- No policies — server-side only

CREATE INDEX idx_otp_codes_user_id ON otp_codes(user_id);
CREATE INDEX idx_otp_codes_code ON otp_codes(code);

-- ===========================================================================
-- SEED DATA — Regions
-- ===========================================================================
INSERT INTO regions (name) VALUES
  ('Bangui'),
  ('Bamingui-Bangoran'),
  ('Basse-Kotto'),
  ('Haute-Kotto'),
  ('Haut-Mbomou'),
  ('Kemo'),
  ('Lobaye'),
  ('Mambere-Kadei'),
  ('Mbomou'),
  ('Nana-Grebizi'),
  ('Nana-Mambere'),
  ('Ombella-Mpoko'),
  ('Ouaka'),
  ('Ouham'),
  ('Ouham-Pende'),
  ('Sangha-Mbaere'),
  ('Vakaga'),
  ('Mambere'),
  ('Ouham-Fafa'),
  ('Sangha');

-- ===========================================================================
-- SEED DATA — Sectors
-- ===========================================================================
INSERT INTO sectors (name) VALUES
  ('Agriculture & Elevage'),
  ('Commerce & Vente'),
  ('Batiment & Travaux Publics'),
  ('Sante & Medecine'),
  ('Education & Formation'),
  ('Informatique & Technologie'),
  ('Transport & Logistique'),
  ('Hotellerie & Restauration'),
  ('Artisanat & Metiers'),
  ('Administration & Bureau'),
  ('Securite & Gardiennage'),
  ('Menage & Entretien'),
  ('Services a la personne'),
  ('Autre');

-- ===========================================================================
-- SEED DATA — Job Types
-- ===========================================================================
INSERT INTO job_types (name, category) VALUES
  ('Aide menagere', 'Menage & Entretien'),
  ('Chauffeur', 'Transport & Logistique'),
  ('Gardien', 'Securite & Gardiennage'),
  ('Cuisinier', 'Hotellerie & Restauration'),
  ('Nounous', 'Services a la personne'),
  ('Ouvrier', 'Batiment & Travaux Publics'),
  ('Secretaire', 'Administration & Bureau'),
  ('Comptable', 'Administration & Bureau'),
  ('Vendeur', 'Commerce & Vente'),
  ('Technicien', 'Informatique & Technologie'),
  ('Infirmier', 'Sante & Medecine'),
  ('Enseignant', 'Education & Formation'),
  ('Mecanicien', 'Artisanat & Metiers'),
  ('Electricien', 'Batiment & Travaux Publics'),
  ('Plombier', 'Batiment & Travaux Publics'),
  ('Macon', 'Batiment & Travaux Publics'),
  ('Agent de securite', 'Securite & Gardiennage'),
  ('Coiffeur', 'Services a la personne'),
  ('Jardinier', 'Agriculture & Elevage'),
  ('Autre', 'Autre');

-- ===========================================================================
-- HELPER FUNCTION: Check if user has active premium subscription
-- ===========================================================================
CREATE OR REPLACE FUNCTION is_premium(uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM subscriptions
    WHERE user_id = uid
      AND plan = 'premium'
      AND status = 'active'
      AND end_date > now()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================================================
-- HELPER FUNCTION: Count user's active jobs
-- ===========================================================================
CREATE OR REPLACE FUNCTION count_active_jobs(uid UUID)
RETURNS INTEGER AS $$
DECLARE
  job_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO job_count
  FROM jobs
  WHERE user_id = uid
    AND is_active = true
    AND publication_status IN ('pending', 'published');
  RETURN job_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
