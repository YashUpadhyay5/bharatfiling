-- ============================================================================
-- BHARATFILING PRODUCTION DATABASE MIGRATION: 001_initial_schema.sql
-- Platform: BharatFiling (AI + CA-Powered Indian Compliance & Tax OS)
-- Database Engine: PostgreSQL / Supabase
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. USERS TABLE (AUTHENTICATION & RBAC)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'CA', 'ADMIN')),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ============================================================================
-- 3. MASTER CUSTOMER PROFILES (REUSABLE KYC VAULT)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.customer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    personal_info JSONB NOT NULL DEFAULT '{"full_name":"","father_name":"","dob":"","gender":""}'::jsonb,
    identity_info JSONB NOT NULL DEFAULT '{"pan_number":"","pan_verified":false,"aadhaar_number":"","aadhaar_verified":false}'::jsonb,
    contact_info JSONB NOT NULL DEFAULT '{"mobile_number":"","mobile_verified":false,"email":"","email_verified":false}'::jsonb,
    address_info JSONB NOT NULL DEFAULT '{"address_line_1":"","address_line_2":"","city":"","state":"Karnataka","pincode":""}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_profiles_user ON public.customer_profiles(user_id);

-- ============================================================================
-- 4. BUSINESSES TABLE (CLIENT ENTERPRISES)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    legal_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    business_type VARCHAR(50) NOT NULL,
    business_pan VARCHAR(15),
    cin_llpin VARCHAR(30),
    state VARCHAR(100) NOT NULL,
    address_line_1 TEXT,
    address_line_2 TEXT,
    city VARCHAR(100),
    pincode VARCHAR(10),
    business_activity TEXT,
    bank_account_no VARCHAR(35),
    bank_ifsc VARCHAR(15),
    bank_name VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_businesses_user ON public.businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_pan ON public.businesses(business_pan);

-- ============================================================================
-- 5. SERVICES CATALOG TABLE (40+ STATUTORY & TAX SERVICES)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    badge VARCHAR(50),
    base_fee NUMERIC(10,2) NOT NULL DEFAULT 1499.00,
    govt_fee NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    gst_rate NUMERIC(5,2) NOT NULL DEFAULT 18.00,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    keywords JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);

