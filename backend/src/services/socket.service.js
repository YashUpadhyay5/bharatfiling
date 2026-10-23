import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { canAccessByApplicationId } from '../middleware/ownership.js';
import { isOriginAllowed } from '../config/cors.js';

let ioInstance = null;

/**
 * Initializes Socket.IO server on top of HTTP server.
 *
 * Connections may be anonymous, but rooms (which carry PII such as customer names, phone
 * numbers and case details) can only be joined by an authenticated user, and only the
 * rooms that user is entitled to.
 */
export function initSocketServer(httpServer) {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: (origin, cb) => {
        // Non-browser clients send no Origin header
        if (isOriginAllowed(origin)) return cb(null, true);
        return cb(null, false);
      },
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['polling', 'websocket'],
    maxHttpBufferSize: 1e5,
  });

  // Identify the caller from the JWT supplied in the handshake (if any)
  ioInstance.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (token && typeof token === 'string') {
      try {
        socket.data.user = jwt.verify(token, ENV.JWT_SECRET, { algorithms: ['HS256'] });
      } catch {
        socket.data.user = null;
      }
    }
    next();
  });

  ioInstance.on('connection', (socket) => {
    const user = socket.data.user || null;

    // 1. Join CA Desk room (CA / Admin only)
    socket.on('join_ca_desk', () => {
      if (user && (user.role === 'CA' || user.role === 'ADMIN')) {
        socket.join('room:ca_desk');
      }
    });

    // 2. Join an application room (owner / CA / Admin only)
    socket.on('join_application', (applicationId) => {
      if (!user || typeof applicationId !== 'string' || applicationId.length > 100) return;
      if (canAccessByApplicationId(user, applicationId)) {
        socket.join(`room:application_${applicationId}`);
      }
    });

    // 3. Join personal notification room (own id only)
    socket.on('join_user', (userId) => {
      if (!user || typeof userId !== 'string') return;
      if (userId === user.id) {
        socket.join(`room:user_${userId}`);
      }
    });
  });

  console.log('⚡ Socket.IO Real-Time Engine Initialized');
  return ioInstance;
}

/**
 * Broadcast event to all Chartered Accountants in the CA Desk room.
 */
export function emitToCADesk(event, data) {
  if (ioInstance) {
    ioInstance.to('room:ca_desk').emit(event, data);
  }
}

/**
 * Broadcast event to customer viewing a specific application.
 */
export function emitToApplication(applicationId, event, data) {
  if (ioInstance && applicationId) {
    ioInstance.to(`room:application_${applicationId}`).emit(event, data);
  }
}

/**
 * Broadcast event to a specific user.
 */
export function emitToUser(userId, event, data) {
  if (ioInstance && userId) {
    ioInstance.to(`room:user_${userId}`).emit(event, data);
  }
}

export function getIO() {
  return ioInstance;
}
