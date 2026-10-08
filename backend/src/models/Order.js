import { supabase } from '../database/supabaseClient.js';

export class OrderModel {
  static async findById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .or(`id.eq.${id},order_number.eq.${id},razorpay_order_id.eq.${id}`)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async findAll() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async create(orderData) {
    const { data, error } = await supabase.from('orders').insert(orderData).select().single();
    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
