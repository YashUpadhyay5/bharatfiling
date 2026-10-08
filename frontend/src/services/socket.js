import { io } from 'socket.io-client';

const BACKEND_URL =
  import.meta.env.VITE_API_URL?.replace('/api/v1', '') ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? `${window.location.protocol}//${window.location.hostname}:5000`
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
