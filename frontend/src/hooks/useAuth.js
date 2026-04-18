import { useState } from 'react';
import * as authService from '../services/authService';

// TODO: need to end-to-end test
export function useAuth() {
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  );
  const [message, setMessage] = useState('');

  const register = async (formData) => {
    try {
      const data = await authService.register(formData);
      setMessage(data.message || 'Registered successfully');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const login = async (formData) => {
    try {
      const data = await authService.login(formData);

      localStorage.setItem('token', data.token);
      setToken(data.token);

      setMessage('Logged in!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getProfile = async () => {
    try {
      if (!token) {
        throw new Error('No token found');
      }

      const data = await authService.getProfile(token);
      setMessage(JSON.stringify(data));
    } catch (err) {
      setMessage(err.message);
    }
  };

  const logout = () => {
    // TODO
  };

  return {
    token,
    message,
    register,
    login,
    getProfile,
    logout
  };
}