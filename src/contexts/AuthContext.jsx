import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        
        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.token && response.user) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.token && response.user) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update user profile
  const updateUser = (userData) => {
    setUser((prevUser) => ({ ...prevUser, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
