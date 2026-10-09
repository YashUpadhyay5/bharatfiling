import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_FILE_PATH = fs.existsSync(path.resolve(process.cwd(), 'backend/data'))
  ? path.resolve(process.cwd(), 'backend/data/db.json')
  : path.resolve(process.cwd(), 'data/db.json');

class DatabaseStore {
  constructor() {
    this.data = {
      users: [],
      customer_profiles: [],
      businesses: [],
      field_definitions: [],
      gst_applications: [],
      documents: [],
      orders: [],
      case_events: [],
      support_tickets: [],
      audit_logs: [],
      notifications: [],
    };
    this.init();
  }

  init() {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      try {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        this.data = JSON.parse(raw);
        this.data.users = this.data.users || [];
        this.data.customer_profiles = this.data.customer_profiles || [];
        this.data.businesses = this.data.businesses || [];
        this.data.field_definitions = this.data.field_definitions || [];
        this.data.gst_applications = this.data.gst_applications || [];
        this.data.documents = this.data.documents || [];
        this.data.orders = this.data.orders || [];
        this.data.case_events = this.data.case_events || [];
        this.data.support_tickets = this.data.support_tickets || [];
        this.data.audit_logs = this.data.audit_logs || [];
        this.data.notifications = this.data.notifications || [];
      } catch (err) {
        console.error('Failed to parse database file, re-seeding:', err);
        this.seedInitialData();
      }
    } else {
      this.seedInitialData();
    }
  }

  persist() {
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  seedInitialData() {
    const salt = bcrypt.genSaltSync(10);
    const demoPasswordHash = bcrypt.hashSync('Password@123', salt);

    // 1. Seed Users (Admin, CA, Customer)
    const adminUser = {
      id: 'usr_admin_001',
      email: 'admin@taxveda.com',
      phone: '9876543210',
      password_hash: demoPasswordHash,
      role: 'ADMIN',
      full_name: 'BharatFiling Platform Admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const caUser = {
      id: 'usr_ca_001',
      email: 'ca.sharma@taxveda.com',
      phone: '9811223344',
      password_hash: demoPasswordHash,
      role: 'CA',
      full_name: 'CA Rajesh Sharma (FCA)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const customerUser = {
      id: 'usr_cust_001',
      email: 'rahul.verma@example.com',
      phone: '9876501234',
      password_hash: demoPasswordHash,
      role: 'CUSTOMER',
      full_name: 'Rahul Verma',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.data.users = [adminUser, caUser, customerUser];

    // 2. Seed Master Profile for sample customer
    const customerProfile = {
      id: 'prof_cust_001',
      user_id: 'usr_cust_001',
      personal_info: {
        full_name: 'Rahul Verma',
        father_name: 'Suresh Kumar Verma',
        dob: '1990-05-15',
        gender: 'Male',
      },
      identity_info: {
        pan_number: 'ABCDE1234F',
        pan_verified: true,
        aadhaar_number: '987654321012',
        aadhaar_verified: true,
      },
      contact_info: {
        mobile_number: '9876501234',
        mobile_verified: true,
        email: 'rahul.verma@example.com',
        email_verified: true,
      },
      address_info: {
        address_line_1: 'Flat 402, Greenfield Heights',
        address_line_2: 'MG Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.customer_profiles = [customerProfile];

    // 3. Seed Sample Business
    const sampleBusiness = {
      id: 'biz_001',
      user_id: 'usr_cust_001',
      legal_name: 'Verma Tech Solutions',
      trade_name: 'Verma Cloud Services',
      business_type: 'Proprietorship',
      business_pan: 'ABCDE1234F',
      state: 'Karnataka',
      address_line_1: 'Plot 12, Tech Park Avenue',
      address_line_2: 'EPIP Zone, Whitefield',
      city: 'Bengaluru',
      pincode: '560066',
      business_activity: 'IT and Software Consulting',
      bank_account_no: '001234567890',
      bank_ifsc: 'HDFC0001234',
      bank_name: 'HDFC Bank',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.businesses = [sampleBusiness];

    // 4. Seed Standard Master Field Definitions
    this.data.field_definitions = [
      { field_id: 'CUSTOMER_NAME', field_key: 'full_name', label: 'Full Name (as per PAN)', section: 'personal_info', field_type: 'text', required: true, description: 'Legal name printed on the Income Tax PAN card', source: 'MASTER_PROFILE' },
      { field_id: 'FATHER_NAME', field_key: 'father_name', label: "Father's Name", section: 'personal_info', field_type: 'text', required: true, description: "Father's name as recorded in official identity proof", source: 'MASTER_PROFILE' },
      { field_id: 'DATE_OF_BIRTH', field_key: 'dob', label: 'Date of Birth', section: 'personal_info', field_type: 'date', required: true, description: 'Date of birth in YYYY-MM-DD format', source: 'MASTER_PROFILE' },
      { field_id: 'PAN_NUMBER', field_key: 'pan_number', label: 'PAN Number', section: 'identity', field_type: 'text', required: true, validation_rule: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$', description: '10-digit Permanent Account Number issued by Income Tax Department', source: 'MASTER_PROFILE', is_sensitive: true },
      { field_id: 'AADHAAR_NUMBER', field_key: 'aadhaar_number', label: 'Aadhaar Number', section: 'identity', field_type: 'text', required: true, validation_rule: '^[0-9]{12}$', description: '12-digit Unique Identification Number', source: 'MASTER_PROFILE', is_sensitive: true },
      { field_id: 'MOBILE_NUMBER', field_key: 'mobile_number', label: 'Mobile Number', section: 'contact', field_type: 'tel', required: true, validation_rule: '^[6-9][0-9]{9}$', description: 'Aadhaar and bank linked primary mobile number for OTP', source: 'MASTER_PROFILE' },
      { field_id: 'EMAIL', field_key: 'email', label: 'Email Address', section: 'contact', field_type: 'email', required: true, description: 'Official email address for GST communications and notice delivery', source: 'MASTER_PROFILE' },
      { field_id: 'LEGAL_NAME', field_key: 'legal_name', label: 'Legal Name of Business', section: 'business', field_type: 'text', required: true, description: 'Exact legal name under which business is registered', source: 'USER_INPUT' },
      { field_id: 'TRADE_NAME', field_key: 'trade_name', label: 'Trade Name / Brand Name', section: 'business', field_type: 'text', required: false, description: 'Publicly recognized business or store name (if different from legal name)', source: 'USER_INPUT' },
      { field_id: 'BUSINESS_TYPE', field_key: 'business_type', label: 'Constitution of Business', section: 'business', field_type: 'select', required: true, description: 'Entity structure (Proprietorship, Partnership, LLP, Company, etc.)', source: 'USER_INPUT' },
      { field_id: 'PRINCIPAL_ADDRESS_1', field_key: 'address_line_1', label: 'Principal Place of Business - Address', section: 'address', field_type: 'text', required: true, description: 'Door/Flat/Building number and street name', source: 'USER_INPUT' },
      { field_id: 'CITY', field_key: 'city', label: 'City / District', section: 'address', field_type: 'text', required: true, description: 'City or municipal corporation area', source: 'USER_INPUT' },
      { field_id: 'STATE', field_key: 'state', label: 'State / Union Territory', section: 'address', field_type: 'select', required: true, description: 'State jurisdiction where GST registration is sought', source: 'USER_INPUT' },
      { field_id: 'PINCODE', field_key: 'pincode', label: 'PIN Code', section: 'address', field_type: 'text', required: true, validation_rule: '^[1-9][0-9]{5}$', description: '6-digit Postal Index Number', source: 'USER_INPUT' },
      { field_id: 'BANK_ACCOUNT_NO', field_key: 'bank_account_no', label: 'Bank Account Number', section: 'bank', field_type: 'text', required: true, description: 'Primary business operating bank account number', source: 'USER_INPUT', is_sensitive: true },
      { field_id: 'BANK_IFSC', field_key: 'bank_ifsc', label: 'Bank IFSC Code', section: 'bank', field_type: 'text', required: true, validation_rule: '^[A-Z]{4}0[A-Z0-9]{6}$', description: '11-character Indian Financial System Code', source: 'USER_INPUT' },
    ];

    // 5. Seed Initial Demo GST Application in CA Review
    const sampleApp = {
      id: 'app_gst_001',
      application_number: 'GST-2026-000001',
      user_id: 'usr_cust_001',
      business_id: 'biz_001',
      business_type: 'Proprietorship',
      state: 'Karnataka',
      current_step: 10,
      customer_status: 'CA Review',
      internal_status: 'CA_REVIEW',
      fields_data: {
        legal_name: 'Verma Tech Solutions',
        trade_name: 'Verma Cloud Services',
        business_type: 'Proprietorship',
        pan_number: 'ABCDE1234F',
        aadhaar_number: '987654321012',
        applicant_name: 'Rahul Verma',
        father_name: 'Suresh Kumar Verma',
        dob: '1990-05-15',
        mobile_number: '9876501234',
        email: 'rahul.verma@example.com',
        state: 'Karnataka',
        address_line_1: 'Plot 12, Tech Park Avenue',
        city: 'Bengaluru',
        pincode: '560066',
        business_activity: 'IT Consulting & Software Publishing',
        hsn_sac_codes: ['998313', '998314'],
        bank_account_no: '001234567890',
        bank_ifsc: 'HDFC0001234',
        bank_name: 'HDFC Bank',
      },
      ai_precheck_summary: {
        completed_fields: 16,
        total_required_fields: 16,
        uploaded_docs: 3,
        required_docs: 3,
        mismatches: [],
        ready_for_review: true,
      },
      assigned_ca_id: 'usr_ca_001',
      payment_completed: true,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.gst_applications = [sampleApp];

    // 6. Seed Case Events
    this.data.case_events = [
      {
        id: 'evt_001',
        application_id: 'app_gst_001',
        title: 'GST Application Draft Created',
        description: 'Customer Rahul Verma initiated online GST registration for Proprietorship.',
        actor_role: 'CUSTOMER',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'evt_002',
        application_id: 'app_gst_001',
        title: 'Master Profile Fields Prefilled',
        description: 'Verified PAN ABCDE1234F and Aadhaar prefilled automatically from Master Customer Profile.',
        actor_role: 'SYSTEM',
        created_at: new Date(Date.now() - 86400000 * 2 + 300000).toISOString(),
      },
      {
        id: 'evt_003',
        application_id: 'app_gst_001',
        title: 'Documents Uploaded & AI Checked',
        description: 'PAN Card, Aadhaar, and Electricity Bill processed with 98% AI confidence. No name mismatch detected.',
        actor_role: 'AI',
        created_at: new Date(Date.now() - 86400000 + 3600000).toISOString(),
      },
      {
        id: 'evt_004',
        application_id: 'app_gst_001',
        title: 'Professional Fee Payment Received',
        description: 'Payment of ₹1,769 verified via Razorpay gateway.',
        actor_role: 'CUSTOMER',
        created_at: new Date(Date.now() - 86400000 + 7200000).toISOString(),
      },
      {
        id: 'evt_005',
        application_id: 'app_gst_001',
        title: 'Assigned to Chartered Accountant',
        description: 'Case assigned to CA Rajesh Sharma (FCA) for statutory verification and REG-01 preparation.',
        actor_role: 'CA',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
    ];

    // 7. Seed Initial Order
    this.data.orders = [
      {
        id: 'ord_001',
        application_id: 'app_gst_001',
        user_id: 'usr_cust_001',
        amount: 1769,
        currency: 'INR',
        service_name: 'GST Registration - Proprietorship (AI + CA Plan)',
        status: 'PAID',
        razorpay_order_id: 'order_TV2026_demo_01',
        razorpay_payment_id: 'pay_TV2026_demo_9876',
        created_at: new Date(Date.now() - 86400000 + 7200000).toISOString(),
        updated_at: new Date(Date.now() - 86400000 + 7200000).toISOString(),
      },
    ];

    this.persist();
    console.log('✅ BharatFiling Database initialized with seed data.');
  }

  reload() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = { ...this.data, ...parsed };
      }
    } catch (err) {
      // Keep in-memory cache if file read fails momentarily
    }
  }

  // --- Getters & Mutators ---
  getUsers() { this.reload(); return this.data.users || []; }
  saveUsers(users) { this.data.users = users; this.persist(); }

  getProfiles() { this.reload(); return this.data.customer_profiles || []; }
  saveProfiles(profiles) { this.data.customer_profiles = profiles; this.persist(); }

  getBusinesses() { this.reload(); return this.data.businesses || []; }
  saveBusinesses(businesses) { this.data.businesses = businesses; this.persist(); }

  getFieldDefinitions() { return this.data.field_definitions || []; }

  getApplications() { this.reload(); return this.data.gst_applications || []; }
  saveApplications(apps) { this.data.gst_applications = apps; this.persist(); }

  getDocuments() { this.reload(); return this.data.documents || []; }
  saveDocuments(docs) { this.data.documents = docs; this.persist(); }

  getOrders() { this.reload(); return this.data.orders || []; }
  saveOrders(orders) { this.data.orders = orders; this.persist(); }

  getCaseEvents() { this.reload(); return this.data.case_events || []; }
  saveCaseEvents(events) { this.data.case_events = events; this.persist(); }

  getSupportTickets() { this.reload(); return this.data.support_tickets || []; }
  saveSupportTickets(tickets) { this.data.support_tickets = tickets; this.persist(); }

  getAuditLogs() { this.reload(); return this.data.audit_logs || []; }
  saveAuditLogs(logs) { this.data.audit_logs = logs; this.persist(); }

  getNotifications() { this.reload(); return this.data.notifications || []; }
  saveNotifications(notifications) { this.data.notifications = notifications; this.persist(); }
}

export const db = new DatabaseStore();
