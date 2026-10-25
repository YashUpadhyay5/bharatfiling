import { supabase, isSupabaseConfigured, markSupabaseUnhealthy } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class BusinessModel {
  static async findByUserId(userId) {
    if (!userId) return [];
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getBusinesses().filter((b) => b.user_id === userId) || [];
  }

  static async findById(id) {
    if (!id) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('businesses').select('*').eq('id', id).maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getBusinesses().find((b) => b.id === id) || null;
  }

  static async create(bizData) {
    let created = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .insert({
            user_id: bizData.user_id,
            legal_name: bizData.legal_name,
            trade_name: bizData.trade_name || bizData.legal_name,
            business_type: bizData.business_type,
            business_pan: bizData.business_pan || null,
            cin_llpin: bizData.cin_llpin || null,
            state: bizData.state,
            address_line_1: bizData.address_line_1 || null,
            address_line_2: bizData.address_line_2 || null,
            city: bizData.city || null,
            pincode: bizData.pincode || null,
            business_activity: bizData.business_activity || null,
            bank_account_no: bizData.bank_account_no || null,
            bank_ifsc: bizData.bank_ifsc || null,
            bank_name: bizData.bank_name || null,
          })
          .select()
          .single();

        if (!error && data) {
          created = data;
        } else if (error) {
          markSupabaseUnhealthy();
        }
      } catch {
        markSupabaseUnhealthy();
      }
    }

    if (!created) {
      created = {
        id: bizData.id || `biz_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        user_id: bizData.user_id,
        legal_name: bizData.legal_name,
        trade_name: bizData.trade_name || bizData.legal_name,
        business_type: bizData.business_type,
        business_pan: bizData.business_pan || null,
        cin_llpin: bizData.cin_llpin || null,
        state: bizData.state,
        address_line_1: bizData.address_line_1 || null,
        address_line_2: bizData.address_line_2 || null,
        city: bizData.city || null,
        pincode: bizData.pincode || null,
        business_activity: bizData.business_activity || null,
        bank_account_no: bizData.bank_account_no || null,
        bank_ifsc: bizData.bank_ifsc || null,
        bank_name: bizData.bank_name || null,
        created_at: new Date().toISOString(),
      };
    }

    const businesses = db.getBusinesses();
    businesses.push(created);
    db.saveBusinesses(businesses);

    return created;
  }
}
