// frontend/src/components/common/WhatsAppButton.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  // Configuración de WhatsApp
  const WHATSAPP_CONFIG = {
    numero: '543871234567', // Cambia por tu número (código país + número sin espacios ni guiones)
    mensajeDefault: '¡Hola! Me gustaría hacer una consulta sobre Hotel Mirage.'
  };

  const abrirWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_CONFIG.numero}?text=${encodeURIComponent(WHATSAPP_CONFIG.mensajeDefault)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {mostrarTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-full right-0 mb-4 bg-white px-4 py-3 shadow-xl border border-gray-200 whitespace-nowrap"
          >
            <button
              onClick={() => setMostrarTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <FaTimes className="text-xs" />
            </button>
            <p className="text-sm text-gray-800 font-medium">
              ¿Necesitas ayuda?
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Chatea con nosotros
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <motion.button
        onClick={abrirWhatsApp}
        onMouseEnter={() => setMostrarTooltip(true)}
        onMouseLeave={() => setMostrarTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulso animado */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
        />

        {/* Icono de WhatsApp */}
        <FaWhatsapp className="text-white text-3xl" />

        {/* Badge de "online" */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full h-full bg-green-400 rounded-full"
          />
        </div>
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;