// frontend/src/components/layout/BarraNavegacion.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/contextoAutenticacion';

const BarraNavegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { usuario, estaAutenticado, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
    setMenuAbierto(false);
  };

  const navLinks = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Habitaciones', ruta: '/habitaciones' },
    { nombre: 'Servicios', ruta: '/servicios' },
    { nombre: 'Contacto', ruta: '/contacto' },
  ];

  const isActive = (ruta) => location.pathname === ruta;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.span
                className="text-2xl font-serif text-black relative tracking-tight"
                whileHover={{ opacity: 0.7 }}
              >
                Hotel Mirage
              </motion.span>
            </Link>

            {/* Links de navegación - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.ruta}
                  to={link.ruta}
                  className="relative group"
                >
                  <span
                    className={`text-sm tracking-wide transition-colors duration-300 ${
                      isActive(link.ruta)
                        ? 'text-black'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {link.nombre}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-black transition-all duration-300 ${
                      isActive(link.ruta) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}

              {/* Botón de Reservar */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/habitaciones"  // <-- Cambiado aquí
                  className="bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  Reservar
                </Link>
              </motion.div>

              {/* Usuario / Login */}
              {estaAutenticado ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-black transition-colors">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-black">
                      <FaUser className="text-xs" />
                    </div>
                    <span className="text-sm">{usuario?.name}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-2">
                      <Link
                        to={usuario?.role === 'admin' ? '/admin' : '/operador'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Mi Panel
                      </Link>
                      <div className="h-px bg-gray-200 my-2" />
                      <button
                        onClick={handleCerrarSesion}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <FaSignOutAlt className="text-xs" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-black transition-colors border border-gray-300 hover:border-black"
                >
                  <FaUser className="text-xs" />
                  <span className="text-sm">Iniciar Sesión</span>
                </Link>
              )}
            </div>

            {/* Botón de menú móvil */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="md:hidden text-black text-2xl p-2"
            >
              {menuAbierto ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        <div className="h-px bg-gray-200" />
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-white shadow-xl"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.ruta}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.ruta}
                    onClick={() => setMenuAbierto(false)}
                    className={`block px-4 py-3 ${
                      isActive(link.ruta)
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.nombre}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4">
                <Link
                  to="/habitaciones"  // <-- Cambiado aquí
                  onClick={() => setMenuAbierto(false)}
                  className="block bg-black text-white px-4 py-3 text-center font-medium"
                >
                  Ver Habitaciones
                </Link>
              </div>

              {estaAutenticado && (
                <>
                  <div className="h-px bg-gray-200 my-4" />
                  <Link
                    to={usuario?.role === 'admin' ? '/admin' : '/operador'}
                    onClick={() => setMenuAbierto(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    Mi Panel ({usuario?.name})
                  </Link>
                  <button
                    onClick={handleCerrarSesion}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}

              {!estaAutenticado && (
                <Link
                  to="/admin/login"
                  onClick={() => setMenuAbierto(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 border border-gray-300"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BarraNavegacion;
