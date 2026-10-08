import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

console.log('Testing Supabase URL:', supabaseUrl);
console.log('Using Key:', supabaseKey ? supabaseKey.substring(0, 15) + '...' : 'NONE');

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.log('Query result error code:', error.code, 'message:', error.message, 'details:', error.details);
    } else {
      console.log('Successfully queried users table! Rows count:', data ? data.length : 0);
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Exception during query:', err);
  }
}

check();
