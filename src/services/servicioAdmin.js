// frontend/src/services/servicioAdmin.js

import api from './api';

/**
 * Obtener estadísticas del dashboard
 */
export const obtenerEstadisticas = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

/**
 * Obtener reservas activas
 */
export const obtenerReservasActivas = async () => {
  const response = await api.get('/admin/active-bookings');
  return response.data;
};

/**
 * Generar reporte personalizado
 */
export const generarReporte = async (reportType, startDate, endDate, filters = {}) => {
  const response = await api.post('/admin/reports', {
    reportType,
    startDate,
    endDate,
    filters
  });
  return response.data;
};

/**
 * Obtener todos los usuarios
 */
export const obtenerUsuarios = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

/**
 * Crear nuevo usuario
 */
export const crearUsuario = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

/**
 * Actualizar usuario
 */
export const actualizarUsuario = async (id, userData) => {
  const response = await api.put(`/admin/users/${id}`, userData);
  return response.data;
};

/**
 * Eliminar usuario
 */
export const eliminarUsuario = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};