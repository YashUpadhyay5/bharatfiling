import { supabase } from '../database/supabaseClient.js';

export class DocumentModel {
  static async findByApplicationId(appId) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('application_id', appId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  static async findById(id) {
    const { data, error } = await supabase.from('documents').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async create(docData) {
    const { data, error } = await supabase.from('documents').insert(docData).select().single();
    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('documents').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}
