import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://ruekrneqflodgdgnssqg.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Jnu80t86EDgaiCObklp9Zw_ng22liJe';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
