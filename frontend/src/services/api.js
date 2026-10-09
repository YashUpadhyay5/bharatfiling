const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('bharatfiling_token') || localStorage.getItem('taxveda_token');
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options = {}, retries = 2, delay = 800) => {
  const method = (options.method || 'GET').toUpperCase();
  const isRetryable = method === 'GET' || method === 'HEAD' || url.includes('/auth/login') || url.includes('/auth/me');

  try {
    const res = await fetch(url, options);
    // Render free-tier cold-start returns 502/503/504 while waking up
    if (isRetryable && (res.status === 502 || res.status === 503 || res.status === 504) && retries > 0) {
      await wait(delay);
      return fetchWithRetry(url, options, retries - 1, delay * 1.5);
    }
    return res;
  } catch (err) {
    if (isRetryable && retries > 0) {
      await wait(delay);
      return fetchWithRetry(url, options, retries - 1, delay * 1.5);
    }
    throw err;
  }
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const api = {
  // Auth
  login: async (identifier, password) => {
    const res = await fetchWithRetry(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
    return handleResponse(res);
  },

  register: async (userData) => {
    const res = await fetchWithRetry(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  verifyOtp: async (phone, otp) => {
    const res = await fetchWithRetry(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetchWithRetry(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Master Customer Profile
  getProfile: async () => {
    const res = await fetchWithRetry(`${API_BASE}/profile`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  updateProfile: async (profileData) => {
    const res = await fetchWithRetry(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(res);
  },

  // Businesses
  getBusinesses: async () => {
    const res = await fetchWithRetry(`${API_BASE}/businesses`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  createBusiness: async (businessData) => {
    const res = await fetchWithRetry(`${API_BASE}/businesses`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(businessData),
    });
    return handleResponse(res);
  },

  // Requirements & Field Engine
  getFieldDefinitions: async () => {
    const res = await fetchWithRetry(`${API_BASE}/fields/definitions`);
    return handleResponse(res);
  },

  getRequirements: async (businessType, state) => {
    const query = state ? `?state=${encodeURIComponent(state)}` : '';
    const res = await fetchWithRetry(`${API_BASE}/fields/requirements/${encodeURIComponent(businessType)}${query}`);
    return handleResponse(res);
  },

  // Dynamic Services Catalog & Pricing
  getServices: async (category = '') => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetchWithRetry(`${API_BASE}/services${query}`);
    return handleResponse(res);
  },

  getService: async (identifier) => {
    const res = await fetchWithRetry(`${API_BASE}/services/${encodeURIComponent(identifier)}`);
    return handleResponse(res);
  },

  // GST Applications
  getApplications: async () => {
    const res = await fetchWithRetry(`${API_BASE}/gst/applications`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getApplication: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/applications/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  createApplication: async (payload) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/applications`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  saveStep: async (id, stepPayload) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/applications/${id}/step`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(stepPayload),
    });
    return handleResponse(res);
  },

  runPrecheck: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/applications/${id}/precheck`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getTimeline: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/applications/${id}/timeline`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Documents
  uploadDocument: async (applicationId, documentType, file) => {
    const formData = new FormData();
    formData.append('application_id', applicationId);
    formData.append('document_type', documentType);
    formData.append('file', file);

    const res = await fetchWithRetry(`${API_BASE}/documents/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse(res);
  },

  getDocuments: async (appId) => {
    const res = await fetchWithRetry(`${API_BASE}/documents/application/${appId}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  deleteDocument: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/documents/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  updateDocStatus: async (id, status, caNotes) => {
    const res = await fetchWithRetry(`${API_BASE}/documents/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status, ca_notes: caNotes }),
    });
    return handleResponse(res);
  },

  // Payments
  getPricing: async (businessType) => {
    const res = await fetchWithRetry(`${API_BASE}/payments/pricing/${encodeURIComponent(businessType)}`);
    return handleResponse(res);
  },

  createPaymentOrder: async (applicationId) => {
    const res = await fetchWithRetry(`${API_BASE}/payments/create-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ application_id: applicationId }),
    });
    return handleResponse(res);
  },

  verifyPayment: async (verificationPayload) => {
    const res = await fetchWithRetry(`${API_BASE}/payments/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(verificationPayload),
    });
    return handleResponse(res);
  },

  // Onboarding Lead & Checkout
  createOnboardingQuote: async (leadData) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/onboarding-quote`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(leadData),
    });
    return handleResponse(res);
  },

  getCheckoutOrder: async (orderId) => {
    const res = await fetchWithRetry(`${API_BASE}/gst/checkout-order/${orderId}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  verifyUpiPayment: async (payload) => {
    const res = await fetchWithRetry(`${API_BASE}/payments/verify-upi`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // CA Portal
  getCACases: async () => {
    const res = await fetchWithRetry(`${API_BASE}/ca/cases`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getCACaseDetails: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/ca/cases/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  executeCAAction: async (id, actionPayload) => {
    const res = await fetchWithRetry(`${API_BASE}/ca/cases/${id}/action`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(actionPayload),
    });
    return handleResponse(res);
  },

  // Omnichannel Support
  askAIAssistant: async (query, currentStep, businessType, applicationId) => {
    const res = await fetchWithRetry(`${API_BASE}/support/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        current_step: currentStep,
        business_type: businessType,
        application_id: applicationId,
      }),
    });
    return handleResponse(res);
  },

  requestCallback: async (callbackPayload) => {
    const res = await fetchWithRetry(`${API_BASE}/support/callback`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(callbackPayload),
    });
    return handleResponse(res);
  },

  createSupportTicket: async (ticketPayload) => {
    const res = await fetchWithRetry(`${API_BASE}/support/ticket`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ticketPayload),
    });
    return handleResponse(res);
  },

  getSupportTickets: async () => {
    const res = await fetchWithRetry(`${API_BASE}/support/tickets`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Admin
  getAdminAnalytics: async () => {
    const res = await fetchWithRetry(`${API_BASE}/admin/analytics`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getAdminUsers: async () => {
    const res = await fetchWithRetry(`${API_BASE}/admin/users`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getAdminAuditLogs: async () => {
    const res = await fetchWithRetry(`${API_BASE}/admin/audit-logs`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Notifications
  getNotifications: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/notifications${query ? `?${query}` : ''}`;
    const res = await fetchWithRetry(url, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getUnreadNotificationCount: async () => {
    const res = await fetchWithRetry(`${API_BASE}/notifications/unread-count`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  markNotificationRead: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  markAllNotificationsRead: async () => {
    const res = await fetchWithRetry(`${API_BASE}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  deleteNotification: async (id) => {
    const res = await fetchWithRetry(`${API_BASE}/notifications/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};
