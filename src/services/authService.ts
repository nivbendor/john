// services/authService.js
import { URI_SETTINGS } from '../utils/config';
import axios, { AxiosError } from 'axios';

const TOKEN_KEY = 'auth_token';

// Retrieve token from local storage
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Store token in local storage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Fetch a new token from /auth
export async function fetchToken() {
  const response = await axios.get(URI_SETTINGS.auth()); // or POST, depending on your auth API
  // Assume the token is in response.data.access_token
  const newToken = response.data.access_token;
  setToken(newToken);
  return newToken;
}

// Generic function to make an authenticated request
// If we get a 401 with "The incoming token has expired", refresh & retry
export async function fetchWithToken(url: string, config = { headers: {}}) {
  let token = getToken();

  // Insert token into request headers
  const finalConfig = {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...config.headers,
    },
  };

  try {
    const resp = await axios(url, finalConfig);
    return resp;
  } catch (error) {
    // Check if we got 401 and a specific error message
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'The incoming token has expired'
    ) {
      console.log('Token expired, refreshing...');
      // Refresh the token
      token = await fetchToken();
      // Retry the request with the new token
      finalConfig.headers.Authorization = `Bearer ${token}`;
      return axios(url, finalConfig);
    }
    // Otherwise, rethrow the error
    throw error;
  }
}
