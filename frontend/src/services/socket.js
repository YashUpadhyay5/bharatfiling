import { io } from 'socket.io-client';
import { SOCKET_BASE_URL } from '../config/domain.js';

const BACKEND_URL = SOCKET_BASE_URL;
const TOKEN_KEYS = ['bharatfiling_token', 'taxveda_token'];

let socket = null;
let authedToken = null;

// Rooms to (re)join whenever the socket (re)connects, e.g. after login or a network drop
const desired = { caDesk: false, applications: new Set(), user: null };

const readToken = () => {
  try {
    for (const k of TOKEN_KEYS) {
      const v = localStorage.getItem(k);
      if (v) return v;
    }
  } catch {
    // storage unavailable
  }
  return null;
};

function emitJoins(s) {
  if (desired.caDesk) s.emit('join_ca_desk');
  desired.applications.forEach((id) => s.emit('join_application', id));
  if (desired.user) s.emit('join_user', desired.user);
}

export function getSocket() {
  if (!socket) {
    authedToken = readToken();
    socket = io(BACKEND_URL, {
      transports: ['polling', 'websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1500,
      timeout: 10000,
      // Evaluated on every (re)connect so a fresh login is picked up automatically
      auth: (cb) => cb({ token: readToken() }),
    });

    socket.on('connect', () => {
      authedToken = readToken();
      emitJoins(socket);
    });

    socket.on('connect_error', (err) => {
      // Don't flood console with warnings if browser is navigating, page is hidden, or server is spinning up
      if (typeof document !== 'undefined' && document.hidden) return;
      console.warn('Socket connection status (reconnecting in background):', err.message);
    });

    // Gracefully disconnect before bfcache / page unload to prevent "WebSocket closed before connection established"
    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', () => {
        if (socket && socket.connected) {
          socket.disconnect();
        }
      });
      window.addEventListener('pageshow', (event) => {
        if (event.persisted && socket && !socket.connected) {
          socket.connect();
        }
      });
    }
  }
  return socket;
}

// If the user logged in/out since the handshake, reconnect so the server sees the new identity
function ensureIdentity(s) {
  const current = readToken();
  if (current !== authedToken) {
    authedToken = current;
    s.disconnect();
    s.connect();
  }
}

export function joinCADesk() {
  const s = getSocket();
  desired.caDesk = true;
  ensureIdentity(s);
  if (s.connected) s.emit('join_ca_desk');
}

export function joinApplication(applicationId) {
  const s = getSocket();
  if (!applicationId) return;
  desired.applications.add(applicationId);
  ensureIdentity(s);
  if (s.connected) s.emit('join_application', applicationId);
}

export function joinUser(userId) {
  const s = getSocket();
  if (!userId) return;
  desired.user = userId;
  ensureIdentity(s);
  if (s.connected) s.emit('join_user', userId);
}
