// frontend/src/components/common/RutaProtegida.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/contextoAutenticacion';

/**
 * COMPONENTE PARA PROTEGER RUTAS
 * Solo permite el acceso si el usuario está autenticado
 */
const RutaProtegida = ({ children, requiereAdmin = false }) => {
  const { estaAutenticado, esAdmin, cargando } = useAuth();

  // Mientras carga, mostrar loading
  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere admin y no es admin, redirigir al home
  if (requiereAdmin && !esAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, mostrar el contenido
  return children;
};

export default RutaProtegida;