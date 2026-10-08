-- ============================================================================
-- BHARATFILING MIGRATION 004: 3-SCREEN MODULAR PIPELINE & ZERO REDUNDANT STEPS
-- ============================================================================

-- 1. Streamline internal_status to the clean 3-Screen lifecycle
ALTER TABLE public.service_applications 
  DROP CONSTRAINT IF EXISTS service_applications_internal_status_check;

ALTER TABLE public.service_applications 
  ADD CONSTRAINT service_applications_internal_status_check 
  CHECK (internal_status IN (
    'DRAFT',                    -- Screen 1 (Applicant) & Screen 2 (Jurisdiction Quote)
    'PAYMENT_PENDING',          -- Screen 3 (Checkout reached, awaiting UPI payment)
    'CA_REVIEW',                -- Payment confirmed -> Directly managed by Chartered Accountant
    'APPLICATION_PREPARATION',  -- CA drafting Form REG-01
    'ARN_GENERATED',            -- Filed on GST Common Portal
    'COMPLETED',                -- Form REG-06 GSTIN Certificate Allotted
    'REJECTED'                  -- Disapproved by Tax Officer
  ));

-- 2. Drop any legacy current_step constraints (Zero 11 steps!)
ALTER TABLE public.service_applications 
  ALTER COLUMN current_step SET DEFAULT 1;

UPDATE public.service_applications
SET current_step = 1;

-- 3. Drop any obsolete dossier summary views
DROP VIEW IF EXISTS public.vw_gst_dossier_summary;
