// frontend/src/pages/admin/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaHotel } from 'react-icons/fa';
import { login } from '../../services/servicioAuth';

const Login = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    try {
      setCargando(true);
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Bienvenido ' + result.data.user.name);
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(0, 0, 0, 0.03) 100px,
            rgba(0, 0, 0, 0.03) 102px
          )`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        {/* Logo y título */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black mb-6">
            <FaHotel className="text-white text-3xl" />
          </div>
          
          <h1 className="text-4xl font-serif text-black mb-2">Hotel Mirage</h1>
          <div className="w-16 h-px bg-black mx-auto mb-4"></div>
          <p className="text-sm tracking-widest text-gray-500 uppercase">Panel de Administración</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-black focus:outline-none focus:border-black transition-colors"
                placeholder="admin@hotelmirage.com"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-black focus:outline-none focus:border-black transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Botón */}
          <motion.button
            type="submit"
            disabled={cargando}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-black text-white font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </motion.button>
        </form>

        {/* Link volver */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            ← Volver al sitio principal
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;