import { supabase } from '../database/supabaseClient.js';

export class CustomerProfileModel {
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('customer_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async create(profileData) {
    const { data, error } = await supabase
      .from('customer_profiles')
      .insert({
        user_id: profileData.user_id,
        personal_info: profileData.personal_info || {},
        identity_info: profileData.identity_info || {},
        contact_info: profileData.contact_info || {},
        address_info: profileData.address_info || {},
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateByUserId(userId, updates) {
    const { data, error } = await supabase
      .from('customer_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
