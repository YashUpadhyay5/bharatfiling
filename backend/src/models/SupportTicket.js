import { supabase } from '../database/supabaseClient.js';

export class SupportTicketModel {
  static async findAll() {
    const { data, error } = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async create(ticketData) {
    const { data, error } = await supabase.from('support_tickets').insert(ticketData).select().single();
    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('support_tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
