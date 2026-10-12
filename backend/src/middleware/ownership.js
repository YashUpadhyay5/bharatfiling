import { db } from '../database/db.js';

export const GUEST_USER_ID = 'usr_guest_lead';

const isStaff = (user) => user?.role === 'ADMIN' || user?.role === 'CA';

/**
 * Can this authenticated user read/modify the given application?
 *  - the owner
 *  - CA / ADMIN staff
 *  - a customer whose verified account e-mail matches a guest-created application
 *    (same rule the dashboard uses to "claim" guest checkouts); the app is claimed on first use.
 */
export const canAccessApplication = (user, app) => {
  if (!user || !app) return false;
  if (isStaff(user)) return true;
  if (app.user_id === user.id) return true;

  if (
    app.user_id === GUEST_USER_ID &&
    user.email &&
    app.fields_data?.email &&
    String(app.fields_data.email).toLowerCase() === String(user.email).toLowerCase()
  ) {
    return true;
  }
  return false;
};

export const findApplication = (idOrNumber) =>
  db.getApplications().find((a) => a.id === idOrNumber || a.application_number === idOrNumber) || null;

/** Same as above but for documents / orders that carry an application_id. */
export const canAccessByApplicationId = (user, applicationId) =>
  canAccessApplication(user, findApplication(applicationId));
