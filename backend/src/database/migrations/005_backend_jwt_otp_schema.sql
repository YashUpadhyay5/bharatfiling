-- ============================================================================
-- BHARATFILING MIGRATION: 005_backend_jwt_otp_schema.sql
-- Dedicated OTP, Staging & Password Reset Storage
-- Database: Supabase PostgreSQL (Public Schema)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    txn_id VARCHAR(64) UNIQUE NOT NULL,               -- Unique transaction identifier
    email VARCHAR(255) NOT NULL,                      -- Normalized lowercase email
    otp_hash VARCHAR(255) NOT NULL,                   -- Keyed HMAC-SHA256 verifier
    purpose VARCHAR(50) NOT NULL CHECK (
        purpose IN ('REGISTRATION', 'PASSWORD_RESET', 'CHANGE_PASSWORD')
    ),
    staged_payload JSONB DEFAULT '{}'::jsonb,         -- Staged registration data (name, phone, bcrypt hash)
    attempts INT NOT NULL DEFAULT 0,                  -- Failed verification attempt counter
    max_attempts INT NOT NULL DEFAULT 5,              -- Maximum permissible incorrect guesses
    is_consumed BOOLEAN NOT NULL DEFAULT FALSE,       -- True once successfully verified
    is_superseded BOOLEAN NOT NULL DEFAULT FALSE,     -- True if user requested a newer OTP
    reset_token VARCHAR(128),                         -- Single-use token generated for password reset
    reset_token_expires_at TIMESTAMPTZ,               -- 10-minute validity for reset authorization
    expires_at TIMESTAMPTZ NOT NULL,                  -- OTP expiration timestamp (NOW() + 5 mins)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    consumed_at TIMESTAMPTZ                           -- Timestamp when successfully consumed
);

-- Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_otps_lookup ON public.otps(email, purpose, is_consumed, is_superseded);
CREATE INDEX IF NOT EXISTS idx_otps_txn ON public.otps(txn_id);
CREATE INDEX IF NOT EXISTS idx_otps_reset_token ON public.otps(reset_token);
CREATE INDEX IF NOT EXISTS idx_otps_expiry ON public.otps(expires_at);

-- Row-Level Security (RLS) Protection
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Backend Server Access Policy
DROP POLICY IF EXISTS "Allow backend full access on otps" ON public.otps;
CREATE POLICY "Allow backend full access on otps" ON public.otps FOR ALL USING (true);

-- Maintenance function to remove expired records older than 7 days
CREATE OR REPLACE FUNCTION clean_expired_otps()
RETURNS void AS $$
BEGIN
    DELETE FROM public.otps 
    WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;
