import { supabase } from '../database/supabaseClient.js';
import { db } from '../database/db.js';

export class OtpModel {
  /**
   * Creates a new OTP record (in Supabase, fallback to local db store)
   */
  static async create(otpData) {
    const record = {
      txn_id: otpData.txn_id,
      email: otpData.email.toLowerCase().trim(),
      otp_hash: otpData.otp_hash,
      purpose: otpData.purpose,
      staged_payload: otpData.staged_payload || {},
      attempts: 0,
      max_attempts: otpData.max_attempts || 5,
      is_consumed: false,
      is_superseded: false,
      reset_token: null,
      reset_token_expires_at: null,
      expires_at: otpData.expires_at,
      created_at: new Date().toISOString(),
      consumed_at: null,
    };

    try {
      const { data, error } = await supabase
        .from('otps')
        .insert(record)
        .select()
        .single();
      if (!error && data) {
        return data;
      }
    } catch (e) {
      // Fall through to local fallback
    }

    // Local fallback
    const otps = db.getOtps();
    otps.push(record);
    db.saveOtps(otps);
    return record;
  }

  /**
   * Marks previous active OTPs for the same email and purpose as superseded
   */
  static async supersedeExisting(email, purpose) {
    const cleanEmail = email.toLowerCase().trim();
    try {
      await supabase
        .from('otps')
        .update({ is_superseded: true })
        .eq('email', cleanEmail)
        .eq('purpose', purpose)
        .eq('is_consumed', false);
    } catch (e) {
      // Fallback
    }

    const otps = db.getOtps();
    otps.forEach((o) => {
      if (o.email === cleanEmail && o.purpose === purpose && !o.is_consumed) {
        o.is_superseded = true;
      }
    });
    db.saveOtps(otps);
  }

  /**
   * Finds latest active OTP by transaction ID
   */
  static async findByTxnId(txnId) {
    try {
      const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('txn_id', txnId)
        .maybeSingle();
      if (!error && data) return data;
    } catch (e) {
      // Fallback
    }

    return db.getOtps().find((o) => o.txn_id === txnId) || null;
  }

  /**
   * Finds latest active, non-superseded OTP by email & purpose
   */
  static async findLatestActive(email, purpose) {
    const cleanEmail = email.toLowerCase().trim();
    try {
      const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('email', cleanEmail)
        .eq('purpose', purpose)
        .eq('is_consumed', false)
        .eq('is_superseded', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error && data) return data;
    } catch (e) {
      // Fallback
    }

    const list = db.getOtps().filter(
      (o) => o.email === cleanEmail && o.purpose === purpose && !o.is_consumed && !o.is_superseded
    );
    return list[list.length - 1] || null;
  }

  /**
   * Increments failed attempt count
   */
  static async incrementAttempts(txnId) {
    let currentAttempts = 0;
    try {
      const { data } = await supabase.from('otps').select('attempts, max_attempts').eq('txn_id', txnId).maybeSingle();
      if (data) {
        currentAttempts = (data.attempts || 0) + 1;
        const shouldLock = currentAttempts >= (data.max_attempts || 5);
        await supabase
          .from('otps')
          .update({
            attempts: currentAttempts,
            is_consumed: shouldLock ? true : false,
          })
          .eq('txn_id', txnId);
        return currentAttempts;
      }
    } catch (e) {
      // Fallback
    }

    const otps = db.getOtps();
    const item = otps.find((o) => o.txn_id === txnId);
    if (item) {
      item.attempts = (item.attempts || 0) + 1;
      if (item.attempts >= (item.max_attempts || 5)) {
        item.is_consumed = true;
      }
      db.saveOtps(otps);
      return item.attempts;
    }
    return 1;
  }

  /**
   * Marks OTP as consumed
   */
  static async markConsumed(txnId) {
    const consumedAt = new Date().toISOString();
    try {
      await supabase
        .from('otps')
        .update({
          is_consumed: true,
          consumed_at: consumedAt,
        })
        .eq('txn_id', txnId);
    } catch (e) {
      // Fallback
    }

    const otps = db.getOtps();
    const item = otps.find((o) => o.txn_id === txnId);
    if (item) {
      item.is_consumed = true;
      item.consumed_at = consumedAt;
      db.saveOtps(otps);
    }
  }

  /**
   * Sets single-use reset authorization token for password recovery
   */
  static async setResetToken(txnId, resetToken, expiresAt) {
    try {
      await supabase
        .from('otps')
        .update({
          reset_token: resetToken,
          reset_token_expires_at: expiresAt,
          is_consumed: true,
        })
        .eq('txn_id', txnId);
    } catch (e) {
      // Fallback
    }

    const otps = db.getOtps();
    const item = otps.find((o) => o.txn_id === txnId);
    if (item) {
      item.reset_token = resetToken;
      item.reset_token_expires_at = expiresAt;
      item.is_consumed = true;
      db.saveOtps(otps);
    }
  }

  /**
   * Finds OTP record by single-use reset token
   */
  static async findByResetToken(resetToken) {
    try {
      const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('reset_token', resetToken)
        .maybeSingle();
      if (!error && data) return data;
    } catch (e) {
      // Fallback
    }

    return db.getOtps().find((o) => o.reset_token === resetToken) || null;
  }

  /**
   * Revokes a used reset token
   */
  static async revokeResetToken(resetToken) {
    try {
      await supabase
        .from('otps')
        .update({ reset_token: null })
        .eq('reset_token', resetToken);
    } catch (e) {
      // Fallback
    }

    const otps = db.getOtps();
    const item = otps.find((o) => o.reset_token === resetToken);
    if (item) {
      item.reset_token = null;
      db.saveOtps(otps);
    }
  }

  /**
   * Deletes an OTP record by transaction ID (used for immediate rollback on email dispatch failure)
   */
  static async deleteByTxnId(txnId) {
    try {
      await supabase.from('otps').delete().eq('txn_id', txnId);
    } catch (e) {
      // Fallback
    }

    const otps = db.getOtps();
    const filtered = otps.filter((o) => o.txn_id !== txnId);
    db.saveOtps(filtered);
  }
}

