import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from '../../config/api.config';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch current user profile and update state
  const fetchUserProfile = async () => {
    try {
      const response = await axiosSecure.get(API_ENDPOINTS.PROFILE);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, userData.role);
    } catch (error) {
       console.error("Failed to fetch profile", error);
       // Handle error appropriately
    }
  };

  // Initialize user from localStorage and fetch latest profile
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      
      if (accessToken) {
        try {
          // Fetch fresh user profile using axiosSecure to handle token refresh automatically
          const response = await axiosSecure.get(API_ENDPOINTS.PROFILE);
          const userData = response.data;
          
          setUser(userData);
          // Sync localStorage with fresh data
          localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
          localStorage.setItem(STORAGE_KEYS.USER_ROLE, userData.role);
        } catch (error) {
          console.error("Failed to fetch profile during init", error);
          // If profile fetch fails (even after refresh attempt by axiosSecure), 
          // we assume the session is invalid.
          
          // Fallback to localStorage data if available preventing immediate logout on network glitch?
          // No, if axiosSecure failed (401), it means refresh also failed.
          // We should clear session.
          
          // However, axiosSecure interceptor redirects to /login on failure.
          // So we might not even reach here if it redirects.
          // But just in case:
          localStorage.clear();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Register new user
  const createUser = async (email, firstName, lastName, password, confirmPassword) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        confirm_password: confirmPassword,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Verify email with OTP
  const verifyEmail = async (email, otp) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.VERIFY_EMAIL}`, {
        email,
        otp,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Resend OTP
  const resendOTP = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.RESEND_OTP}`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // Store tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);

      // Fetch Profile immediately to get Role and other details
      const profileResponse = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = profileResponse.data;
      
      // Store user info
      localStorage.setItem(STORAGE_KEYS.USER_EMAIL, userData.email);
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, userData.role);

      setUser(userData);
      setLoading(false);
      return userData; // Return full user data
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Log out
  const logOut = async () => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      
      if (refreshToken && accessToken) {
        await axios.post(`${API_BASE_URL}${API_ENDPOINTS.LOGOUT}`, 
          {
            refresh: refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all storage and user state
      localStorage.clear();
      setUser(null);
      setLoading(false);
    }
  };

  // Get user profile
  const getUserProfile = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) throw new Error('No access token');

    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  // Update user profile
  const updateProfile = async (data) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) throw new Error('No access token');

    const response = await axios.patch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  // Change password
  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) throw new Error('No access token');

    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.CHANGE_PASSWORD}`,
      {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  const authInfo = {
    user,
    loading,
    createUser,
    verifyEmail,
    resendOTP,
    signIn,
    logOut,
    getUserProfile,
    updateProfile,
    changePassword,
    fetchUserProfile,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
