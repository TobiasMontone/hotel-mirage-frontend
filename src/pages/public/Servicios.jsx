// frontend/src/pages/public/Servicios.jsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSpa, 
  FaSwimmingPool, 
  FaUtensils, 
  FaDumbbell, 
  FaWifi, 
  FaConciergeBell,
  FaParking,
  FaCocktail,
  FaHeart,
  FaTimes,
  FaPlay
} from 'react-icons/fa';

const Servicios = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Hero Section con Video de Fondo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Contenido Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-white"></div>
            <div className="w-3 h-3 border-2 border-white rounded-full"></div>
            <div className="w-16 h-px bg-white"></div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-tight">
            Servicios Exclusivos
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 tracking-wide">
            Experiencias diseñadas para tu bienestar y confort
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-sm tracking-widest"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase">Descubre</span>
              <div className="w-px h-12 bg-white/50"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Servicios Principales con VIDEO DE BARCO/PLAYA DE FONDO */}
      <section className="py-32 relative overflow-hidden">
        {/* Video de fondo con playa/barco */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Video de barco/yate en el mar - Pexels */}
            <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          {/* Overlay oscuro para mejor legibilidad */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Patrón decorativo sutil */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.03) 50px,
              rgba(255, 255, 255, 0.03) 51px
            )`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-[0.3em] text-gray-300 uppercase mb-4">Nuestras Experiencias</p>
            <h2 className="text-5xl md:text-6xl font-serif mb-6">
              Momentos Inolvidables
            </h2>
            <div className="w-16 h-px bg-white mx-auto"></div>
          </motion.div>

          {/* Grid de servicios circulares */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {serviciosPrincipales.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setServicioSeleccionado(servicio)}
              >
                {/* Imagen circular */}
                <div className="relative mb-8 mx-auto" style={{ width: '280px', height: '280px' }}>
                  <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-white/20">
                    <img 
                      src={servicio.imagen}
                      alt={servicio.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="text-2xl text-white">{servicio.icono}</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Icono decorativo */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl shadow-xl"
                  >
                    {servicio.icono}
                  </motion.div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-serif mb-3">{servicio.titulo}</h3>
                  <p className="text-gray-300 leading-relaxed">{servicio.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección con IMAGEN de Spa/Masajes */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Imagen de Spa */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] group overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
                alt="Spa y Masajes"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Overlay decorativo */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 border-2 border-white/40 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 border border-white/60 rounded-full flex items-center justify-center">
                    <FaSpa className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-4">Wellness</p>
              <h2 className="text-5xl font-serif text-black mb-6">
                Spa & Bienestar
              </h2>
              <div className="w-16 h-px bg-black mb-8"></div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Sumérgete en una experiencia de relajación total. Nuestro spa cuenta con 
                tratamientos exclusivos diseñados para revitalizar tu cuerpo y mente.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Masajes terapéuticos y relajantes',
                  'Tratamientos faciales de lujo',
                  'Sauna y baño turco',
                  'Piscina climatizada',
                  'Yoga y meditación'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Reservar Tratamiento
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galería de Servicios Adicionales */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-4">Comodidades</p>
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-6">
              Servicios Adicionales
            </h2>
            <div className="w-16 h-px bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviciosAdicionales.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 text-center group hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-black mb-6 group-hover:bg-black transition-all duration-300">
                  <div className="text-3xl text-black group-hover:text-white transition-colors duration-300">
                    {servicio.icono}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-black mb-3">{servicio.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{servicio.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FaHeart className="text-5xl mx-auto mb-8 text-white" />
            <h2 className="text-5xl md:text-6xl font-serif mb-8">
              ¿Listo para Vivir la Experiencia?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Reserva ahora y disfruta de todos nuestros servicios exclusivos
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-black text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Hacer una Reserva
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal de Detalle de Servicio */}
      <AnimatePresence>
        {servicioSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setServicioSeleccionado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setServicioSeleccionado(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black text-white flex items-center justify-center z-10 hover:bg-gray-800 transition-colors"
              >
                <FaTimes />
              </button>

              <img 
                src={servicioSeleccionado.imagen}
                alt={servicioSeleccionado.titulo}
                className="w-full h-96 object-cover"
              />

              <div className="p-12">
                <h3 className="text-4xl font-serif text-black mb-6">{servicioSeleccionado.titulo}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {servicioSeleccionado.descripcionCompleta}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {servicioSeleccionado.detalles.map((detalle, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                      <p className="text-gray-600">{detalle}</p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  Solicitar Información
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Datos de servicios principales
const serviciosPrincipales = [
  {
    titulo: 'Spa & Wellness',
    descripcion: 'Tratamientos exclusivos para tu relajación y bienestar total',
    imagen: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    icono: <FaSpa />,
    descripcionCompleta: 'Nuestro spa de clase mundial ofrece una experiencia de relajación incomparable. Con tratamientos diseñados por expertos y productos de lujo, cada sesión está pensada para revitalizar tu cuerpo y renovar tu espíritu.',
    detalles: [
      'Masajes terapéuticos personalizados',
      'Tratamientos faciales premium',
      'Aromaterapia y reflexología',
      'Sauna finlandesa y baño turco',
      'Piscina climatizada con hidromasaje',
      'Área de relajación privada'
    ]
  },
  {
    titulo: 'Gastronomía',
    descripcion: 'Alta cocina con los mejores sabores regionales e internacionales',
    imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    icono: <FaUtensils />,
    descripcionCompleta: 'Descubre una experiencia culinaria excepcional en nuestro restaurante gourmet. Nuestros chefs combinan técnicas innovadoras con ingredientes locales de primera calidad.',
    detalles: [
      'Menú degustación de autor',
      'Carta de vinos selectos',
      'Desayuno buffet internacional',
      'Servicio a la habitación 24/7',
      'Chef privado disponible',
      'Opciones vegetarianas y veganas'
    ]
  },
  {
    titulo: 'Piscina & Bar',
    descripcion: 'Relájate junto a nuestra piscina infinita con vistas espectaculares',
    imagen: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80',
    icono: <FaSwimmingPool />,
    descripcionCompleta: 'Disfruta de momentos inolvidables en nuestra piscina climatizada con bar integrado. El lugar perfecto para relajarte mientras disfrutas de cócteles artesanales.',
    detalles: [
      'Piscina climatizada todo el año',
      'Bar de piscina con cócteles signature',
      'Camastros y cabañas privadas',
      'Servicio de toallas premium',
      'Snacks y comidas ligeras',
      'Música ambiente'
    ]
  }
];

// Datos de servicios adicionales
const serviciosAdicionales = [
  {
    titulo: 'Gimnasio',
    descripcion: 'Equipamiento de última generación y entrenadores personales',
    icono: <FaDumbbell />
  },
  {
    titulo: 'WiFi Premium',
    descripcion: 'Conexión de alta velocidad en todas las instalaciones',
    icono: <FaWifi />
  },
  {
    titulo: 'Concierge 24/7',
    descripcion: 'Asistencia personalizada en todo momento',
    icono: <FaConciergeBell />
  },
  {
    titulo: 'Estacionamiento',
    descripcion: 'Parking privado vigilado las 24 horas',
    icono: <FaParking />
  }
];

export default Servicios;