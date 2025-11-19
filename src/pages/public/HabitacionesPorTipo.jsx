// frontend/src/pages/public/HabitacionesPorTipo.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { obtenerHabitacionesDisponiblesPorTipo } from '../../services/servicioHabitaciones';
import TarjetaHabitacion from '../../components/room/TarjetaHabitacion';
import PantallaCarga from '../../components/common/PantallaCarga';

const HabitacionesPorTipo = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [habitaciones, setHabitaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Convertir el tipo de la URL a formato legible
  const tipoFormateado = tipo.replace(/-/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  useEffect(() => {
    cargarHabitacionesDisponibles();
  }, [tipo]);

  // 🔍 NUEVA VERSIÓN CON LOGS DE DEPURACIÓN
  const cargarHabitacionesDisponibles = async () => {
    try {
      setCargando(true);
      
      console.log('\n========== 🔍 DEBUG FRONTEND ==========');
      console.log('📋 Tipo solicitado:', tipoFormateado);
      
      const result = await obtenerHabitacionesDisponiblesPorTipo(tipoFormateado);
      
      console.log('✅ Respuesta del backend:', result);
      console.log('📊 Count:', result.count);
      console.log('📊 Data:', result.data);
      
      if (result && result.data) {
        console.log('\n🏨 HABITACIONES RECIBIDAS:');
        result.data.forEach((hab, index) => {
          console.log(`\n  [${index}] Habitación:`);
          console.log(`    - ID: ${hab._id}`);
          console.log(`    - Número: ${hab.roomNumber}`);
          console.log(`    - Nombre: ${hab.name}`);
          console.log(`    - Tipo: ${hab.type}`);
          console.log(`    - Capacidad: ${hab.capacity}`);
          console.log(`    - Precio: $${hab.pricePerNight}`);
          console.log(`    - Descripción: ${hab.description}`);
        });
        
        setHabitaciones(result.data);
        console.log('\n✅ Estado actualizado con', result.data.length, 'habitación(es)');
      }
      
      console.log('========== FIN DEBUG ==========\n');
      
    } catch (error) {
      console.error('❌ ERROR al cargar habitaciones:', error);
      toast.error('Error al cargar las habitaciones');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return <PantallaCarga />;
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(0, 0, 0, 0.03) 100px,
              rgba(0, 0, 0, 0.03) 102px
            )`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <button
            onClick={() => navigate('/habitaciones')}
            className="text-sm text-gray-600 hover:text-black mb-6 flex items-center gap-2 transition-colors"
          >
            ← Volver a tipos de habitaciones
          </button>

          <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">
            Habitaciones Disponibles
          </p>
          <h1 className="text-5xl md:text-6xl font-serif text-black mb-6 tracking-tight">
            {tipoFormateado}
          </h1>
          <div className="w-16 h-px bg-black mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            {habitaciones.length > 0
              ? 'Elige la habitación perfecta para tu estadía'
              : 'En este momento no hay habitaciones disponibles de este tipo'}
          </p>
        </motion.div>

        {/* Contador */}
        <div className="mb-12 flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-3 h-3 bg-black rounded-full"
          />
          <p className="text-sm tracking-wide text-gray-600 uppercase">
            {habitaciones.length}{' '}
            {habitaciones.length === 1
              ? 'habitación disponible'
              : 'habitaciones disponibles'}
          </p>
        </div>

        {/* Grid de habitaciones */}
        {habitaciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {habitaciones.map((habitacion, index) => (
              <motion.div
                key={habitacion._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TarjetaHabitacion habitacion={habitacion} />
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
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-32 h-32 border-2 border-black/20 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
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
              Todas las habitaciones de tipo {tipoFormateado} están ocupadas en
              este momento.
              <br />
              Intenta con otro tipo de habitación o vuelve más tarde.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/habitaciones')}
              className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Ver todos los tipos
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HabitacionesPorTipo;
