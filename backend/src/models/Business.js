import { supabase } from '../database/supabaseClient.js';

export class BusinessModel {
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async findById(id) {
    const { data, error } = await supabase.from('businesses').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async create(bizData) {
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

    if (error) throw error;
    return data;
  }
}
