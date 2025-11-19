// frontend/src/pages/public/Habitaciones.jsx

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaBed, FaUsers, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { obtenerTiposHabitaciones } from '../../services/servicioHabitaciones';
import PantallaCarga from '../../components/common/PantallaCarga';

const Habitaciones = () => {
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Generar menos círculos para el patrón
  const patronCirculos = useMemo(() => {
    const circulos = [];
    const posiciones = [
      { x: 20, y: 25, r: 70 },
      { x: 65, y: 20, r: 80 },
      { x: 85, y: 70, r: 65 },
      { x: 30, y: 80, r: 75 },
    ];
    
    posiciones.forEach((pos, index) => {
      circulos.push({
        id: `circulo-${index}`,
        cx: `${pos.x}%`,
        cy: `${pos.y}%`,
        r: pos.r,
        delay: index * 1.2,
      });
    });
    
    return circulos;
  }, []);

  // Generar menos líneas diagonales
  const lineasDiagonales = useMemo(() => {
    const lineas = [];
    for (let i = 0; i < 6; i++) {
      const offset = i * 250 - 300;
      lineas.push({
        id: `linea-${i}`,
        x1: offset,
        y1: 0,
        x2: offset + 1800,
        y2: 100,
        delay: i * 0.8,
      });
    }
    return lineas;
  }, []);

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    try {
      setCargando(true);
      const result = await obtenerTiposHabitaciones();
      if (result && result.data) {
        setTipos(result.data);
      }
    } catch (error) {
      console.error('Error al cargar tipos:', error);
      toast.error('Error al cargar las habitaciones');
    } finally {
      setCargando(false);
    }
  };

  const handleVerTipo = (tipo) => {
    // Navegar a una página de detalle del tipo
    navigate(`/habitaciones/${tipo.toLowerCase().replace(/ /g, '-')}`);
  };

  if (cargando) {
    return <PantallaCarga />;
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Patrón de círculos y líneas diagonales - REDUCIDO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full">
          {/* Círculos que se llenan con trazo grueso */}
          {patronCirculos.map((circulo) => (
            <g key={circulo.id}>
              {/* Círculo principal que se dibuja */}
              <motion.circle
                cx={circulo.cx}
                cy={circulo.cy}
                r={circulo.r}
                fill="none"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.25, 0.25, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: circulo.delay,
                  ease: "easeInOut"
                }}
              />
              
              {/* Círculo interno */}
              <motion.circle
                cx={circulo.cx}
                cy={circulo.cy}
                r={Math.round(circulo.r * 0.6)}
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.2, 0.2, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: circulo.delay + 0.4,
                  ease: "easeInOut"
                }}
              />
            </g>
          ))}

          {/* Líneas diagonales que se llenan */}
          {lineasDiagonales.map((linea) => (
            <motion.line
              key={linea.id}
              x1={`${linea.x1}px`}
              y1={`${linea.y1}%`}
              x2={`${linea.x2}px`}
              y2={`${linea.y2}%`}
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.18, 0.18, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: linea.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Ondas circulares - ARREGLADO */}
          {[
            { cx: '40%', cy: '50%', delay: 0 },
            { cx: '75%', cy: '45%', delay: 3 },
          ].map((onda, index) => (
            <g key={`onda-${index}`}>
              {[0, 1].map((i) => (
                <motion.circle
                  key={`onda-${index}-${i}`}
                  cx={onda.cx}
                  cy={onda.cy}
                  r={50}
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{ 
                    scale: [0, 2, 2],
                    opacity: [0.3, 0, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: onda.delay + i * 0.8,
                    ease: "easeOut"
                  }}
                  style={{
                    transformOrigin: `${onda.cx} ${onda.cy}`
                  }}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        
        {/* Header con estilo elegante */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 border-2 border-black mx-auto flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-10 h-10 border border-black rounded-full"
              />
            </div>
          </motion.div>

          <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Descubre</p>
          <h1 className="text-6xl md:text-7xl font-serif text-black mb-6 tracking-tight">
            Nuestras Habitaciones
          </h1>
          <div className="w-16 h-px bg-black mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Elige el tipo de habitación perfecto para tu estadía
          </p>
        </motion.div>

        {/* Contador de tipos con círculo */}
        <div className="mb-12 flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="w-3 h-3 bg-black rounded-full"
          />
          <p className="text-sm tracking-wide text-gray-600 uppercase">
            {tipos.length} {tipos.length === 1 ? 'Tipo de Habitación' : 'Tipos de Habitaciones'} Disponibles
          </p>
        </div>

        {/* Grid de Tipos de Habitaciones */}
        {tipos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tipos.map((tipo, index) => (
              <motion.div
                key={tipo.tipo}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleVerTipo(tipo.tipo)}
                className="group cursor-pointer"
              >
                <div className="bg-white border-2 border-black hover:bg-black transition-all duration-300 overflow-hidden">
                  {/* Imagen */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {tipo.imagenes && tipo.imagenes.length > 0 ? (
                      <img
                        src={tipo.imagenes[0]}
                        alt={tipo.tipo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FaBed className="text-6xl text-gray-400" />
                      </div>
                    )}
                    
                    {/* Badge de disponibilidad */}
                    {tipo.disponibles > 0 && (
                      <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-medium flex items-center gap-1">
                        <FaCheckCircle />
                        {tipo.disponibles} disponibles
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-black group-hover:text-white mb-4 transition-colors">
                      {tipo.tipo}
                    </h3>

                    {/* Descripción corta */}
                    {tipo.descripcion && (
                      <p className="text-sm text-gray-600 group-hover:text-gray-300 mb-4 line-clamp-2">
                        {tipo.descripcion}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-300 transition-colors">
                        <FaBed />
                        <span>{tipo.cantidad} {tipo.cantidad === 1 ? 'habitación' : 'habitaciones'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-300 transition-colors">
                        <FaUsers />
                        <span>Hasta {tipo.capacidadMaxima} personas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-300 transition-colors">
                        <FaDollarSign />
                        <span>Desde ${tipo.precioMinimo.toLocaleString('es-AR')}/noche</span>
                      </div>
                    </div>

                    {/* Amenidades */}
                    {tipo.amenities && tipo.amenities.length > 0 && (
                      <div className="mb-4 pt-3 border-t border-gray-200 group-hover:border-gray-700">
                        <div className="flex flex-wrap gap-1">
                          {tipo.amenities.slice(0, 3).map((amenity, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 bg-gray-100 group-hover:bg-gray-800 text-xs text-gray-600 group-hover:text-gray-300 transition-colors"
                            >
                              {amenity}
                            </span>
                          ))}
                          {tipo.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 group-hover:bg-gray-800 text-xs text-gray-600 group-hover:text-gray-300 transition-colors">
                              +{tipo.amenities.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200 group-hover:border-gray-700">
                      <span className="text-sm font-medium text-black group-hover:text-white transition-colors">
                        Ver habitaciones →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-32"
          >
            <div className="relative inline-block mb-8">
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 border-2 border-black/20 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="w-20 h-20 border border-black/30 rounded-full flex items-center justify-center"
                >
                  <div className="w-12 h-12 bg-black/10 rounded-full"></div>
                </motion.div>
              </motion.div>
            </div>

            <h3 className="text-3xl font-serif text-black mb-4">
              No hay habitaciones disponibles
            </h3>
            <p className="text-gray-600 mb-8">
              Intenta nuevamente más tarde
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Habitaciones;