import { supabase } from '../database/supabaseClient.js';

export class UserModel {
  static async findById(id) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findByEmail(email) {
    const { data, error } = await supabase.from('users').select('*').eq('email', email.toLowerCase().trim()).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findByPhone(phone) {
    const { data, error } = await supabase.from('users').select('*').eq('phone', phone.trim()).maybeSingle();
    if (error) throw error;
    return data;
  }

  static async findByIdentifier(identifier) {
    const clean = identifier.trim();
    if (clean.includes('@')) {
      return this.findByEmail(clean);
    }
    return this.findByPhone(clean);
  }

  static async findAll() {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  static async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: userData.email.toLowerCase().trim(),
        phone: userData.phone?.trim() || null,
        password_hash: userData.password_hash,
        role: userData.role || 'CUSTOMER',
        full_name: userData.full_name,
        avatar_url: userData.avatar_url || null,
        is_verified: userData.is_verified || false,
        metadata: userData.metadata || {},
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}
