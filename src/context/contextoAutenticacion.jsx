// frontend/src/context/ContextoAutenticacion.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

/**
 * CONTEXTO DE AUTENTICACIÓN
 * Maneja el estado global del usuario logueado
 */
const ContextoAutenticacion = createContext();

/**
 * HOOK PERSONALIZADO
 * Para usar el contexto fácilmente en cualquier componente
 */
export const useAuth = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de ProveedorAutenticacion');
  }
  return contexto;
};

/**
 * PROVEEDOR DEL CONTEXTO
 * Envuelve la aplicación y provee el estado de autenticación
 */
export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  /**
   * VERIFICAR SI HAY UN USUARIO LOGUEADO AL CARGAR LA APP
   */
  useEffect(() => {
    verificarUsuario();
  }, []);

  const verificarUsuario = async () => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (tokenGuardado && usuarioGuardado) {
      try {
        setToken(tokenGuardado);
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        cerrarSesion();
      }
    }
    setCargando(false);
  };

  /**
   * FUNCIÓN PARA HACER LOGIN
   */
  const iniciarSesion = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const { token: nuevoToken, user: nuevoUsuario } = response.data.data;

      // Guardar en localStorage
      localStorage.setItem('token', nuevoToken);
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));

      // Actualizar estado
      setToken(nuevoToken);
      setUsuario(nuevoUsuario);

      return { success: true, usuario: nuevoUsuario };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        mensaje: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };

  /**
   * FUNCIÓN PARA HACER LOGOUT
   */
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  /**
   * VERIFICAR SI EL USUARIO ES ADMIN
   */
  const esAdmin = () => {
    return usuario?.role === 'admin';
  };

  /**
   * VERIFICAR SI EL USUARIO ES OPERADOR O ADMIN
   */
  const esOperadorOAdmin = () => {
    return usuario?.role === 'admin' || usuario?.role === 'operador';
  };

  const valor = {
    usuario,
    token,
    cargando,
    iniciarSesion,
    cerrarSesion,
    esAdmin,
    esOperadorOAdmin,
    estaAutenticado: !!usuario
  };

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};

export default ContextoAutenticacion;