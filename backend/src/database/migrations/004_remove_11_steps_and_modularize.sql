-- ============================================================================
-- BHARATFILING MIGRATION 004: REMOVE 11 STEPS & STREAMLINE APPLICATION LIFECYCLE
-- ============================================================================

-- 1. Update internal_status check constraint to production modular stages
ALTER TABLE public.service_applications 
  DROP CONSTRAINT IF EXISTS service_applications_internal_status_check;

ALTER TABLE public.service_applications 
  ADD CONSTRAINT service_applications_internal_status_check 
  CHECK (internal_status IN (
    'DRAFT',                -- Step 1 (Applicant) & Step 2 (Jurisdiction) lead
    'PAYMENT_PENDING',      -- Step 3 (Checkout reached, awaiting UPI)
    'PAYMENT_CONFIRMED',    -- UPI AutoPay / QR payment confirmed
    'DOCUMENTS_PENDING',    -- Awaiting statutory document uploads (Electricity Bill, ID)
    'CA_REVIEW',            -- Handed off to Chartered Accountant
    'ARN_GENERATED',        -- Filed on GST Common Portal
    'COMPLETED',            -- Form REG-06 GSTIN Certificate Allotted
    'REJECTED'              -- Disapproved by Tax Officer
  ));

-- 2. Clean up current_step default and values (No 11 steps!)
ALTER TABLE public.service_applications 
  ALTER COLUMN current_step SET DEFAULT 1;

UPDATE public.service_applications
SET current_step = 1
WHERE current_step > 4;

-- 3. Ensure statutory required documents view exists for fast querying
CREATE OR REPLACE VIEW public.vw_gst_dossier_summary AS
SELECT 
    sa.id AS application_id,
    sa.application_number,
    sa.user_id,
    sa.business_type,
    sa.state,
    sa.customer_status,
    sa.internal_status,
    sa.payment_completed,
    sa.created_at,
    COUNT(doc.id) AS uploaded_documents_count
FROM public.service_applications sa
LEFT JOIN public.documents doc ON sa.id = doc.application_id
GROUP BY sa.id, sa.application_number, sa.user_id, sa.business_type, sa.state, sa.customer_status, sa.internal_status, sa.payment_completed, sa.created_at;
