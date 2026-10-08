import { supabase } from '../database/supabaseClient.js';

export class ServiceApplicationModel {
  static async findById(id) {
    const { data, error } = await supabase
      .from('service_applications')
      .select('*')
      .or(`id.eq.${id},application_number.eq.${id}`)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('service_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async findAll() {
    const { data, error } = await supabase
      .from('service_applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async findAssignedToCA(caId) {
    const { data, error } = await supabase
      .from('service_applications')
      .select('*')
      .or(`assigned_ca_id.eq.${caId},assigned_ca_id.is.null`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async create(appData) {
    const { data, error } = await supabase
      .from('service_applications')
      .insert({
        application_number: appData.application_number,
        service_id: appData.service_id || 'gst-registration',
        user_id: appData.user_id,
        business_id: appData.business_id || null,
        business_type: appData.business_type,
        state: appData.state,
        current_step: appData.current_step || 1,
        customer_status: appData.customer_status || 'Profile',
        internal_status: appData.internal_status || 'DRAFT',
        fields_data: appData.fields_data || {},
        ai_precheck_summary: appData.ai_precheck_summary || {},
        payment_completed: appData.payment_completed || false,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('service_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
