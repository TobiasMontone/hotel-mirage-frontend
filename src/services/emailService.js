import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_icgt1ae',
  publicKey: 'JaOVHHEJFGPoHvSqT', // ⚠️ REEMPLAZA ESTO con tu Public Key
  templates: {
    consulta: 'template_zbwdwfa',
    reserva: 'template_32njx77'
  }
};

// Inicializar EmailJS con tu Public Key
emailjs.init(EMAILJS_CONFIG.publicKey);

/**
 * Enviar email de consulta desde el formulario de contacto
 * @param {Object} formData - Datos del formulario
 * @returns {Promise}
 */
export const enviarConsulta = async (formData) => {
  try {
    const templateParams = {
      customer_name: formData.nombre,
      customer_email: formData.correo,
      customer_phone: formData.telefono || 'No proporcionado',
      subject: formData.asunto,
      message: formData.mensaje,
      reply_to: formData.correo
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.consulta,
      templateParams
    );

    return {
      success: true,
      message: '¡Mensaje enviado correctamente!',
      data: response
    };
  } catch (error) {
    console.error('Error al enviar consulta:', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
      error: error
    };
  }
};

/**
 * Enviar email de confirmación de reserva
 * @param {Object} reservaData - Datos de la reserva
 * @returns {Promise}
 */
export const enviarConfirmacionReserva = async (reservaData) => {
  try {
    const templateParams = {
      customer_name: reservaData.nombre,
      customer_email: reservaData.correo,
      customer_phone: reservaData.telefono,
      reservation_id: reservaData.reservaId,
      check_in: reservaData.fechaEntrada,
      check_out: reservaData.fechaSalida,
      room_type: reservaData.tipoHabitacion,
      guests: reservaData.numeroHuespedes,
      total_price: reservaData.precioTotal,
      reply_to: reservaData.correo
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.reserva,
      templateParams
    );

    return {
      success: true,
      message: '¡Confirmación de reserva enviada!',
      data: response
    };
  } catch (error) {
    console.error('Error al enviar confirmación de reserva:', error);
    return {
      success: false,
      message: 'Error al enviar la confirmación. Por favor, contacta a recepción.',
      error: error
    };
  }
};

export default {
  enviarConsulta,
  enviarConfirmacionReserva
};