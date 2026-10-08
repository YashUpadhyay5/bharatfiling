import { supabase } from '../database/supabaseClient.js';

export class AuditLogModel {
  static async findAll(limit = 50) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  static async create(logData) {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        actor_id: logData.actor_id || null,
        actor_role: logData.actor_role,
        action: logData.action,
        resource_type: logData.resource_type,
        resource_id: logData.resource_id || null,
        details: logData.details || {},
        ip_address: logData.ip_address || null,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
