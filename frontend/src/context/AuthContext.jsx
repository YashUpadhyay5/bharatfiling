import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('bharatfiling_user') || localStorage.getItem('taxveda_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(
    localStorage.getItem('bharatfiling_token') || localStorage.getItem('taxveda_token')
  );
  const [loading, setLoading] = useState(!user && !!token);

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
          localStorage.setItem('bharatfiling_user', JSON.stringify(res.user));
        } else {
          logout();
        }
      } catch (err) {
        // Only invalidate if the server explicitly returned 401 Unauthorized or 403 Forbidden
        if (err.status === 401 || err.status === 403) {
          console.warn('Session expired or invalid:', err.message);
          logout();
        } else {
          // Cold start or transient network hiccup: retain the user's cached session from localStorage
          console.warn('Backend waking up or network unavailable. Retaining cached session:', err.message);
        }
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
      if (res.user) {
        localStorage.setItem('bharatfiling_user', JSON.stringify(res.user));
      }
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success && res.token) {
      localStorage.setItem('bharatfiling_token', res.token);
      if (res.user) {
        localStorage.setItem('bharatfiling_user', JSON.stringify(res.user));
      }
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const requestRegisterOtp = async (userData) => {
    return await api.requestRegisterOtp(userData);
  };

  const verifyRegisterOtp = async ({ email, otp, txn_id }) => {
    const res = await api.verifyRegisterOtp({ email, otp, txn_id });
    if (res.success && res.token) {
      localStorage.setItem('bharatfiling_token', res.token);
      if (res.user) {
        localStorage.setItem('bharatfiling_user', JSON.stringify(res.user));
      }
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  const requestForgotPasswordOtp = async (email) => {
    return await api.requestForgotPasswordOtp(email);
  };

  const verifyForgotPasswordOtp = async ({ email, otp, txn_id }) => {
    return await api.verifyForgotPasswordOtp({ email, otp, txn_id });
  };

  const resetPassword = async ({ email, reset_token, new_password }) => {
    return await api.resetPassword({ email, reset_token, new_password });
  };

  const changePassword = async ({ current_password, new_password }) => {
    return await api.changePassword({ current_password, new_password });
  };

  const logout = () => {
    localStorage.removeItem('bharatfiling_token');
    localStorage.removeItem('taxveda_token');
    localStorage.removeItem('bharatfiling_user');
    localStorage.removeItem('taxveda_user');
    setToken(null);
    setUser(null);
  };

  // Quick switcher for demo review (Customer, CA, Admin)
  const quickSwitchAccount = async (targetRole) => {
    try {
      if (targetRole === 'CA') {
        return await login('ca.sharma@taxveda.com', 'Test@123');
      } else if (targetRole === 'ADMIN') {
        return await login('admin@taxveda.com', 'Test@123');
      } else {
        return await login('customer@bharatfiling.com', 'Test@123');
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
        requestRegisterOtp,
        verifyRegisterOtp,
        requestForgotPasswordOtp,
        verifyForgotPasswordOtp,
        resetPassword,
        changePassword,
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
