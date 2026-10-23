import { supabase, isSupabaseConfigured, markSupabaseUnhealthy } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class ServiceApplicationModel {
  static async findById(id) {
    if (!id) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('service_applications')
          .select('*')
          .or(`id.eq.${id},application_number.eq.${id}`)
          .maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getApplications().find((a) => a.id === id || a.application_number === id) || null;
  }

  static async findByUserId(userId) {
    if (!userId) return [];
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('service_applications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getApplications().filter((a) => a.user_id === userId) || [];
  }

  static async findAll() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('service_applications')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getApplications();
  }

  static async findAssignedToCA(caId) {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('service_applications')
          .select('*')
          .or(`assigned_ca_id.eq.${caId},assigned_ca_id.is.null`)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getApplications().filter((a) => !caId || a.assigned_ca_id === caId || !a.assigned_ca_id);
  }

  static async create(appData) {
    let created = null;
    if (isSupabaseConfigured()) {
      try {
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
        id: appData.id || `app_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    const apps = db.getApplications();
    apps.push(created);
    db.saveApplications(apps);

    return created;
  }

  static async update(id, updates) {
    let updated = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('service_applications')
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

    const apps = db.getApplications();
    const idx = apps.findIndex((a) => a.id === id || a.application_number === id);
    if (idx !== -1) {
      apps[idx] = { ...apps[idx], ...(updated || updates), updated_at: new Date().toISOString() };
      db.saveApplications(apps);
      return apps[idx];
    }

    return updated;
  }
}
