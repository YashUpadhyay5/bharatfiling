import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('bharatfiling_token') || localStorage.getItem('taxveda_token')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session expired or invalid:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (identifier, password) => {
    const res = await api.login(identifier, password);
    if (res.success && res.token) {
      localStorage.setItem('bharatfiling_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success && res.token) {
      localStorage.setItem('bharatfiling_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('bharatfiling_token');
    localStorage.removeItem('taxveda_token');
    setToken(null);
    setUser(null);
  };

  // Quick switcher for demo review (Customer, CA, Admin)
  const quickSwitchAccount = async (targetRole) => {
    try {
      if (targetRole === 'CA') {
        return await login('ca.sharma@taxveda.com', 'Password@123');
      } else if (targetRole === 'ADMIN') {
        return await login('admin@taxveda.com', 'Password@123');
      } else {
        return await login('rahul.verma@example.com', 'Password@123');
      }
    } catch (err) {
      console.error('Quick switch failed:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isCA: user?.role === 'CA' || user?.role === 'ADMIN',
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
        quickSwitchAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