-- ============================================================================
-- 6. FIELD DEFINITIONS TABLE (DYNAMIC ENGINE SCHEMA)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.field_definitions (
    field_id VARCHAR(50) PRIMARY KEY,
    field_key VARCHAR(50) NOT NULL,
    label VARCHAR(255) NOT NULL,
    section VARCHAR(50) NOT NULL,
    field_type VARCHAR(30) NOT NULL,
    required BOOLEAN DEFAULT TRUE,
    validation_rule TEXT,
    description TEXT,
    source VARCHAR(30) DEFAULT 'USER_INPUT',
    is_sensitive BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. SERVICE APPLICATIONS TABLE (FILING DOSSIER & LIFECYCLE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.service_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(50) UNIQUE NOT NULL,
    service_id VARCHAR(50) NOT NULL DEFAULT 'gst-registration',
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
    business_type VARCHAR(50) NOT NULL,
    state VARCHAR(100) NOT NULL,
    current_step INTEGER NOT NULL DEFAULT 1,
    customer_status VARCHAR(50) NOT NULL DEFAULT 'Profile',
    internal_status VARCHAR(50) NOT NULL DEFAULT 'DRAFT'
        CHECK (internal_status IN ('DRAFT', 'AI_PRECHECK', 'CA_REVIEW', 'APPLICATION_PREPARATION', 'APPLICATION_SUBMITTED', 'GOVERNMENT_PROCESSING', 'CLARIFICATION_REQUIRED', 'COMPLETED', 'REJECTED')),
    fields_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    ai_precheck_summary JSONB DEFAULT '{}'::jsonb,
    assigned_ca_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    arn VARCHAR(40),
    arn_generated_at TIMESTAMPTZ,
    gstin VARCHAR(25),
    certificate_url TEXT,
    payment_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_user ON public.service_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_ca ON public.service_applications(assigned_ca_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.service_applications(internal_status);
CREATE INDEX IF NOT EXISTS idx_applications_appnum ON public.service_applications(application_number);

-- ============================================================================
-- 8. DOCUMENTS TABLE (VAULT & AI OCR AUDIT)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.service_applications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    document_type VARCHAR(60) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100),
    file_size BIGINT,
    status VARCHAR(40) NOT NULL DEFAULT 'UPLOADED'
        CHECK (status IN ('UPLOADED', 'AI_CHECKED', 'FLAGGED_MISMATCH', 'CA_APPROVED', 'CA_REJECTED')),
    document_classification VARCHAR(60),
    ocr_extracted_data JSONB DEFAULT '{}'::jsonb,
    ai_confidence NUMERIC(4,3) DEFAULT 0.950,
    mismatch_flags JSONB DEFAULT '[]'::jsonb,
    ca_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_app ON public.documents(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_user ON public.documents(user_id);

-- ============================================================================
-- 9. ORDERS & BILLING TABLE (TRANSACTION & AUTOPAY MANDATES)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id VARCHAR(60) PRIMARY KEY,
    order_number VARCHAR(70) UNIQUE NOT NULL,
    application_id UUID REFERENCES public.service_applications(id) ON DELETE SET NULL,
    application_number VARCHAR(50),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    service_name VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    gst_amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    status VARCHAR(40) NOT NULL DEFAULT 'CREATED'
        CHECK (status IN ('CREATED', 'PAID', 'ACTIVE_AUTOPAY', 'FAILED', 'REFUNDED')),
    billing_cycle VARCHAR(30) DEFAULT 'One-Time',
    payment_mode VARCHAR(40),
    upi_id VARCHAR(100),
    transaction_id VARCHAR(100),
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    customer_name VARCHAR(255),
    customer_phone VARCHAR(25),
    customer_pan VARCHAR(15),
    customer_email VARCHAR(255),
    state VARCHAR(100),
    business_type VARCHAR(50),
    paid_amount NUMERIC(10,2),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_app ON public.orders(application_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- ============================================================================
-- 10. CASE EVENTS TABLE (APPLICATION LIFECYCLE TIMELINE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.case_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.service_applications(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    actor_role VARCHAR(30) NOT NULL CHECK (actor_role IN ('CUSTOMER', 'SYSTEM', 'AI', 'CA', 'GOVERNMENT')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_events_app ON public.case_events(application_id);

-- ============================================================================
-- 11. SUPPORT TICKETS & CA CALLBACKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    application_id UUID REFERENCES public.service_applications(id) ON DELETE SET NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('PHONE_CALLBACK', 'QUERY', 'COMPLAINT')),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    phone VARCHAR(25),
    preferred_time VARCHAR(100),
    assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON public.support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);

-- ============================================================================
-- 12. AUDIT LOGS TABLE (SECURITY & AUDIT TRAIL)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    actor_role VARCHAR(20) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(60) NOT NULL,
    resource_id VARCHAR(100),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);

-- ============================================================================
-- 13. AUTO-UPDATE TIMESTAMP FUNCTION & TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_customer_profiles_updated_at ON public.customer_profiles;
CREATE TRIGGER trg_customer_profiles_updated_at BEFORE UPDATE ON public.customer_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_businesses_updated_at ON public.businesses;
CREATE TRIGGER trg_businesses_updated_at BEFORE UPDATE ON public.businesses
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_service_applications_updated_at ON public.service_applications;
CREATE TRIGGER trg_service_applications_updated_at BEFORE UPDATE ON public.service_applications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_documents_updated_at ON public.documents;
CREATE TRIGGER trg_documents_updated_at BEFORE UPDATE ON public.documents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON public.orders;
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_support_tickets_updated_at ON public.support_tickets;
CREATE TRIGGER trg_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 14. ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Backend Service Role Full Access
DROP POLICY IF EXISTS "Service Role Full Access" ON public.users;
CREATE POLICY "Service Role Full Access" ON public.users FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service Role Full Access" ON public.customer_profiles;
CREATE POLICY "Service Role Full Access" ON public.customer_profiles FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service Role Full Access" ON public.service_applications;
CREATE POLICY "Service Role Full Access" ON public.service_applications FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service Role Full Access" ON public.documents;
CREATE POLICY "Service Role Full Access" ON public.documents FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service Role Full Access" ON public.orders;
CREATE POLICY "Service Role Full Access" ON public.orders FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Customer Self Access
DROP POLICY IF EXISTS "Users access own account" ON public.users;
CREATE POLICY "Users access own account" ON public.users FOR SELECT USING (id = auth.uid());

DROP POLICY IF EXISTS "Customers view own profile" ON public.customer_profiles;
CREATE POLICY "Customers view own profile" ON public.customer_profiles FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Customers view own applications" ON public.service_applications;
CREATE POLICY "Customers view own applications" ON public.service_applications FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Customers view own documents" ON public.documents;
CREATE POLICY "Customers view own documents" ON public.documents FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Customers view own orders" ON public.orders;
CREATE POLICY "Customers view own orders" ON public.orders FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Customers view timeline events" ON public.case_events;
CREATE POLICY "Customers view timeline events" ON public.case_events FOR SELECT USING (
    application_id IN (SELECT id FROM public.service_applications WHERE user_id = auth.uid())
);

-- Public Read Access for Services Catalog & Field Engine Definitions
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public view services" ON public.services;
CREATE POLICY "Public view services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public view field definitions" ON public.field_definitions;
CREATE POLICY "Public view field definitions" ON public.field_definitions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role full access services" ON public.services;
CREATE POLICY "Service role full access services" ON public.services FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service role full access field definitions" ON public.field_definitions;
CREATE POLICY "Service role full access field definitions" ON public.field_definitions FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service role full access audit logs" ON public.audit_logs;
CREATE POLICY "Service role full access audit logs" ON public.audit_logs FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
