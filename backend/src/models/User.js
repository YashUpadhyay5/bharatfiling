import { supabase } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class UserModel {
  static async findById(id) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
      if (!error && data) return data;
    } catch {
      // Fall through to local fallback
    }
    return db.getUsers().find((u) => u.id === id) || null;
  }

  static async findByEmail(email) {
    const cleanEmail = email ? email.toLowerCase().trim() : '';
    try {
      const { data, error } = await supabase.from('users').select('*').eq('email', cleanEmail).maybeSingle();
      if (!error && data) return data;
    } catch {
      // Fall through to local fallback
    }
    return db.getUsers().find((u) => u.email && u.email.toLowerCase() === cleanEmail) || null;
  }

  static async findByPhone(phone) {
    const cleanPhone = phone ? phone.trim() : '';
    try {
      const { data, error } = await supabase.from('users').select('*').eq('phone', cleanPhone).maybeSingle();
      if (!error && data) return data;
    } catch {
      // Fall through to local fallback
    }
    return db.getUsers().find((u) => u.phone && u.phone.trim() === cleanPhone) || null;
  }

  static async findByIdentifier(identifier) {
    const clean = identifier ? identifier.trim() : '';
    if (clean.includes('@')) {
      return this.findByEmail(clean);
    }
    return this.findByPhone(clean);
  }

  static async findAll() {
    try {
      const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {
      // Fall through
    }
    return db.getUsers();
  }

  static async create(userData) {
    const cleanEmail = userData.email.toLowerCase().trim();
    const cleanPhone = userData.phone?.trim() || null;
    let created = null;

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: cleanEmail,
          phone: cleanPhone,
          password_hash: userData.password_hash,
          role: userData.role || 'CUSTOMER',
          full_name: userData.full_name,
          avatar_url: userData.avatar_url || null,
          is_verified: userData.is_verified || false,
          metadata: userData.metadata || {},
        })
        .select()
        .single();

      if (!error && data) {
        created = data;
      }
    } catch {
      // Fall through to local
    }

    if (!created) {
      created = {
        id: userData.id || `usr_${Date.now().toString(36)}`,
        email: cleanEmail,
        phone: cleanPhone,
        password_hash: userData.password_hash,
        role: userData.role || 'CUSTOMER',
        full_name: userData.full_name,
        avatar_url: userData.avatar_url || null,
        is_verified: userData.is_verified || false,
        metadata: userData.metadata || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    // Always synchronize local db
    const users = db.getUsers();
    if (!users.some((u) => u.id === created.id || u.email.toLowerCase() === cleanEmail)) {
      users.push(created);
      db.saveUsers(users);
    }

    return created;
  }

  static async update(id, updates) {
    let updated = null;
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (!error && data) {
        updated = data;
      }
    } catch {
      // Fall through
    }

    const users = db.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      db.saveUsers(users);
      if (!updated) updated = users[index];
    }

    return updated;
  }

  static async delete(id) {
    try {
      await supabase.from('users').delete().eq('id', id);
    } catch {
      // Fall through
    }
    const users = db.getUsers().filter((u) => u.id !== id);
    db.saveUsers(users);
    return true;
  }
}
