// frontend/src/services/servicioReservas.js

import api from './api';

/**
 * Crear nueva reserva
 */
export const crearReserva = async (reservaData) => {
  try {
    // Transformar datos de español a inglés para el backend
    // IMPORTANTE: El modelo Booking espera estos campos exactos
    const bookingData = {
      room: reservaData.habitacion,
      guestInfo: {
        firstName: reservaData.cliente.nombre,
        lastName: reservaData.cliente.apellido,
        email: reservaData.cliente.correo,
        phone: reservaData.cliente.telefono,
        dni: reservaData.cliente.dni  // ✅ CORREGIDO: era documentNumber, ahora es dni
      },
      checkIn: reservaData.fechaEntrada,
      checkOut: reservaData.fechaSalida,
      numberOfGuests: reservaData.numeroPersonas,
      specialRequests: reservaData.observaciones || '',
      paymentMethod: 'tarjeta'
    };

    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('❌ Error al crear reserva:', error);
    console.error('❌ Respuesta del servidor:', error.response?.data);
    throw error;
  }
};

/**
 * Verificar disponibilidad de habitación
 */
export const verificarDisponibilidad = async (params) => {
  try {
    const response = await api.post('/bookings/verificar-disponibilidad', {
      habitacionId: params.habitacionId,
      fechaEntrada: params.fechaEntrada,
      fechaSalida: params.fechaSalida
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error al verificar disponibilidad:', error);
    throw error;
  }
};

/**
 * Obtener todas las reservas
 */
export const obtenerReservas = async (filtros = {}) => {
  const response = await api.get('/bookings', { params: filtros });
  return response.data;
};

/**
 * Obtener reserva por ID
 */
export const obtenerReservaPorId = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

/**
 * Obtener reserva por código de confirmación
 */
export const obtenerReservaPorCodigo = async (code) => {
  const response = await api.get(`/bookings/confirmation/${code}`);
  return response.data;
};

/**
 * Actualizar reserva
 */
export const actualizarReserva = async (id, reservaData) => {
  const response = await api.put(`/bookings/${id}`, reservaData);
  return response.data;
};

/**
 * Cancelar reserva
 */
export const cancelarReserva = async (id) => {
  const response = await api.patch(`/bookings/${id}/cancel`);
  return response.data;
};

/**
 * Confirmar reserva
 */
export const confirmarReserva = async (id) => {
  const response = await api.patch(`/bookings/${id}/confirm`);
  return response.data;
};

/**
 * Completar reserva (checkout)
 */
export const completarReserva = async (id) => {
  const response = await api.patch(`/bookings/${id}/complete`);
  return response.data;
};

/**
 * Procesar pago de reserva
 */
export const procesarPago = async (id, paymentData) => {
  const response = await api.patch(`/bookings/${id}/payment`, paymentData);
  return response.data;
};