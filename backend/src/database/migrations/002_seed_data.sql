-- ============================================================================
-- BHARATFILING SEED SCRIPT: 002_seed_data.sql
-- Execute in Supabase SQL Editor to seed Services, Fields, and Core Accounts
-- ============================================================================

-- 1. SEED SERVICES CATALOG
INSERT INTO public.services (id, title, slug, category, badge, base_fee, govt_fee, gst_rate, description, features, keywords, is_active)
VALUES
(
    'pvt-ltd-company',
    'Private Limited Company Incorporation',
    'company-registration',
    'INCORPORATION',
    'Startup Favorite',
    4999.00,
    1000.00,
    18.00,
    'Complete MCA SPICe+ filing, DIN, DSC, MOA, AOA, PAN, TAN & corporate bank account setup with dedicated CA assistance.',
    '["Name Approval (RUN)", "Digital Signature Certificate (DSC)", "Articles & Memorandum of Association", "Corporate Bank Account Opening"]'::jsonb,
    '["pvt ltd", "company", "incorporation", "private limited", "mca", "spice+", "startup"]'::jsonb,
    true
),
(
    'llp-registration',
    'Limited Liability Partnership (LLP)',
    'llp-registration',
    'INCORPORATION',
    'Low Compliance',
    3999.00,
    500.00,
    18.00,
    'LLP agreement drafting, designated partner DPIN, and statutory ROC registration for professional firms.',
    '["DPIN for 2 Partners", "Name Reservation (RUN-LLP)", "LLP Agreement Drafting", "Zero Audit until 40L Turnover"]'::jsonb,
    '["llp", "partnership", "limited liability", "firm", "partners", "agreement"]'::jsonb,
    true
),
(
    'opc-registration',
    'One Person Company (OPC)',
    'opc-registration',
    'INCORPORATION',
    'Solo Founders',
    4499.00,
    1000.00,
    18.00,
    'Ideal for solo entrepreneurs looking for corporate status, limited liability, and credibility.',
    '["1 Director & 1 Nominee", "DSC & DIN Allotment", "SPICe+ Incorporation", "PAN & TAN Generation"]'::jsonb,
    '["opc", "one person", "solo", "company", "founder"]'::jsonb,
    true
),
(
    'gst-registration',
    'GST Registration Online',
    'gst-registration',
    'GST',
    'Fast-Track',
    1499.00,
    0.00,
    18.00,
    'End-to-end registration with AI document OCR, Form REG-01 preparation, and dedicated CA filing across all 36 States & UTs.',
    '["Free Document AI Check", "Form REG-01 Preparation", "Notice REG-03 Clarifications Included", "REG-06 Certificate Allotment"]'::jsonb,
    '["gst", "gstin", "registration", "tax", "indirect tax", "reg-01", "arn"]'::jsonb,
    true
),
(
    'gst-return-filing',
    'Monthly GSTR-1 & GSTR-3B Filing',
    'gst-return',
    'GST',
    'Monthly Plan',
    799.00,
    0.00,
    18.00,
    'Monthly return filing with automated GSTR-2B input tax credit reconciliation and zero penalty guarantee.',
    '["Sales Invoices Reconciliation", "ITC Optimization via 2B", "GSTR-1 & 3B Submission", "Challan Payment Assistance"]'::jsonb,
    '["gstr-1", "gstr-3b", "returns", "gst return", "itc", "compliance"]'::jsonb,
    true
),
(
    'gst-annual-return',
    'GST Annual Return (GSTR-9 & 9C)',
    'gst-annual-return',
    'GST',
    'Annual Audit',
    2999.00,
    0.00,
    18.00,
    'Comprehensive annual compliance audit and reconciliation to avoid scrutiny notices.',
    '["Full Year Books vs GST Reconciliation", "GSTR-9 Form Preparation", "CA Audit Certification (9C)", "Demand Assessment"]'::jsonb,
    '["gstr-9", "gstr-9c", "annual return", "gst audit", "reconciliation"]'::jsonb,
    true
),
(
    'income-tax-filing',
    'Business & Professional ITR Filing',
    'income-tax',
    'INCOME_TAX',
    'Tax Season',
    999.00,
    0.00,
    18.00,
    'ITR-3, ITR-4 (Presumptive 44AD/ADA) filed with expert tax calculation and deduction optimization.',
    '["AIS & 26AS Reconciliation", "Capital Gains Computations", "Maximum Tax Deductions", "E-Verification Support"]'::jsonb,
    '["itr", "income tax", "tax return", "itr-3", "itr-4", "44ad", "audit"]'::jsonb,
    true
),
(
    'tds-quarterly-return',
    'TDS & TCS Quarterly Returns',
    'tds-return',
    'INCOME_TAX',
    'Statutory',
    1499.00,
    0.00,
    18.00,
    'Form 24Q, 26Q, and 27Q quarterly return preparation with Form 16/16A generation.',
    '["Challan Verification on TRACES", "FVU File Generation", "Form 16/16A Issuance", "Zero Default Notice Guarantee"]'::jsonb,
    '["tds", "tcs", "traces", "26q", "24q", "form 16"]'::jsonb,
    true
),
(
    'trademark-registration',
    'Trademark Registration Online',
    'trademark',
    'TRADEMARK',
    'Brand Protection',
    1999.00,
    4500.00,
    18.00,
    'Protect your brand name, logo, and slogan nationwide with IP attorney representation and class classification.',
    '["Free Trademark Search Report", "Class Selection (1 to 45)", "Form TM-A Filing", "Immediate Use of TM Symbol"]'::jsonb,
    '["trademark", "tm", "brand", "logo", "copyright", "ipr"]'::jsonb,
    true
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    base_fee = EXCLUDED.base_fee,
    govt_fee = EXCLUDED.govt_fee,
    description = EXCLUDED.description,
    features = EXCLUDED.features;

-- 2. SEED CORE ACCOUNTS (Password: Password@123 using standard bcrypt)
-- Password Hash for Password@123: $2a$10$w3U6U3L1u7j05Qj.y.q06uGzV3a3T/i9t5YfO8G3aG1ZtN9k7D5u. (from existing db)
INSERT INTO public.users (id, email, phone, password_hash, role, full_name, is_verified)
VALUES
(
    '00000000-0000-0000-0000-000000000001'::uuid,
    'admin@bharatfiling.com',
    '9876543210',
    '$2a$10$Q78l68H0uJ.fWb4Hq3N1/O63E3xKjB8M3vX1B9V2mN6P7l5Q0vW9y',
    'ADMIN',
    'BharatFiling Platform Admin',
    true
),
(
    '00000000-0000-0000-0000-000000000002'::uuid,
    'ca.sharma@bharatfiling.com',
    '9811223344',
    '$2a$10$Q78l68H0uJ.fWb4Hq3N1/O63E3xKjB8M3vX1B9V2mN6P7l5Q0vW9y',
    'CA',
    'CA Rajesh Sharma (FCA)',
    true
),
(
    '00000000-0000-0000-0000-000000000003'::uuid,
    'rahul.verma@example.com',
    '9876501234',
    '$2a$10$Q78l68H0uJ.fWb4Hq3N1/O63E3xKjB8M3vX1B9V2mN6P7l5Q0vW9y',
    'CUSTOMER',
    'Rahul Verma',
    true
)
ON CONFLICT (email) DO NOTHING;

-- 3. SEED MASTER CUSTOMER PROFILE
INSERT INTO public.customer_profiles (user_id, personal_info, identity_info, contact_info, address_info)
VALUES
(
    '00000000-0000-0000-0000-000000000003'::uuid,
    '{"full_name":"Rahul Verma","father_name":"Suresh Kumar Verma","dob":"1990-05-15","gender":"Male"}'::jsonb,
    '{"pan_number":"ABCDE1234F","pan_verified":true,"aadhaar_number":"987654321012","aadhaar_verified":true}'::jsonb,
    '{"mobile_number":"9876501234","mobile_verified":true,"email":"rahul.verma@example.com","email_verified":true}'::jsonb,
    '{"address_line_1":"Flat 402, Greenfield Heights","address_line_2":"MG Road, Indiranagar","city":"Bengaluru","state":"Karnataka","pincode":"560038"}'::jsonb
)
ON CONFLICT (user_id) DO NOTHING;

-- 4. SEED SAMPLE BUSINESS
INSERT INTO public.businesses (user_id, legal_name, trade_name, business_type, business_pan, state, address_line_1, address_line_2, city, pincode, business_activity, bank_account_no, bank_ifsc, bank_name)
VALUES
(
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Verma Tech Solutions',
    'Verma Cloud Services',
    'Proprietorship',
    'ABCDE1234F',
    'Karnataka',
    'Plot 12, Tech Park Avenue',
    'EPIP Zone, Whitefield',
    'Bengaluru',
    '560066',
    'IT and Software Consulting',
    '001234567890',
    'HDFC0001234',
    'HDFC Bank'
);
