// frontend/src/components/admin/LayoutAdmin.jsx

import { useState } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHotel, 
  FaTachometerAlt, 
  FaBed, 
  FaCalendarCheck, 
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import { isAuthenticated, getCurrentUser, logout } from '../../services/servicioAuth';
import { toast } from 'react-toastify';

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/habitaciones', icon: FaBed, label: 'Habitaciones' },
    { path: '/admin/reservas', icon: FaCalendarCheck, label: 'Reservas' }
  ];

  const handleLogout = () => {
    logout();
    toast.info('Sesión cerrada');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white flex items-center justify-center">
              <FaHotel className="text-black text-xl" />
            </div>
            <div>
              <h1 className="font-serif text-xl">Hotel Mirage</h1>
              <p className="text-xs text-gray-400 tracking-widest uppercase">Panel Admin</p>
            </div>
          </div>
        </div>

        {/* Menú */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full px-6 py-4 flex items-center gap-3 transition-colors ${
                  isActive 
                    ? 'bg-white text-black' 
                    : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <Icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Usuario y cerrar sesión */}
        <div className="border-t border-gray-800">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full py-3 border border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <FaSignOutAlt />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;