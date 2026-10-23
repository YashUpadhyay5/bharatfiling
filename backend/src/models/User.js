import { supabase, isSupabaseConfigured, markSupabaseUnhealthy } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class UserModel {
  static async findById(id) {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getUsers().find((u) => u.id === id) || null;
  }

  static async findByEmail(email) {
    const cleanEmail = email ? String(email).toLowerCase().trim() : '';
    if (!cleanEmail) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('email', cleanEmail).maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getUsers().find((u) => u.email && u.email.toLowerCase() === cleanEmail) || null;
  }

  static async findByPhone(phone) {
    const cleanPhone = phone ? String(phone).replace(/\D/g, '').slice(-10) : '';
    if (!cleanPhone) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('phone', cleanPhone).maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getUsers().find((u) => u.phone && String(u.phone).replace(/\D/g, '').slice(-10) === cleanPhone) || null;
  }

  static async findByIdentifier(identifier) {
    const clean = identifier ? String(identifier).trim() : '';
    if (!clean) return null;
    if (clean.includes('@')) {
      return this.findByEmail(clean);
    }
    return this.findByPhone(clean);
  }

  static async findAll() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getUsers();
  }

  static async create(userData) {
    const cleanEmail = userData.email ? String(userData.email).toLowerCase().trim() : null;
    const cleanPhone = userData.phone ? String(userData.phone).replace(/\D/g, '').slice(-10) : null;
    let created = null;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('users')
          .insert({
            email: cleanEmail,
            phone: cleanPhone,
            password_hash: userData.password_hash,
            role: userData.role || 'CUSTOMER',
            full_name: userData.full_name || 'Customer',
            avatar_url: userData.avatar_url || null,
            is_verified: userData.is_verified || false,
            metadata: userData.metadata || {},
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
        id: userData.id || `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        email: cleanEmail,
        phone: cleanPhone,
        password_hash: userData.password_hash,
        role: userData.role || 'CUSTOMER',
        full_name: userData.full_name || 'Customer',
        avatar_url: userData.avatar_url || null,
        is_verified: userData.is_verified || false,
        metadata: userData.metadata || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    // Always synchronize local db
    const users = db.getUsers();
    const existingIndex = users.findIndex(
      (u) =>
        u.id === created.id ||
        (cleanEmail && u.email && u.email.toLowerCase() === cleanEmail) ||
        (cleanPhone && u.phone && String(u.phone).replace(/\D/g, '').slice(-10) === cleanPhone)
    );
    if (existingIndex !== -1) {
      users[existingIndex] = { ...users[existingIndex], ...created };
    } else {
      users.push(created);
    }
    db.saveUsers(users);

    return created;
  }

  static async update(id, updates) {
    let updated = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('users')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          updated = data;
        } else if (error) {
          markSupabaseUnhealthy();
        }
      } catch {
        markSupabaseUnhealthy();
      }
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
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('users').delete().eq('id', id);
      } catch {
        markSupabaseUnhealthy();
      }
    }
    const users = db.getUsers().filter((u) => u.id !== id);
    db.saveUsers(users);
    return true;
  }
}

