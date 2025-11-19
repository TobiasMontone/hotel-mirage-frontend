// frontend/src/components/common/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/servicioAuth';

/**
 * Componente para proteger rutas que requieren autenticación
 * 
 * Uso:
 * <Route path="/admin" element={
 *   <ProtectedRoute>
 *     <AdminPanel />
 *   </ProtectedRoute>
 * } />
 */
const ProtectedRoute = ({ children }) => {
  // Verificar si hay token en localStorage
  if (!isAuthenticated()) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/admin/login" replace />;
  }

  // Si está autenticado, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;