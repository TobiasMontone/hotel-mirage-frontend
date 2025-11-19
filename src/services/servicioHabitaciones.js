// frontend/src/services/servicioHabitaciones.js
import api from './api';

/**
 * Obtener todas las habitaciones (con o sin filtros)
 */
export const obtenerHabitaciones = async (filtros = {}) => {
  try {
    // Construir query params según lo que espera el backend
    const params = new URLSearchParams();

    if (filtros.tipo) params.append('type', filtros.tipo);
    if (filtros.precioMax) params.append('maxPrice', filtros.precioMax);
    if (filtros.capacidad) params.append('capacity', filtros.capacidad);

    const queryString = params.toString();
    const url = queryString ? `/rooms?${queryString}` : '/rooms';

    const response = await api.get(url);

    // Devolver el objeto completo con success y data
    return response.data;
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    throw error;
  }
};

/**
 * ⭐ Obtener tipos de habitaciones con resumen
 */
export const obtenerTiposHabitaciones = async () => {
  try {
    const response = await api.get('/rooms/types');
    return response.data;
  } catch (error) {
    console.error('Error al obtener tipos de habitaciones:', error);
    throw error;
  }
};

/**
 * 🆕 Obtener habitaciones disponibles por tipo (sin reservas activas)
 */
export const obtenerHabitacionesDisponiblesPorTipo = async (tipo) => {
  try {
    const response = await api.get(`/rooms/available/${tipo}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener habitaciones disponibles:', error);
    throw error;
  }
};

/**
 * 🆕 ADMIN - Obtener habitaciones por tipo con estado real
 */
export const obtenerHabitacionesPorTipoAdmin = async (tipo) => {
  try {
    console.log('🔍 [ADMIN] Solicitando habitaciones tipo:', tipo);
    const response = await api.get(`/rooms/admin/type/${tipo}`);
    console.log('✅ [ADMIN] Respuesta:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener habitaciones por tipo (admin):', error);
    throw error;
  }
};

/**
 * Obtener habitación por ID
 */
export const obtenerHabitacionPorId = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener habitación:', error);
    throw error;
  }
};

/**
 * Crear habitación (admin)
 */
export const crearHabitacion = async (habitacionData) => {
  try {
    const response = await api.post('/rooms', habitacionData);
    return response.data;
  } catch (error) {
    console.error('Error al crear habitación:', error);
    throw error;
  }
};

/**
 * Actualizar habitación (admin)
 */
export const actualizarHabitacion = async (id, habitacionData) => {
  try {
    const response = await api.put(`/rooms/${id}`, habitacionData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar habitación:', error);
    throw error;
  }
};

/**
 * Eliminar habitación (admin)
 */
export const eliminarHabitacion = async (id) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar habitación:', error);
    throw error;
  }
};

/**
 * Verificar disponibilidad de habitación
 */
export const verificarDisponibilidad = async (id, fechas) => {
  try {
    const response = await api.post(`/rooms/${id}/check-availability`, fechas);
    return response.data;
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    throw error;
  }
};
