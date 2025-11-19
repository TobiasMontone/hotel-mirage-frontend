// frontend/src/pages/public/Inicio.jsx

import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBed, FaConciergeBell, FaWifi, FaSwimmingPool, FaSpa, FaParking, FaChevronRight, FaStar } from 'react-icons/fa';
import { useRef, useMemo } from 'react';

const Inicio = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animaciones para el scroll del hero
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
  const y = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  
  // Animación del título con efecto de glitch/dispersión
  const titleOpacity = useTransform(heroScrollProgress, [0, 0.4, 0.7], [1, 1, 0]);
  const titleY = useTransform(heroScrollProgress, [0, 0.7], [0, -150]);
  const titleScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.3]);
  const titleBlur = useTransform(heroScrollProgress, [0, 0.5, 0.7], [0, 0, 10]);

  // Generar partículas futuristas
  const particles = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      isWhite: Math.random() > 0.5,
      opacity: Math.random() * 0.6 + 0.4,
    }));
  }, []);

  // Líneas de conexión entre partículas
  const lines = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="bg-white" ref={containerRef}>
      
      {/* HERO SECTION - Pantalla completa con efectos futuristas */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Imagen de fondo con parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            scale, 
            y: useTransform(heroScrollProgress, [0, 1], [0, 150]),
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" 
            alt="Hotel Mirage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </motion.div>

        {/* Grid futurista de fondo */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(heroScrollProgress, [0, 0.5], [0.15, 0]),
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }} />
        </motion.div>

        {/* Partículas futuristas flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: particle.isWhite ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)',
                boxShadow: particle.isWhite 
                  ? '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)' 
                  : '0 0 15px rgba(0, 0, 0, 0.8)',
              }}
              animate={{
                y: [0, -50, -100, -150],
                x: [0, Math.random() * 30 - 15, Math.random() * 50 - 25],
                opacity: [0, particle.opacity, particle.opacity, 0],
                scale: [0, 1, 1.2, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Líneas de conexión animadas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
          {lines.map((line) => (
            <motion.line
              key={line.id}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: line.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Círculos concéntricos que se expanden */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: useTransform(heroScrollProgress, [0, 0.3, 0.6], [0.2, 0.1, 0]),
          }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
              style={{
                width: `${300 + i * 150}px`,
                height: `${300 + i * 150}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Efecto de escaneo vertical */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundImage: [
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            ],
            backgroundPosition: ['0% 0%', '0% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '100% 200px',
          }}
        />

        {/* Contenido central */}
        <motion.div 
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
          style={{ opacity, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Título con efecto de glitch/dispersión */}
            <div className="relative mb-6">
              <motion.h1 
                className="text-6xl md:text-8xl font-serif tracking-tight relative z-10"
                style={{ 
                  opacity: titleOpacity,
                  y: titleY,
                  scale: titleScale,
                  filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
                }}
              >
                Hotel Mirage
              </motion.h1>

              {/* Efecto de glitch/duplicado */}
              <motion.h1 
                className="absolute top-0 left-0 right-0 text-6xl md:text-8xl font-serif tracking-tight text-white/20"
                style={{ 
                  y: titleY,
                  x: useTransform(heroScrollProgress, [0, 0.5], [0, 20]),
                  scale: titleScale,
                }}
              >
                Hotel Mirage
              </motion.h1>
              <motion.h1 
                className="absolute top-0 left-0 right-0 text-6xl md:text-8xl font-serif tracking-tight text-white/20"
                style={{ 
                  y: titleY,
                  x: useTransform(heroScrollProgress, [0, 0.5], [0, -20]),
                  scale: titleScale,
                }}
              >
                Hotel Mirage
              </motion.h1>

              {/* Partículas que emergen del texto */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                  style={{
                    opacity: useTransform(heroScrollProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 200],
                    y: [0, (Math.random() - 0.5) * 200],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Línea divisoria con animación */}
            <motion.div 
              className="relative h-px bg-white mx-auto mb-8 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              style={{
                width: '96px',
                opacity: useTransform(heroScrollProgress, [0, 0.5], [1, 0])
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Subtítulo */}
            <motion.p
              className="text-xl md:text-2xl font-light mb-12 tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                opacity: useTransform(heroScrollProgress, [0, 0.4], [1, 0]),
                y: useTransform(heroScrollProgress, [0, 0.5], [0, 50])
              }}
            >
              Donde el lujo encuentra la elegancia
            </motion.p>

            {/* Botón */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              style={{
                opacity: useTransform(heroScrollProgress, [0, 0.4], [1, 0]),
                y: useTransform(heroScrollProgress, [0, 0.5], [0, 80])
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                    to="/habitaciones"
                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Reservar Ahora</span>
                    <FaChevronRight className="text-sm relative z-10" />
                    
                    {/* Efecto de brillo al hacer hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6 }}
                    />
                </Link>

              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator futurista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            opacity: useTransform(heroScrollProgress, [0, 0.3], [1, 0])
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            className="text-white text-sm tracking-widest"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center p-2"
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(255,255,255,0.3)',
                    '0 0 20px rgba(255,255,255,0.6)',
                    '0 0 5px rgba(255,255,255,0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-2 bg-white rounded-full"
                />
              </motion.div>
              <span className="text-xs uppercase mt-2">Scroll</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* BIENVENIDA - Sección con imagen dividida */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Imagen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80" 
                alt="Lobby Hotel Mirage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Bienvenido</p>
                <h2 className="text-5xl md:text-6xl font-serif text-black mb-6">
                  Un Refugio de Elegancia
                </h2>
                <div className="w-16 h-px bg-black mb-8"></div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Hotel Mirage es un oasis de tranquilidad y sofisticación en Salta. 
                Combinamos el encanto de la arquitectura regional con las comodidades 
                modernas para ofrecerte una experiencia inolvidable.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Nuestro compromiso es brindarte un servicio excepcional, donde cada 
                detalle ha sido cuidadosamente pensado para tu confort y satisfacción.
              </p>

              <motion.div
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-3 text-black font-medium group cursor-pointer"
              >
                <Link to="/contacto" className="flex items-center gap-3">
                  Descubrir más
                  <FaChevronRight className="text-sm transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS - Grid de imágenes */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Experiencias</p>
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-6">
              Momentos Únicos
            </h2>
            <div className="w-16 h-px bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {experiencias.map((experiencia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] overflow-hidden mb-6">
                  <img 
                    src={experiencia.imagen} 
                    alt={experiencia.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>
                <h3 className="text-2xl font-serif text-black mb-3">{experiencia.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{experiencia.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS - Estilo minimalista */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Servicios</p>
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-6">
              Comodidades Exclusivas
            </h2>
            <div className="w-16 h-px bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border border-black mb-6 group-hover:bg-black transition-all duration-300">
                  <div className="text-2xl text-black group-hover:text-white transition-colors duration-300">
                    {servicio.icono}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-black mb-4">{servicio.nombre}</h3>
                <p className="text-gray-600 leading-relaxed">{servicio.descripcion}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/servicios"
              className="inline-flex items-center gap-3 border-2 border-black px-10 py-4 text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              Ver Todos los Servicios
              <FaChevronRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GALERÍA - Masonry style */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Galería</p>
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-6">
              Nuestras Instalaciones
            </h2>
            <div className="w-16 h-px bg-black mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galeria.map((imagen, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden group cursor-pointer ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                } ${index === 3 ? 'md:row-span-2' : ''}`}
              >
                <div className={`${index === 0 || index === 3 ? 'h-[500px]' : 'h-[240px]'}`}>
                  <img 
                    src={imagen.url} 
                    alt={imagen.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <p className="text-white text-xl font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {imagen.titulo}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FaStar className="text-white" />
                </motion.div>
              ))}
            </div>
            <blockquote className="text-3xl md:text-4xl font-serif mb-8 leading-relaxed">
              "Una experiencia inolvidable. El servicio es impecable y las instalaciones 
              superaron todas nuestras expectativas."
            </blockquote>
            <div className="w-16 h-px bg-white mx-auto mb-6"></div>
            <p className="text-gray-400 tracking-widest uppercase text-sm">María González</p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-8">
              Comienza Tu Experiencia
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Descubre el lujo y la elegancia que te esperan en Hotel Mirage
            </p>
            <Link
              to="/reservar"
              className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 text-lg font-medium hover:bg-gray-900 transition-all duration-300"
            >
              Reservar Ahora
              <FaChevronRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

