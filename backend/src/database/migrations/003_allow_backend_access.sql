-- ============================================================================
-- BHARATFILING MIGRATION: 003_allow_backend_access.sql
-- Enables server queries from the Node.js backend to users and customer profiles
-- Run in Supabase SQL Editor
-- ============================================================================

-- 1. USERS TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server auth select" ON public.users;
CREATE POLICY "Allow server auth select" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow server auth insert" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow server auth insert" ON public.users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow server auth update" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow server auth update" ON public.users FOR UPDATE USING (true);

-- 2. CUSTOMER PROFILES SERVER ACCESS
DROP POLICY IF EXISTS "Allow server profile select" ON public.customer_profiles;
CREATE POLICY "Allow server profile select" ON public.customer_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow server profile insert" ON public.customer_profiles;
CREATE POLICY "Allow server profile insert" ON public.customer_profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow server profile update" ON public.customer_profiles;
CREATE POLICY "Allow server profile update" ON public.customer_profiles FOR UPDATE USING (true);

-- 3. BUSINESSES TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server businesses all" ON public.businesses;
CREATE POLICY "Allow server businesses all" ON public.businesses FOR ALL USING (true);

-- 4. SERVICE APPLICATIONS TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server applications all" ON public.service_applications;
CREATE POLICY "Allow server applications all" ON public.service_applications FOR ALL USING (true);

-- 5. DOCUMENTS TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server documents all" ON public.documents;
CREATE POLICY "Allow server documents all" ON public.documents FOR ALL USING (true);

-- 6. ORDERS TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server orders all" ON public.orders;
CREATE POLICY "Allow server orders all" ON public.orders FOR ALL USING (true);

-- 7. CASE EVENTS TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server events all" ON public.case_events;
CREATE POLICY "Allow server events all" ON public.case_events FOR ALL USING (true);

-- 8. SUPPORT TICKETS TABLE SERVER ACCESS
DROP POLICY IF EXISTS "Allow server tickets all" ON public.support_tickets;
CREATE POLICY "Allow server tickets all" ON public.support_tickets FOR ALL USING (true);
