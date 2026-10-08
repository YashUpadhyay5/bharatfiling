import { supabase } from '../database/supabaseClient.js';

export class CaseEventModel {
  static async findByApplicationId(appId) {
    const { data, error } = await supabase
      .from('case_events')
      .select('*')
      .eq('application_id', appId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  static async create(eventData) {
    const { data, error } = await supabase
      .from('case_events')
      .insert({
        application_id: eventData.application_id,
        title: eventData.title,
        description: eventData.description,
        actor_role: eventData.actor_role || 'SYSTEM',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
