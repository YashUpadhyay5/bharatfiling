import { supabase } from '../database/supabaseClient.js';

export class FieldDefinitionModel {
  static async findAll() {
    const { data, error } = await supabase
      .from('field_definitions')
      .select('*')
      .order('section', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  static async findBySection(section) {
    const { data, error } = await supabase
      .from('field_definitions')
      .select('*')
      .eq('section', section);
    if (error) throw error;
    return data || [];
  }

  static async create(fieldData) {
    const { data, error } = await supabase.from('field_definitions').insert(fieldData).select().single();
    if (error) throw error;
    return data;
  }
}
