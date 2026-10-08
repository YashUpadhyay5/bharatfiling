import { Server } from 'socket.io';

let ioInstance = null;

/**
 * Initializes Socket.IO server on top of HTTP server.
 */
export function initSocketServer(httpServer) {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  ioInstance.on('connection', (socket) => {
    // 1. Join CA Desk room
    socket.on('join_ca_desk', () => {
      socket.join('room:ca_desk');
    });

    // 2. Join customer case room for live application tracking
    socket.on('join_application', (applicationId) => {
      if (applicationId) {
        socket.join(`room:application_${applicationId}`);
      }
    });

    // 3. Join customer personal notification room
    socket.on('join_user', (userId) => {
      if (userId) {
        socket.join(`room:user_${userId}`);
      }
    });

    socket.on('disconnect', () => {
      // Clean disconnect
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
