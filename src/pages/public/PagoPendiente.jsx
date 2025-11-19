// frontend/src/pages/public/PagoPendiente.jsx

import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaHome, FaEnvelope } from 'react-icons/fa';

const PagoPendiente = () => {
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
        {/* Ícono de pendiente */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
            <FaClock className="text-6xl text-yellow-600" />
          </div>
        </motion.div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Pago Pendiente
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Tu pago está siendo procesado
          </p>
        </div>

        {/* Información */}
        <div className="bg-yellow-50 border border-yellow-200 p-8 mb-8">
          <h3 className="text-xl font-serif text-yellow-900 mb-4">Estado del Pago</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-yellow-300">
              <span className="text-yellow-800">Estado:</span>
              <span className="text-yellow-600 font-medium">⏳ En Proceso</span>
            </div>
            
            {paymentId && (
              <div className="flex justify-between items-center">
                <span className="text-yellow-800">ID de Pago:</span>
                <span className="text-black font-mono text-sm">{paymentId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje informativo */}
        <div className="bg-gray-50 border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <FaEnvelope className="text-2xl text-gray-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-black mb-2">¿Qué sigue?</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tu pago está siendo verificado por Mercado Pago</li>
                <li>• Recibirás un correo cuando se confirme el pago</li>
                <li>• Esto puede tomar unos minutos</li>
                <li>• No es necesario realizar ninguna acción adicional</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Métodos de pago con confirmación pendiente */}
        <div className="bg-blue-50 border border-blue-200 p-6 mb-8">
          <p className="text-blue-800 text-sm">
            <strong>💳 Métodos comunes con confirmación pendiente:</strong>
            <br />
            • Transferencias bancarias
            <br />
            • Pago en efectivo (Rapipago, Pago Fácil)
            <br />
            • Algunas tarjetas de débito
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

        {/* Información de contacto */}
        <div className="text-center mt-8 p-4 bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-600">
            Si tienes dudas sobre tu reserva, revisa tu correo o contáctanos.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PagoPendiente;