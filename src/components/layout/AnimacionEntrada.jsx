// frontend/src/components/layout/AnimacionEntrada.jsx

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ANIMACIÓN DE ENTRADA DEL HOTEL
 * Se muestra una sola vez al cargar la página
 */
const AnimacionEntrada = ({ onComplete }) => {
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    // Verificar si ya se mostró la animación
    const yaVisto = sessionStorage.getItem('animacionVista');
    
    if (yaVisto) {
      setMostrar(false);
      onComplete();
    } else {
      // Marcar como vista y ocultar después de 3.5 segundos
      setTimeout(() => {
        sessionStorage.setItem('animacionVista', 'true');
        setMostrar(false);
        onComplete();
      }, 3500);
    }
  }, [onComplete]);

  if (!mostrar) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
      >
        {/* Círculos animados de fondo */}
        <div className="absolute inset-0">
          {/* Círculo grande central */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 2.5], opacity: [0, 0.15, 0] }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="w-[600px] h-[600px] rounded-full border border-black/10"></div>
          </motion.div>

          {/* Círculo mediano */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-[400px] h-[400px] rounded-full border border-black/15"></div>
          </motion.div>

          {/* Círculo pequeño */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1.5], opacity: [0, 0.25, 0] }}
            transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          >
            <div className="w-[200px] h-[200px] rounded-full border-2 border-black/20"></div>
          </motion.div>

          {/* Puntos decorativos orbitando */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 1],
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 150],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 150],
              }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* Contenido central */}
        <div className="relative z-10 text-center">
          {/* Logo/Símbolo minimalista */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto border-2 border-black flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 border border-black rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          {/* Nombre del Hotel */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-serif text-black mb-4 tracking-tight">
              Hotel Mirage
            </h1>
          </motion.div>

          {/* Línea divisoria */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="w-16 h-px bg-black mx-auto mb-6"
          ></motion.div>

          {/* Subtítulo */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-sm tracking-widest text-gray-600 uppercase"
          >
            Salta, Argentina
          </motion.p>

          {/* Indicador de carga minimalista */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex justify-center gap-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-black rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Líneas decorativas en las esquinas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-black/20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-black/20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-black/20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-black/20"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimacionEntrada;