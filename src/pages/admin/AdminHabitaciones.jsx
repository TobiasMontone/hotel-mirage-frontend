// frontend/src/pages/admin/AdminHabitaciones.jsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaPlus, 
  FaBed, 
  FaUsers, 
  FaEdit, 
  FaTrash,
  FaTimes,
  FaDollarSign,
  FaCheckCircle,
  FaRuler,
  FaBuilding,
  FaArrowLeft
} from 'react-icons/fa';
import { 
  obtenerHabitaciones, 
  obtenerTiposHabitaciones, 
  obtenerHabitacionesPorTipoAdmin, // ← NUEVO
  crearHabitacion, 
  actualizarHabitacion, 
  eliminarHabitacion 
} from '../../services/servicioHabitaciones';

const AdminHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [habitacionEditar, setHabitacionEditar] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    name: '',
    type: 'Simple',
    description: '',
    pricePerNight: 50000,
    capacity: 1,
    size: 25,
    amenities: [],
    floor: 1,
    view: 'Interior',
    status: 'disponible'
  });

  const tiposHabitacion = ['Simple', 'Doble', 'Triple', 'Suite', 'Suite Presidencial'];
  const amenidadesDisponibles = ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado', 'Minibar', 'Caja fuerte'];
  const vistas = ['Ciudad', 'Mar', 'Montaña', 'Jardín', 'Interior'];
  const estados = ['disponible', 'ocupada', 'mantenimiento', 'limpieza'];

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      
      // Cargar todas las habitaciones
      const habitacionesResult = await obtenerHabitaciones();
      if (habitacionesResult.success) {
        setHabitaciones(habitacionesResult.data);
      }

      // Cargar tipos con estadísticas
      const tiposResult = await obtenerTiposHabitaciones();
      if (tiposResult && tiposResult.data) {
        setTipos(tiposResult.data);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      toast.error('Error al cargar habitaciones');
    } finally {
      setCargando(false);
    }
  };

  // ✅ NUEVA FUNCIÓN: Cargar habitaciones por tipo con estado real
  const cargarHabitacionesPorTipo = async (tipo) => {
    try {
      setCargando(true);
      console.log('🔍 Cargando habitaciones tipo:', tipo);
      
      const result = await obtenerHabitacionesPorTipoAdmin(tipo);
      
      if (result.success) {
        console.log('✅ Habitaciones recibidas:', result.data);
        setHabitaciones(result.data);
      }
    } catch (error) {
      console.error('❌ Error al cargar habitaciones por tipo:', error);
      toast.error('Error al cargar habitaciones');
    } finally {
      setCargando(false);
    }
  };

  // ✅ MODIFICADO: Cuando selecciona un tipo, carga con estado real
  const handleSeleccionarTipo = async (tipo) => {
    setTipoSeleccionado(tipo);
    await cargarHabitacionesPorTipo(tipo);
  };

  const handleVolverATipos = () => {
    setTipoSeleccionado(null);
    cargarDatos(); // Recargar todas las habitaciones
  };

  const habitacionesFiltradas = tipoSeleccionado
    ? habitaciones.filter(h => h.type === tipoSeleccionado)
    : habitaciones;

  const abrirModal = (habitacion = null) => {
    if (habitacion) {
      setHabitacionEditar(habitacion);
      setFormData({
        roomNumber: habitacion.roomNumber,
        name: habitacion.name,
        type: habitacion.type,
        description: habitacion.description,
        pricePerNight: habitacion.pricePerNight,
        capacity: habitacion.capacity,
        size: habitacion.size,
        amenities: habitacion.amenities || [],
        floor: habitacion.floor,
        view: habitacion.view,
        status: habitacion.status
      });
    } else {
      setHabitacionEditar(null);
      setFormData({
        roomNumber: '',
        name: '',
        type: tipoSeleccionado || 'Simple',
        description: '',
        pricePerNight: 50000,
        capacity: 1,
        size: 25,
        amenities: [],
        floor: 1,
        view: 'Interior',
        status: 'disponible'
      });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setHabitacionEditar(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (habitacionEditar) {
        await actualizarHabitacion(habitacionEditar._id, formData);
        toast.success('Habitación actualizada exitosamente');
      } else {
        await crearHabitacion(formData);
        toast.success('Habitación creada exitosamente');
      }
      
      cerrarModal();
      
      // ✅ MODIFICADO: Recargar según el contexto
      if (tipoSeleccionado) {
        await cargarHabitacionesPorTipo(tipoSeleccionado);
      } else {
        await cargarDatos();
      }
    } catch (error) {
      console.error('Error al guardar habitación:', error);
      toast.error(error.response?.data?.message || 'Error al guardar habitación');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta habitación?')) {
      return;
    }

    try {
      await eliminarHabitacion(id);
      toast.success('Habitación eliminada exitosamente');
      
      // ✅ MODIFICADO: Recargar según el contexto
      if (tipoSeleccionado) {
        await cargarHabitacionesPorTipo(tipoSeleccionado);
      } else {
        await cargarDatos();
      }
    } catch (error) {
      console.error('Error al eliminar habitación:', error);
      toast.error('Error al eliminar habitación');
    }
  };

  // ✅ MODIFICADO: Usar estadoReal si existe, sino status
  const obtenerEstado = (habitacion) => {
    return habitacion.estadoReal || habitacion.status;
  };

  const estadoColors = {
    disponible: 'bg-green-50 text-green-700 border-green-200',
    ocupada: 'bg-red-50 text-red-700 border-red-200',
    mantenimiento: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    limpieza: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-black mb-2">Habitaciones</h1>
          <div className="w-16 h-px bg-black mb-4"></div>
          <p className="text-gray-600">
            {tipoSeleccionado 
              ? `Mostrando habitaciones tipo ${tipoSeleccionado}`
              : 'Gestión de habitaciones por tipo'}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => abrirModal()}
          className="px-6 py-3 bg-black text-white flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <FaPlus />
          Nueva Habitación
        </motion.button>
      </div>

      {/* Vista de Tipos (cuando no hay tipo seleccionado) */}
      {!tipoSeleccionado && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-serif text-black mb-2">Selecciona un tipo de habitación</h2>
            <p className="text-sm text-gray-600">Click en una card para ver todas las habitaciones de ese tipo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tipos.map((tipo, index) => {
              const porcentajeDisponible = tipo.cantidad > 0 
                ? Math.round((tipo.disponibles / tipo.cantidad) * 100)
                : 0;

              return (
                <motion.div
                  key={tipo.tipo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSeleccionarTipo(tipo.tipo)}
                  className="group cursor-pointer bg-white border-2 border-gray-200 hover:border-black transition-all duration-300"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200 group-hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-serif text-black group-hover:underline">
                        {tipo.tipo}
                      </h3>
                      <FaBed className="text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {tipo.cantidad} {tipo.cantidad === 1 ? 'habitación' : 'habitaciones'}
                    </p>
                  </div>

                  {/* Estadísticas */}
                  <div className="p-6">
                    {/* Barra de disponibilidad */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Disponibilidad</span>
                        <span className="text-lg font-serif text-black">{porcentajeDisponible}%</span>
                      </div>
                      
                      <div className="h-3 bg-gray-200 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${porcentajeDisponible}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className="text-green-600 flex items-center gap-1">
                          <FaCheckCircle />
                          {tipo.disponibles} disponibles
                        </span>
                        <span className="text-gray-500">
                          {tipo.cantidad - tipo.disponibles} ocupadas
                        </span>
                      </div>
                    </div>

                    {/* Info adicional */}
                    <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precio desde:</span>
                        <span className="font-medium text-black">
                          ${tipo.precioMinimo.toLocaleString('es-AR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacidad máx:</span>
                        <span className="font-medium text-black">
                          {tipo.capacidadMaxima} personas
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className={`px-3 py-2 text-center text-xs font-medium ${
                        porcentajeDisponible > 50 
                          ? 'bg-green-100 text-green-700' 
                          : porcentajeDisponible > 25
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {porcentajeDisponible > 50 
                          ? '✓ Buena disponibilidad' 
                          : porcentajeDisponible > 25
                          ? '⚠ Disponibilidad limitada'
                          : '✕ Baja disponibilidad'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Vista de Habitaciones Filtradas (cuando hay tipo seleccionado) */}
      {tipoSeleccionado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Botón volver */}
          <button
            onClick={handleVolverATipos}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <FaArrowLeft />
            Volver a tipos de habitaciones
          </button>

          {/* Grid de habitaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {habitacionesFiltradas.map((habitacion) => {
              const estado = obtenerEstado(habitacion); // ← USAR ESTADO REAL

              return (
                <motion.div
                  key={habitacion._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-200 p-4 hover:shadow-lg transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-serif text-black">#{habitacion.roomNumber}</h3>
                      <p className="text-xs text-gray-500">{habitacion.name}</p>
                    </div>
                    <div>
                      {/* Badge de estado */}
                      <span className={`px-2 py-1 text-xs font-medium border ${estadoColors[estado]} capitalize`}>
                        {estado}
                      </span>
                      {/* ✅ Badge adicional si tiene reserva pero status DB es diferente */}
                      {habitacion.tieneReservaActiva && habitacion.status !== 'ocupada' && (
                        <div className="mt-1 px-2 py-1 text-xs bg-orange-100 text-orange-700 border border-orange-200">
                          Con reserva
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaUsers className="text-xs" />
                        <span>{habitacion.capacity} personas</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaRuler className="text-xs" />
                        <span>{habitacion.size}m²</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaBuilding className="text-xs" />
                        <span>Piso {habitacion.floor}</span>
                      </div>
                      <div className="text-gray-600 text-xs">
                        Vista {habitacion.view}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Precio/noche:</span>
                        <span className="text-lg font-serif text-black">
                          ${habitacion.pricePerNight.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  {habitacion.amenities && habitacion.amenities.length > 0 && (
                    <div className="mb-4 pt-3 border-t border-gray-200">
                      <div className="flex flex-wrap gap-1">
                        {habitacion.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-600">
                            {amenity}
                          </span>
                        ))}
                        {habitacion.amenities.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600">
                            +{habitacion.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirModal(habitacion)}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FaEdit />
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(habitacion._id)}
                      className="px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {habitacionesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No hay habitaciones de tipo {tipoSeleccionado}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Modal Crear/Editar - MANTENER EL EXISTENTE */}
      <AnimatePresence>
        {mostrarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            {/* ... tu modal existente, no lo cambio ... */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHabitaciones;