import { io } from 'socket.io-client';

const rawSocketUrl =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? 'https://bharatfiling-1.onrender.com' : '');

const BACKEND_URL = rawSocketUrl
  ? rawSocketUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '')
  : (typeof window !== 'undefined'
    ? (window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin)
    : 'http://localhost:5000');

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('⚡ Connected to BharatFiling Real-Time Socket Server:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket connection warning (will retry automatically):', err.message);
    });
  }
  return socket;
}

export function joinCADesk() {
  const s = getSocket();
  if (s) {
    s.emit('join_ca_desk');
  }
}

export function joinApplication(applicationId) {
  const s = getSocket();
  if (s && applicationId) {
    s.emit('join_application', applicationId);
  }
}

export function joinUser(userId) {
  const s = getSocket();
  if (s && userId) {
    s.emit('join_user', userId);
  }
}
