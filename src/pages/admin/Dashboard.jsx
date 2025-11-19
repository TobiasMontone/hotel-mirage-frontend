// frontend/src/pages/admin/Dashboard.jsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBed, 
  FaCalendarCheck, 
  FaDollarSign, 
  FaChartLine,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { obtenerEstadisticas } from '../../services/servicioAdmin';
import { toast } from 'react-toastify';

// Colores para los gráficos
const COLORS = ['#000000', '#404040', '#737373', '#a3a3a3', '#d4d4d4'];

const COLORS_STATUS = {
  pendiente: '#fbbf24',
  confirmada: '#22c55e',
  cancelada: '#ef4444',
  completada: '#3b82f6'
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setCargando(true);
      const result = await obtenerEstadisticas();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      toast.error('Error al cargar estadísticas');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No se pudieron cargar las estadísticas</p>
      </div>
    );
  }

  // Calcular porcentaje de ocupación real
  const ocupadas = stats.totals.rooms - stats.totals.availableRooms;
  const porcentajeOcupacion = stats.totals.rooms > 0 
    ? Math.round((ocupadas / stats.totals.rooms) * 100)
    : 0;

  const cards = [
    {
      title: 'Total Habitaciones',
      value: stats.totals.rooms,
      icon: FaBed,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      subtitle: `${stats.totals.availableRooms} disponibles`
    },
    {
      title: 'Reservas Activas',
      value: stats.totals.activeBookings,
      icon: FaCalendarCheck,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      subtitle: `${stats.totals.bookings} totales`
    },
    {
      title: 'Ingresos Totales',
      value: `$${stats.totals.revenue.toLocaleString('es-AR')}`,
      icon: FaDollarSign,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      subtitle: 'De reservas pagadas'
    },
    {
      title: 'Ocupación',
      value: `${porcentajeOcupacion}%`,
      icon: FaChartLine,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      subtitle: `${ocupadas} de ${stats.totals.rooms} ocupadas`
    }
  ];

  // Preparar datos para gráfico de pastel (Habitaciones por tipo)
  const dataHabitacionesPie = stats.roomsByType.map(item => ({
    name: item._id,
    value: item.count
  }));

  // Preparar datos para gráfico de barras (Reservas por estado)
  const dataReservasBarra = stats.bookingsByStatus.map(item => ({
    estado: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    cantidad: item.count,
    fill: COLORS_STATUS[item._id]
  }));

  // Preparar datos para gráfico de ingresos mensuales
  const dataIngresosMensuales = stats.monthlyRevenue && stats.monthlyRevenue.length > 0
    ? stats.monthlyRevenue.map(item => ({
        mes: new Date(item._id.year, item._id.month - 1).toLocaleDateString('es-AR', { month: 'short' }),
        ingresos: item.total,
        reservas: item.count
      }))
    : [];

  // Tooltip personalizado para moneda
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg">
          <p className="text-sm font-medium text-black">{label}</p>
          <p className="text-sm text-gray-600">
            ${payload[0].value.toLocaleString('es-AR')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-serif text-black mb-2">Dashboard</h1>
        <div className="w-16 h-px bg-black mb-4"></div>
        <p className="text-gray-600">Vista general del hotel</p>
      </motion.div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} flex items-center justify-center`}>
                  <Icon className={`text-2xl ${card.iconColor}`} />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-2">{card.title}</h3>
              <p className="text-3xl font-serif text-black mb-1">{card.value}</p>
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Gráfico de Pastel - Habitaciones por Tipo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 p-6"
        >
          <h2 className="text-xl font-serif text-black mb-4">Distribución de Habitaciones</h2>
          {dataHabitacionesPie.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataHabitacionesPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataHabitacionesPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No hay datos disponibles
            </div>
          )}
          
          {/* Leyenda personalizada */}
          <div className="mt-4 space-y-2">
            {dataHabitacionesPie.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-black">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gráfico de Barras - Reservas por Estado */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-gray-200 p-6"
        >
          <h2 className="text-xl font-serif text-black mb-4">Reservas por Estado</h2>
          {dataReservasBarra.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataReservasBarra}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '0'
                  }}
                />
                <Bar dataKey="cantidad" fill="#000000" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No hay datos disponibles
            </div>
          )}

          {/* Resumen de estados */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {stats.bookingsByStatus.map((item, index) => (
              <div 
                key={index} 
                className="p-3 text-center"
                style={{ 
                  backgroundColor: `${COLORS_STATUS[item._id]}10`,
                  borderLeft: `4px solid ${COLORS_STATUS[item._id]}`
                }}
              >
                <p className="text-xs text-gray-600 capitalize mb-1">{item._id}</p>
                <p className="text-2xl font-serif text-black">{item.count}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gráfico de Ingresos Mensuales */}
      {dataIngresosMensuales.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white border border-gray-200 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-black">Ingresos Mensuales</h2>
            <div className="text-right">
              <p className="text-xs text-gray-600">Total del período</p>
              <p className="text-2xl font-serif text-black">
                ${dataIngresosMensuales.reduce((acc, item) => acc + item.ingresos, 0).toLocaleString('es-AR')}
              </p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataIngresosMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ingresos" 
                stroke="#000000" 
                strokeWidth={2}
                dot={{ fill: '#000000', r: 4 }}
                activeDot={{ r: 6 }}
                name="Ingresos"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Tabla de detalles */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dataIngresosMensuales.map((item, index) => (
                <div key={index} className="text-center p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 mb-1 uppercase">{item.mes}</p>
                  <p className="text-xl font-serif text-black mb-1">
                    ${item.ingresos.toLocaleString('es-AR')}
                  </p>
                  <p className="text-xs text-gray-500">{item.reservas} reservas</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Métricas adicionales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Promedio de ocupación */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-sm text-gray-600 mb-2">Tasa de Ocupación</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-serif text-black">{porcentajeOcupacion}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${porcentajeOcupacion}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {ocupadas} de {stats.totals.rooms} habitaciones ocupadas
          </p>
        </div>

        {/* Ingreso promedio por reserva */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-sm text-gray-600 mb-2">Ingreso Promedio por Reserva</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-serif text-black">
              ${stats.totals.bookings > 0 
                ? Math.round(stats.totals.revenue / stats.totals.bookings).toLocaleString('es-AR')
                : 0}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Basado en {stats.totals.bookings} reservas
          </p>
        </div>

        {/* Habitaciones disponibles */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-sm text-gray-600 mb-2">Disponibilidad</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-serif text-black">
              {stats.totals.availableRooms}
            </span>
            <span className="text-xl text-gray-400 mb-1">
              / {stats.totals.rooms}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Habitaciones disponibles ahora
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;