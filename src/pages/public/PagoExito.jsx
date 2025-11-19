// frontend/src/pages/public/PagoExito.jsx

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome } from 'react-icons/fa';

const PagoExito = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const preferenceId = searchParams.get('preference_id');

  useEffect(() => {
    // Limpiar localStorage
    localStorage.removeItem('mp_preference_id');
    localStorage.removeItem('reserva_temporal');
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        {/* Ícono de éxito */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheckCircle className="text-6xl text-green-600" />
          </div>
        </motion.div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
            ¡Pago Exitoso!
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Tu reserva ha sido confirmada exitosamente
          </p>
        </div>

        {/* Información */}
        <div className="bg-gray-50 border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-serif text-black mb-4">Detalles del Pago</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-gray-600">Estado:</span>
              <span className="text-green-600 font-medium">✅ Aprobado</span>
            </div>
            
            {paymentId && (
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="text-gray-600">ID de Pago:</span>
                <span className="text-black font-mono text-sm">{paymentId}</span>
              </div>
            )}
            
            {preferenceId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Referencia:</span>
                <span className="text-black font-mono text-sm">{preferenceId.slice(0, 20)}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje de confirmación */}
        <div className="bg-green-50 border border-green-200 p-6 mb-8">
          <p className="text-green-800 text-center">
            <strong>📧 Correo Enviado</strong>
            <br />
            Hemos enviado un correo con los detalles de tu reserva.
            <br />
            Por favor, revisa tu bandeja de entrada.
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            <FaHome />
            Volver al Inicio
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/habitaciones')}
            className="flex-1 px-8 py-4 border-2 border-black text-black font-medium hover:bg-gray-50 transition-colors"
          >
            Ver Más Habitaciones
          </motion.button>
        </div>

        {/* Nota adicional */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Si tienes alguna pregunta sobre tu reserva, no dudes en contactarnos.
        </p>
      </motion.div>
    </div>
  );
};

export default PagoExito;