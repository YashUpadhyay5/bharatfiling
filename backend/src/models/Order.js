import { supabase, isSupabaseConfigured, markSupabaseUnhealthy } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class OrderModel {
  static async findById(id) {
    if (!id) return null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .or(`id.eq.${id},order_number.eq.${id},razorpay_order_id.eq.${id}`)
          .maybeSingle();
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getOrders().find((o) => o.id === id || o.order_number === id || o.razorpay_order_id === id) || null;
  }

  static async findByUserId(userId) {
    if (!userId) return [];
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getOrders().filter((o) => o.user_id === userId) || [];
  }

  static async findAll() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
        if (error) markSupabaseUnhealthy();
      } catch {
        markSupabaseUnhealthy();
      }
    }
    return db.getOrders();
  }

  static async create(orderData) {
    let created = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('orders').insert(orderData).select().single();
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
        id: orderData.id || `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        ...orderData,
        created_at: new Date().toISOString(),
      };
    }

    const orders = db.getOrders();
    orders.push(created);
    db.saveOrders(orders);

    return created;
  }

  static async update(id, updates) {
    let updated = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('orders')
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

    const orders = db.getOrders();
    const idx = orders.findIndex((o) => o.id === id || o.order_number === id || o.razorpay_order_id === id);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], ...(updated || updates), updated_at: new Date().toISOString() };
      db.saveOrders(orders);
      return orders[idx];
    }

    return updated;
  }
}
