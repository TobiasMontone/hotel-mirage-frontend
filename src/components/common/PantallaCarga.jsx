// frontend/src/components/common/PantallaCarga.jsx

import { motion } from 'framer-motion';

const PantallaCarga = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.03) 100px,
            rgba(0, 0, 0, 0.03) 102px
          )`,
        }} />
      </div>

      <div className="text-center relative z-10">
        {/* Círculos animados concéntricos */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Círculo exterior */}
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 border-2 border-black rounded-full opacity-20"
          />
          
          {/* Círculo medio */}
          <motion.div
            animate={{
              rotate: [0, -360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-4 border-2 border-black rounded-full opacity-40"
          />
          
          {/* Círculo interior */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-8 border-2 border-black rounded-full"
          />

          {/* Punto central */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </motion.div>
        </div>

        {/* Texto con animación elegante */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-serif text-black mb-3 tracking-tight">
            Hotel Mirage
          </h2>
          <div className="w-12 h-px bg-black mx-auto mb-4"></div>
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-sm text-gray-600 tracking-widest uppercase"
          >
            Cargando...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default PantallaCarga;