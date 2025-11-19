// frontend/src/services/servicioMercadoPago.js

import api from './api';

/**
 * Crear una preferencia de pago en Mercado Pago
 * @param {Object} reservaData - Datos de la reserva y cliente
 * @returns {Promise} - Devuelve la URL de pago y el ID de preferencia
 */
export const crearPreferenciaPago = async (reservaData) => {
  try {
    const response = await api.post('/mercadopago/create-preference', reservaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear preferencia de pago:', error);
    throw error;
  }
};

/**
 * Verificar el estado de un pago
 * @param {String} paymentId - ID del pago de Mercado Pago
 * @returns {Promise} - Devuelve el estado del pago
 */
export const verificarEstadoPago = async (paymentId) => {
  try {
    const response = await api.get(`/mercadopago/payment/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar estado de pago:', error);
    throw error;
  }
}