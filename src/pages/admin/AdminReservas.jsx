// frontend/src/pages/admin/AdminReservas.jsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaSearch,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBed,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaCheckCircle,
  FaBan,
  FaClock,
  FaFileAlt
} from 'react-icons/fa';
import { obtenerReservas, confirmarReserva, cancelarReserva, completarReserva } from '../../services/servicioReservas';

const AdminReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const estados = [
    { value: 'todas', label: 'Todas', color: 'bg-gray-100 text-gray-700' },
    { value: 'pendiente', label: 'Pendientes', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'confirmada', label: 'Confirmadas', color: 'bg-green-100 text-green-700' },
    { value: 'cancelada', label: 'Canceladas', color: 'bg-red-100 text-red-700' },
    { value: 'completada', label: 'Completadas', color: 'bg-blue-100 text-blue-700' }
  ];

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      setCargando(true);
      const result = await obtenerReservas();
      if (result.success) {
        setReservas(result.data);
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      toast.error('Error al cargar reservas');
    } finally {
      setCargando(false);
    }
  };

  const reservasFiltradas = reservas.filter(reserva => {
    // Filtro por estado
    if (filtroEstado !== 'todas' && reserva.status !== filtroEstado) {
      return false;
    }

    // Filtro por búsqueda
    if (busqueda) {
      const searchLower = busqueda.toLowerCase();
      return (
        reserva.guestInfo?.firstName?.toLowerCase().includes(searchLower) ||
        reserva.guestInfo?.lastName?.toLowerCase().includes(searchLower) ||
        reserva.guestInfo?.email?.toLowerCase().includes(searchLower) ||
        reserva.guestInfo?.dni?.toLowerCase().includes(searchLower) ||
        reserva.confirmationCode?.toLowerCase().includes(searchLower) ||
        reserva.room?.roomNumber?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const abrirModal = (reserva) => {
    setReservaSeleccionada(reserva);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setReservaSeleccionada(null);
  };

  const handleConfirmar = async (id) => {
    if (!window.confirm('¿Confirmar esta reserva?')) return;

    try {
      await confirmarReserva(id);
      toast.success('Reserva confirmada exitosamente');
      cargarReservas();
      cerrarModal();
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      toast.error('Error al confirmar reserva');
    }
  };

  const handleCancelar = async (id) => {
    if (!window.confirm('¿Cancelar esta reserva?')) return;

    try {
      await cancelarReserva(id);
      toast.success('Reserva cancelada exitosamente');
      cargarReservas();
      cerrarModal();
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      toast.error('Error al cancelar reserva');
    }
  };

  const handleCompletar = async (id) => {
    if (!window.confirm('¿Marcar esta reserva como completada?')) return;

    try {
      await completarReserva(id);
      toast.success('Reserva completada exitosamente');
      cargarReservas();
      cerrarModal();
    } catch (error) {
      console.error('Error al completar reserva:', error);
      toast.error('Error al completar reserva');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const estadoConfig = {
    pendiente: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: FaClock },
    confirmada: { color: 'bg-green-100 text-green-700 border-green-200', icon: FaCheckCircle },
    cancelada: { color: 'bg-red-100 text-red-700 border-red-200', icon: FaBan },
    completada: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: FaFileAlt }
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
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-black mb-2">Reservas</h1>
        <div className="w-16 h-px bg-black mb-4"></div>
        <p className="text-gray-600">Gestión de reservas de clientes</p>
      </div>

      {/* Filtros */}
      <div className="mb-6 space-y-4">
        {/* Búsqueda */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, email, DNI, código de confirmación..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
          />
        </div>

        {/* Filtros por estado */}
        <div className="flex gap-2 flex-wrap">
          {estados.map(estado => (
            <button
              key={estado.value}
              onClick={() => setFiltroEstado(estado.value)}
              className={`px-4 py-2 text-sm font-medium transition-colors border ${
                filtroEstado === estado.value
                  ? 'border-black bg-black text-white'
                  : `border-gray-300 ${estado.color} hover:border-gray-400`
              }`}
            >
              {estado.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      <div className="mb-4 text-sm text-gray-600">
        Mostrando <span className="font-medium text-black">{reservasFiltradas.length}</span> de{' '}
        <span className="font-medium text-black">{reservas.length}</span> reservas
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Habitación
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Fechas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Huéspedes
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No se encontraron reservas
                  </td>
                </tr>
              ) : (
                reservasFiltradas.map((reserva) => {
                  const config = estadoConfig[reserva.status];
                  const EstadoIcon = config.icon;

                  return (
                    <tr 
                      key={reserva._id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => abrirModal(reserva)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-mono text-gray-600">
                          {reserva.confirmationCode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-black">
                            {reserva.guestInfo?.firstName} {reserva.guestInfo?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{reserva.guestInfo?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaBed className="text-gray-400" />
                          <span className="text-sm text-gray-700">
                            #{reserva.room?.roomNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-700">{formatearFecha(reserva.checkIn)}</p>
                          <p className="text-gray-500 text-xs">→ {formatearFecha(reserva.checkOut)}</p>
                          <p className="text-gray-500 text-xs">{reserva.numberOfNights} noches</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FaUsers className="text-gray-400 text-xs" />
                          <span className="text-sm text-gray-700">{reserva.numberOfGuests}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-black">
                          ${reserva.totalPrice?.toLocaleString('es-AR')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border ${config.color} capitalize`}>
                          <EstadoIcon />
                          {reserva.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModal(reserva);
                          }}
                          className="text-sm text-black hover:underline"
                        >
                          Ver detalles →
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {mostrarModal && reservaSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header del modal */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-serif text-black">
                        Detalles de Reserva
                      </h2>
                      {(() => {
                        const config = estadoConfig[reservaSeleccionada.status];
                        const Icon = config.icon;
                        return (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium border ${config.color} capitalize`}>
                            <Icon />
                            {reservaSeleccionada.status}
                          </span>
                        );
                      })()}
                    </div>
                    <p className="text-sm text-gray-600">
                      Código: <span className="font-mono font-medium">{reservaSeleccionada.confirmationCode}</span>
                    </p>
                  </div>
                  <button
                    onClick={cerrarModal}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 space-y-6">
                {/* Información del Cliente */}
                <div>
                  <h3 className="text-lg font-serif text-black mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    Información del Cliente
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Nombre Completo
                      </label>
                      <p className="text-sm font-medium text-black">
                        {reservaSeleccionada.guestInfo?.firstName} {reservaSeleccionada.guestInfo?.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        DNI
                      </label>
                      <p className="text-sm font-medium text-black flex items-center gap-2">
                        <FaIdCard className="text-gray-400 text-xs" />
                        {reservaSeleccionada.guestInfo?.dni}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Email
                      </label>
                      <p className="text-sm text-black flex items-center gap-2">
                        <FaEnvelope className="text-gray-400 text-xs" />
                        {reservaSeleccionada.guestInfo?.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Teléfono
                      </label>
                      <p className="text-sm text-black flex items-center gap-2">
                        <FaPhone className="text-gray-400 text-xs" />
                        {reservaSeleccionada.guestInfo?.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información de la Habitación */}
                <div>
                  <h3 className="text-lg font-serif text-black mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <FaBed className="text-gray-400" />
                    Información de la Habitación
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Número de Habitación
                      </label>
                      <p className="text-sm font-medium text-black">
                        #{reservaSeleccionada.room?.roomNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Tipo
                      </label>
                      <p className="text-sm text-black">
                        {reservaSeleccionada.room?.type}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Precio por Noche
                      </label>
                      <p className="text-sm text-black">
                        ${reservaSeleccionada.roomPrice?.toLocaleString('es-AR')}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Número de Huéspedes
                      </label>
                      <p className="text-sm text-black flex items-center gap-2">
                        <FaUsers className="text-gray-400 text-xs" />
                        {reservaSeleccionada.numberOfGuests}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fechas y Pagos */}
                <div>
                  <h3 className="text-lg font-serif text-black mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    Fechas y Pagos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Check-in
                      </label>
                      <p className="text-sm font-medium text-black">
                        {formatearFecha(reservaSeleccionada.checkIn)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Check-out
                      </label>
                      <p className="text-sm font-medium text-black">
                        {formatearFecha(reservaSeleccionada.checkOut)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Número de Noches
                      </label>
                      <p className="text-sm text-black">
                        {reservaSeleccionada.numberOfNights} {reservaSeleccionada.numberOfNights === 1 ? 'noche' : 'noches'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Total a Pagar
                      </label>
                      <p className="text-xl font-serif text-black flex items-center gap-2">
                        <FaDollarSign className="text-gray-400 text-sm" />
                        ${reservaSeleccionada.totalPrice?.toLocaleString('es-AR')}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Método de Pago
                      </label>
                      <p className="text-sm text-black capitalize">
                        {reservaSeleccionada.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-gray-600 block mb-1">
                        Estado de Pago
                      </label>
                      <p className={`text-sm font-medium capitalize ${
                        reservaSeleccionada.paymentStatus === 'pagado' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {reservaSeleccionada.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observaciones */}
                {reservaSeleccionada.specialRequests && (
                  <div>
                    <h3 className="text-lg font-serif text-black mb-4 pb-2 border-b border-gray-200">
                      Solicitudes Especiales
                    </h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-4 border border-gray-200">
                      {reservaSeleccionada.specialRequests}
                    </p>
                  </div>
                )}

                {/* Acciones */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    {reservaSeleccionada.status === 'pendiente' && (
                      <button
                        onClick={() => handleConfirmar(reservaSeleccionada._id)}
                        className="flex-1 py-3 bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle />
                        Confirmar Reserva
                      </button>
                    )}
                    
                    {(reservaSeleccionada.status === 'pendiente' || reservaSeleccionada.status === 'confirmada') && (
                      <button
                        onClick={() => handleCancelar(reservaSeleccionada._id)}
                        className="flex-1 py-3 bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaBan />
                        Cancelar Reserva
                      </button>
                    )}

                    {reservaSeleccionada.status === 'confirmada' && (
                      <button
                        onClick={() => handleCompletar(reservaSeleccionada._id)}
                        className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaFileAlt />
                        Marcar como Completada
                      </button>
                    )}

                    <button
                      onClick={cerrarModal}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReservas;