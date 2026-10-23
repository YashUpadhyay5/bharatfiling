import { supabase, isSupabaseConfigured, markSupabaseUnhealthy } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class CustomerProfileModel {
  static async findByUserId(userId) {
    if (!userId) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('customer_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getProfiles().find((p) => p.user_id === userId) || null;
  }

  static async create(profileData) {
    let created = null;
    if (isSupabaseConfigured()) {
      try {
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
        id: profileData.id || `prof_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        user_id: profileData.user_id,
        personal_info: profileData.personal_info || {},
        identity_info: profileData.identity_info || {},
        contact_info: profileData.contact_info || {},
        address_info: profileData.address_info || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    // Always synchronize local database
    const profiles = db.getProfiles();
    const existingIndex = profiles.findIndex((p) => p.user_id === profileData.user_id);
    if (existingIndex !== -1) {
      profiles[existingIndex] = { ...profiles[existingIndex], ...created };
    } else {
      profiles.push(created);
    }
    db.saveProfiles(profiles);

    return created;
  }

  static async updateByUserId(userId, updates) {
    let updated = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('customer_profiles')
          .update(updates)
          .eq('user_id', userId)
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

    const profiles = db.getProfiles();
    const index = profiles.findIndex((p) => p.user_id === userId);
    if (index !== -1) {
      profiles[index] = { ...profiles[index], ...(updated || updates), updated_at: new Date().toISOString() };
      db.saveProfiles(profiles);
      return profiles[index];
    }

    return updated;
  }
}
