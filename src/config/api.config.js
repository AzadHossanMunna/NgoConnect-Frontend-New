// API Configuration
// Change this to production URL when deploying
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/user/token/',
  REGISTER: '/api/user/register/',
  VERIFY_EMAIL: '/api/user/verify-email/',
  RESEND_OTP: '/api/user/resend-otp/',
  REFRESH_TOKEN: '/api/user/token/refresh/',
  LOGOUT: '/api/user/logout/',
  
  // User Profile
  PROFILE: '/api/user/profile/',
  CHANGE_PASSWORD: '/api/user/change-password/',
  MY_DONATIONS: '/api/user/profile/donations/',

  // Projects / Campaigns
  CAMPAIGNS: '/api/projects/campaigns/',
  EVENTS: '/api/projects/events/',

  // Donations
  DONATION_INITIATE: '/api/donations/initiate/',
  DONATION_PUBLIC: '/api/donations/public/',
  DONATION_ADMIN: '/api/donations/admin/',

  // Dashboard
  DASHBOARD_SUMMARY: '/api/user/dashboard/summary/',
};

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_EMAIL: 'user_email',
  USER_ROLE: 'user_role',
};
