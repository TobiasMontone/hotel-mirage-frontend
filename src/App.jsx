import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProveedorAutenticacion } from './context/contextoAutenticacion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AnimacionEntrada from './components/layout/AnimacionEntrada';
import BarraNavegacion from './components/layout/BarraNavegacion';
import PiePagina from './components/layout/PiePagina';
import RutaProtegida from './components/common/RutaProtegida';

import Inicio from './pages/public/Inicio';
import Habitaciones from './pages/public/Habitaciones';
import Servicios from './pages/public/Servicios';
import Contacto from './pages/public/Contacto';
import Reservar from './pages/public/Reservar';
import HabitacionesPorTipo from './pages/public/HabitacionesPorTipo';

import PagoExito from './pages/public/PagoExito';
import PagoError from './pages/public/PagoError';
import PagoPendiente from './pages/public/PagoPendiente';

import PanelOperador from './pages/protected/PanelOperador';
import PanelAdmin from './pages/protected/PanelAdmin';

import ProtectedRoute from './components/common/ProtectedRoute';
import LayoutAdmin from './components/admin/LayoutAdmin';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminHabitaciones from './pages/admin/AdminHabitaciones';
import AdminReservas from './pages/admin/AdminReservas';

function App() {
  const [animacionCompleta, setAnimacionCompleta] = useState(false);

  return (
    <Router>
      <ProveedorAutenticacion>
        {!animacionCompleta && (
          <AnimacionEntrada onComplete={() => setAnimacionCompleta(true)} />
        )}
        {animacionCompleta && (
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <Inicio />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/habitaciones"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <Habitaciones />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/habitaciones/:tipo"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <HabitacionesPorTipo />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/servicios"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <Servicios />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/contacto"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <Contacto />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/reservar/:id"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <Reservar />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/pago/exito"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <PagoExito />
                  </main>
                  <PiePagina />
                </div>
              }
            />
            <Route
              path="/pago/error"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <PagoError />
                  </main>
                  <PiePagina />
                </div>
              }
            />
            <Route
              path="/pago/pendiente"
              element={
                <div className="flex flex-col min-h-screen">
                  <BarraNavegacion />
                  <main className="flex-grow pt-20">
                    <PagoPendiente />
                  </main>
                  <PiePagina />
                </div>
              }
            />

            <Route
              path="/operador"
              element={
                <RutaProtegida>
                  <PanelOperador />
                </RutaProtegida>
              }
            />

            <Route
              path="/admin-old"
              element={
                <RutaProtegida requiereAdmin={true}>
                  <PanelAdmin />
                </RutaProtegida>
              }
            />

            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <LayoutAdmin />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="habitaciones" element={<AdminHabitaciones />} />
              <Route path="reservas" element={<AdminReservas />} />
            </Route>

            <Route path="*" element={<PaginaNoEncontrada />} />
          </Routes>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ProveedorAutenticacion>
    </Router>
  );
}

const PaginaNoEncontrada = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gold">404</h1>
        <p className="text-2xl text-white mt-4">Página no encontrada</p>
        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-gold text-black rounded-md hover:bg-gold/90 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default App;
