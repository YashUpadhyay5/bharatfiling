import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://ruekrneqflodgdgnssqg.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Jnu80t86EDgaiCObklp9Zw_ng22liJe';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials missing in environment variables.');
}

let isSupabaseHealthy = null;
let lastCheckTime = 0;

if (supabaseUrl && supabaseUrl.includes('.supabase.co')) {
  try {
    fetch(`${supabaseUrl}/rest/v1/`, { method: 'HEAD', signal: AbortSignal.timeout(1500) })
      .then((r) => {
        isSupabaseHealthy = r.ok;
      })
      .catch(() => {
        isSupabaseHealthy = false;
        lastCheckTime = Date.now();
      });
  } catch {
    isSupabaseHealthy = false;
    lastCheckTime = Date.now();
  }
}

export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseKey) return false;
  // If marked unhealthy within the last 60 seconds, skip remote calls to avoid DNS stalls
  if (isSupabaseHealthy === false && Date.now() - lastCheckTime < 60000) {
    return false;
  }
  return true;
};


export const markSupabaseUnhealthy = () => {
  isSupabaseHealthy = false;
  lastCheckTime = Date.now();
};

export const markSupabaseHealthy = () => {
  isSupabaseHealthy = true;
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

