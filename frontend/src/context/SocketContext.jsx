import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSocket, joinCADesk, joinApplication, joinUser } from '../services/socket.js';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    function onConnect() {
      setConnected(true);
    }
    function onDisconnect() {
      setConnected(false);
    }

    if (s.connected) {
      setConnected(true);
    }

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);

    return () => {
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        joinCADesk,
        joinApplication,
        joinUser,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    return {
      socket: null,
      connected: false,
      joinCADesk: () => {},
      joinApplication: () => {},
      joinUser: () => {},
    };
  }
  return context;
}
