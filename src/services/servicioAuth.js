// frontend/src/services/servicioAuth.js

import api from './api';

/**
 * Login de usuario
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  
  // Guardar token y usuario en localStorage
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  
  return response.data;
};

/**
 * Logout de usuario
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Obtener usuario actual del localStorage
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Verificar si hay usuario autenticado
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Obtener perfil del usuario autenticado
 */
export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Actualizar perfil
 */
export const updateProfile = async (data) => {
  const response = await api.put('/auth/me', data);
  
  // Actualizar usuario en localStorage
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data;
};

/**
 * Cambiar contraseña
 */
export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.put('/auth/change-password', {
    currentPassword,
    newPassword
  });
  return response.data;
};