// frontend/src/components/room/TarjetaHabitacion.jsx

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaBed, FaChevronRight } from 'react-icons/fa';

const TarjetaHabitacion = ({ habitacion, index = 0 }) => {
  // Extraer ID y crear valores por defecto
  const id = habitacion?._id || '';
  
  // Generar un número único basado en el ID (fallback si no hay roomNumber)
  const generateNumber = (id) => {
    if (!id) return 101;
    let num = 0;
    for (let i = 0; i < id.length; i++) {
      num += id.charCodeAt(i);
    }
    return 101 + (num % 50); // Números entre 101-150
  };

  // ✅ CORREGIDO - Usar los nombres de campos del modelo Room
  const tipo = habitacion?.type || 'Estándar';
  const numero = habitacion?.roomNumber || generateNumber(id);
  const capacidad = habitacion?.capacity || 2;
  const precio = habitacion?.pricePerNight || 0;
  const descripcion = habitacion?.description || 'Habitación elegante y confortable para tu estadía perfecta.';
  const nombre = habitacion?.name || `Habitación ${tipo} ${numero}`;

  // Obtener imagen única basada en el ID o usar la imagen del modelo
  const obtenerImagen = () => {
    // Si la habitación tiene imágenes, usar la primera
    if (habitacion?.images && habitacion.images.length > 0) {
      return habitacion.images[0];
    }

    // Pool de imágenes variadas como fallback
    const imagenes = [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ];

    // Usar el ID para seleccionar una imagen única
    let seed = 0;
    if (id) {
      for (let i = 0; i < id.length; i++) {
        seed += id.charCodeAt(i);
      }
    }

    return imagenes[seed % imagenes.length];
  };

  const imagenUrl = obtenerImagen();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-xl"
    >
      {/* Imagen de la habitación */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img 
          src={imagenUrl}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80';
          }}
        />
        
        {/* Overlay con círculo */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
          >
            <FaChevronRight className="text-white" />
          </motion.div>
        </div>

        {/* Badge de tipo - SUPERIOR IZQUIERDA */}
        <div className="absolute top-4 left-4 bg-white px-4 py-2">
          <span className="text-xs tracking-widest uppercase text-black font-medium">
            {tipo}
          </span>
        </div>

        {/* Badge de número - SUPERIOR DERECHA */}
        <div className="absolute top-4 right-4 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center border border-black/20">
          <span className="text-xs font-semibold">{numero}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Nombre de la habitación */}
        <div className="mb-4">
          <h3 className="text-xl font-serif text-black">
            {nombre}
          </h3>
          <div className="w-12 h-px bg-black mt-2"></div>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {descripcion}
        </p>

        {/* Detalles */}
        <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaUsers className="text-black" />
            <span>{capacidad} {capacidad === 1 ? 'Persona' : 'Personas'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBed className="text-black" />
            <span>{tipo}</span>
          </div>
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Desde</p>
            <p className="text-2xl font-serif text-black">
              ${precio.toLocaleString('es-AR')}
              <span className="text-sm text-gray-500 font-sans ml-1">/noche</span>
            </p>
          </div>

          <Link to={`/reservar/${habitacion._id}`}>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all"
            >
              Reservar
              <FaChevronRight className="text-sm" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TarjetaHabitacion;