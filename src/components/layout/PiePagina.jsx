// frontend/src/components/layout/PiePagina.jsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronRight
} from 'react-icons/fa';

const PiePagina = () => {
  const currentYear = new Date().getFullYear();

  const enlaces = {
    navegacion: [
      { nombre: 'Inicio', ruta: '/' },
      { nombre: 'Habitaciones', ruta: '/habitaciones' },
      { nombre: 'Servicios', ruta: '/servicios' },
      { nombre: 'Contacto', ruta: '/contacto' },
    ],
    legal: [
      { nombre: 'Términos y Condiciones', ruta: '/terminos' },
      { nombre: 'Política de Privacidad', ruta: '/privacidad' },
      { nombre: 'Política de Cancelación', ruta: '/cancelacion' },
      { nombre: 'Preguntas Frecuentes', ruta: '/faq' },
    ]
  };

  const redesSociales = [
    { nombre: 'Facebook', icono: <FaFacebookF />, url: '#' },
    { nombre: 'Instagram', icono: <FaInstagram />, url: '#' },
    { nombre: 'Twitter', icono: <FaTwitter />, url: '#' },
    { nombre: 'LinkedIn', icono: <FaLinkedinIn />, url: '#' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Círculos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 border-2 border-white rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 border border-white rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Sección superior */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Logo y descripción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-6 h-6 border border-white rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-serif">Hotel Mirage</h3>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Un oasis de elegancia y sofisticación en el corazón de Salta. 
                Donde cada detalle cuenta una historia de lujo y confort.
              </p>

              {/* Redes sociales */}
              <div className="flex items-center gap-4">
                {redesSociales.map((red, index) => (
                  <motion.a
                    key={index}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                    aria-label={red.nombre}
                  >
                    <span className="text-sm">{red.icono}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Enlaces rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm tracking-[0.2em] uppercase mb-6 font-medium">
                Navegación
              </h4>
              <ul className="space-y-3">
                {enlaces.navegacion.map((enlace, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={enlace.ruta}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                      {enlace.nombre}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm tracking-[0.2em] uppercase mb-6 font-medium">
                Contacto
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <FaMapMarkerAlt className="text-white mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    Av. Principal 123<br />
                    Salta, Argentina
                  </span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaPhone className="text-white flex-shrink-0" />
                  <a href="tel:+543874123456" className="text-sm hover:text-white transition-colors">
                    +54 387 412-3456
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FaEnvelope className="text-white flex-shrink-0" />
                  <a href="mailto:info@hotelmirage.com" className="text-sm hover:text-white transition-colors">
                    info@hotelmirage.com
                  </a>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="py-12 border-b border-white/10"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-white"></div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <div className="w-8 h-px bg-white"></div>
            </div>
            
            <h4 className="text-2xl font-serif mb-3">
              Mantente Informado
            </h4>
            <p className="text-gray-400 mb-6 text-sm">
              Suscríbete para recibir ofertas exclusivas y novedades
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
              >
                Suscribirse
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Enlaces legales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-8 border-b border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {enlaces.legal.map((enlace, index) => (
              <Link
                key={index}
                to={enlace.ruta}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {enlace.nombre}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Hotel Mirage. Todos los derechos reservados.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default PiePagina;