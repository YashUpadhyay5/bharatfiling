import { supabase, isSupabaseConfigured, markSupabaseUnhealthy } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class DocumentModel {
  static async findByApplicationId(appId) {
    if (!appId) return [];
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .eq('application_id', appId)
          .order('created_at', { ascending: true });
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getDocuments().filter((d) => d.application_id === appId) || [];
  }

  static async findById(id) {
    if (!id) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('id', id).maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getDocuments().find((d) => d.id === id) || null;
  }

  static async create(docData) {
    let created = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('documents').insert(docData).select().single();
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
        id: docData.id || `doc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        ...docData,
        created_at: new Date().toISOString(),
      };
    }

    const docs = db.getDocuments();
    docs.push(created);
    db.saveDocuments(docs);

    return created;
  }

  static async update(id, updates) {
    let updated = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('documents')
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

    const docs = db.getDocuments();
    const idx = docs.findIndex((d) => d.id === id);
    if (idx !== -1) {
      docs[idx] = { ...docs[idx], ...(updated || updates), updated_at: new Date().toISOString() };
      db.saveDocuments(docs);
      return docs[idx];
    }

    return updated;
  }

  static async delete(id) {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('documents').delete().eq('id', id);
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    const docs = db.getDocuments().filter((d) => d.id !== id);
    db.saveDocuments(docs);
    return true;
  }
}
