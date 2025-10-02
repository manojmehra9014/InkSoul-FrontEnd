import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Load user
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth`);
        
        if (res.data.success) {
          dispatch({
            type: 'USER_LOADED',
            payload: res.data.user
          });
        } else {
          dispatch({ type: 'AUTH_ERROR', payload: null });
        }
      } catch (err) {
        console.error('Load user error:', err);
        dispatch({ 
          type: 'AUTH_ERROR', 
          payload: err.response?.data?.message || 'Authentication failed' 
        });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: null });
    }
  };

  // Register user
  const register = async (formData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/register`, 
        formData,
        config
      );
      
      if (res.data.success) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: {
            token: res.data.token,
            user: res.data.user
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'REGISTER_FAIL',
          payload: res.data.message || 'Registration failed'
        });
        return { success: false, error: res.data.message || 'Registration failed' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg || 
                          'Registration failed';
      
      dispatch({
        type: 'REGISTER_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (formData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, 
        formData,
        config
      );
      
      if (res.data.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: res.data.token,
            user: res.data.user
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: res.data.message || 'Login failed'
        });
        return { success: false, error: res.data.message || 'Login failed' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg || 
                          'Login failed. Please check your credentials.';
      
      dispatch({
        type: 'LOGIN_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      };

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/profile`, 
        profileData,
        config
      );
      
      if (res.data.success) {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data.user
        });
        return { success: true };
      } else {
        return { success: false, error: res.data.message || 'Profile update failed' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg || 
                          'Profile update failed';
      return { success: false, error: errorMessage };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      };

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/change-password`, 
        passwordData,
        config
      );
      
      if (res.data.success) {
        return { success: true };
      } else {
        return { success: false, error: res.data.message || 'Password change failed' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg || 
                          'Password change failed';
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Call logout endpoint if token exists
      if (localStorage.getItem('token')) {
        await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/logout`,
          {},
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
        );
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        loadUser,
        updateProfile,
        changePassword,
        clearErrors
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