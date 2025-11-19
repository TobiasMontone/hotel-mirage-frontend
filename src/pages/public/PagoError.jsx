// frontend/src/pages/public/PagoError.jsx

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft, FaRedo } from 'react-icons/fa';

const PagoError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        {/* Ícono de error */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-6xl text-red-600" />
          </div>
        </motion.div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Pago No Procesado
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            No se pudo completar el pago
          </p>
        </div>

        {/* Información */}
        <div className="bg-red-50 border border-red-200 p-8 mb-8">
          <h3 className="text-xl font-serif text-red-900 mb-4">¿Qué sucedió?</h3>
          
          <ul className="space-y-2 text-red-800">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>El pago fue rechazado o cancelado</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>No se realizó ningún cargo a tu tarjeta</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Tu reserva no fue procesada</span>
            </li>
          </ul>
        </div>

        {/* Sugerencias */}
        <div className="bg-gray-50 border border-gray-200 p-6 mb-8">
          <h4 className="font-medium text-black mb-3">Sugerencias:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Verifica que los datos de tu tarjeta sean correctos</li>
            <li>✓ Asegúrate de tener fondos suficientes</li>
            <li>✓ Contacta a tu banco si el problema persiste</li>
            <li>✓ Intenta con otro método de pago</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            <FaRedo />
            Intentar Nuevamente
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border-2 border-black text-black font-medium hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft />
            Volver al Inicio
          </motion.button>
        </div>

        {/* Información de contacto */}
        <div className="text-center mt-8 p-4 bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>¿Necesitas ayuda?</strong>
            <br />
            Contacta con nuestro equipo de soporte
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PagoError;