// Datos
const experiencias = [
  {
    titulo: 'Habitaciones de Lujo',
    descripcion: 'Suites elegantes diseñadas para tu máximo confort y privacidad.',
    imagen: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80'
  },
  {
    titulo: 'Gastronomía',
    descripcion: 'Sabores excepcionales en nuestro restaurante de alta cocina.',
    imagen: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80'
  },
  {
    titulo: 'Bienestar',
    descripcion: 'Spa y piscina para tu relajación y renovación total.',
    imagen: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80'
  }
];

const servicios = [
  {
    nombre: 'Habitaciones Premium',
    descripcion: 'Espacios elegantes con todas las comodidades modernas',
    icono: <FaBed />
  },
  {
    nombre: 'WiFi de Alta Velocidad',
    descripcion: 'Conexión premium en todas las áreas del hotel',
    icono: <FaWifi />
  },
  {
    nombre: 'Piscina Climatizada',
    descripcion: 'Área de descanso y bar junto a la piscina',
    icono: <FaSwimmingPool />
  },
  {
    nombre: 'Spa & Wellness',
    descripcion: 'Tratamientos exclusivos de relajación',
    icono: <FaSpa />
  },
  {
    nombre: 'Concierge 24/7',
    descripcion: 'Asistencia personalizada en todo momento',
    icono: <FaConciergeBell />
  },
  {
    nombre: 'Estacionamiento',
    descripcion: 'Parking privado vigilado las 24 horas',
    icono: <FaParking />
  }
];

const galeria = [
  { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80', titulo: 'Suite Presidencial' },
  { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80', titulo: 'Piscina' },
  { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', titulo: 'Restaurante' },
  { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80', titulo: 'Spa' },
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', titulo: 'Recepción' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', titulo: 'Lobby' }
];

export default Inicio;