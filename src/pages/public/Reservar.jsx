// frontend/src/pages/public/Reservar.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { obtenerHabitacionPorId } from '../../services/servicioHabitaciones';
import { crearReserva, verificarDisponibilidad } from '../../services/servicioReservas';
import { crearPreferenciaPago } from '../../services/servicioMercadoPago';
import { FaUsers, FaBed, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaWifi, FaTv, FaSnowflake, FaShower, FaCoffee, FaParking, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import PantallaCarga from '../../components/common/PantallaCarga';

// Mapeo de imágenes por tipo de habitación
const IMAGENES_POR_TIPO = {
  'Simple': 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
  'Doble': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  'Triple': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'Suite': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'Suite Presidencial': 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'
};

// Iconos para amenities
const ICONOS_AMENITIES = {
  'WiFi': FaWifi,
  'wifi': FaWifi,
  'TV': FaTv,
  'tv': FaTv,
  'Aire acondicionado': FaSnowflake,
  'aire acondicionado': FaSnowflake,
  'Baño privado': FaShower,
  'baño privado': FaShower,
  'private bathroom': FaShower,
  'Desayuno': FaCoffee,
  'desayuno': FaCoffee,
  'breakfast': FaCoffee,
  'Estacionamiento': FaParking,
  'estacionamiento': FaParking,
  'parking': FaParking
};

const Reservar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [verificandoDisponibilidad, setVerificandoDisponibilidad] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [habitacion, setHabitacion] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [metodoPago, setMetodoPago] = useState(null); // 'efectivo' o 'mercadopago'
  
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    dni: '',
    telefono: '',
    fechaEntrada: '',
    fechaSalida: '',
    numeroPersonas: 1,
    observaciones: ''
  });

  useEffect(() => {
    if (id) {
      cargarHabitacion();
    }
  }, [id]);

  useEffect(() => {
    if (formData.fechaEntrada && formData.fechaSalida && id) {
      verificarDisponibilidadHabitacion();
    } else {
      setDisponibilidad(null);
    }
  }, [formData.fechaEntrada, formData.fechaSalida, id]);

  useEffect(() => {
    validarFormulario();
  }, [formData]);

  const cargarHabitacion = async () => {
    try {
      setCargando(true);
      const data = await obtenerHabitacionPorId(id);
      setHabitacion(data);
      setFormData(prev => ({ ...prev, numeroPersonas: 1 }));
    } catch (error) {
      console.error('Error al cargar habitación:', error);
      toast.error('Error al cargar la habitación');
      navigate('/habitaciones');
    } finally {
      setCargando(false);
    }
  };

  const verificarDisponibilidadHabitacion = async () => {
    try {
      setVerificandoDisponibilidad(true);
      const resultado = await verificarDisponibilidad({
        habitacionId: id,
        fechaEntrada: formData.fechaEntrada,
        fechaSalida: formData.fechaSalida
      });
      setDisponibilidad(resultado);
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
      setDisponibilidad({ disponible: false, mensaje: 'Error al verificar disponibilidad' });
    } finally {
      setVerificandoDisponibilidad(false);
    }
  };

  // Funciones de validación
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarTelefono = (telefono) => {
    const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return regex.test(telefono.replace(/\s/g, ''));
  };

  const validarDNI = (dni) => {
    const regex = /^\d{7,8}$/;
    return regex.test(dni.replace(/\./g, ''));
  };

  const validarNombre = (nombre) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    return regex.test(nombre.trim());
  };

  const validarFechas = () => {
    const erroresFechas = {};
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (formData.fechaEntrada) {
      const fechaEntrada = new Date(formData.fechaEntrada + 'T00:00:00');
      fechaEntrada.setHours(0, 0, 0, 0);
      
      if (fechaEntrada < hoy) {
        erroresFechas.fechaEntrada = 'La fecha de entrada no puede ser en el pasado';
      }
    }

    if (formData.fechaEntrada && formData.fechaSalida) {
      const fechaEntrada = new Date(formData.fechaEntrada + 'T00:00:00');
      const fechaSalida = new Date(formData.fechaSalida + 'T00:00:00');
      
      if (fechaSalida <= fechaEntrada) {
        erroresFechas.fechaSalida = 'La fecha de salida debe ser posterior a la de entrada';
      }

      const diferenciaDias = (fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24);
      if (diferenciaDias > 30) {
        erroresFechas.fechaSalida = 'La estadía no puede superar los 30 días';
      }
    }

    return erroresFechas;
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (tocado.nombre && !formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    } else if (tocado.nombre && !validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'Ingresa un nombre válido (solo letras)';
    }

    if (tocado.apellido && !formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es requerido';
    } else if (tocado.apellido && !validarNombre(formData.apellido)) {
      nuevosErrores.apellido = 'Ingresa un apellido válido (solo letras)';
    }

    if (tocado.correo && !formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es requerido';
    } else if (tocado.correo && !validarEmail(formData.correo)) {
      nuevosErrores.correo = 'Ingresa un correo válido';
    }

    if (tocado.dni && !formData.dni.trim()) {
      nuevosErrores.dni = 'El DNI es requerido';
    } else if (tocado.dni && !validarDNI(formData.dni)) {
      nuevosErrores.dni = 'Ingresa un DNI válido (7-8 dígitos)';
    }

    if (tocado.telefono && !formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (tocado.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido';
    }

    const erroresFechas = validarFechas();
    Object.assign(nuevosErrores, erroresFechas);

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const calcularNoches = () => {
    if (!formData.fechaEntrada || !formData.fechaSalida) return 0;
    const entrada = new Date(formData.fechaEntrada);
    const salida = new Date(formData.fechaSalida);
    const diferencia = salida - entrada;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  const calcularTotal = () => {
    const noches = calcularNoches();
    const precio = habitacion?.pricePerNight || 50000;
    return noches * precio;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTocado(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validarDatosParaPago = () => {
    // Marcar todos los campos como tocados
    setTocado({
      nombre: true,
      apellido: true,
      correo: true,
      dni: true,
      telefono: true,
      fechaEntrada: true,
      fechaSalida: true
    });

    if (!validarFormulario()) {
      toast.error('Por favor, completa correctamente todos los campos');
      return false;
    }

    if (!disponibilidad?.disponible) {
      toast.error('La habitación no está disponible para las fechas seleccionadas');
      return false;
    }

    if (formData.numeroPersonas > habitacion.capacity) {
      toast.error(`La habitación solo admite ${habitacion.capacity} personas`);
      return false;
    }

    return true;
  };

  const handlePagoEfectivo = async () => {
    if (!validarDatosParaPago()) return;

    try {
      const reservaData = {
        habitacion: id,
        cliente: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          dni: formData.dni,
          telefono: formData.telefono
        },
        fechaEntrada: formData.fechaEntrada,
        fechaSalida: formData.fechaSalida,
        numeroPersonas: parseInt(formData.numeroPersonas),
        observaciones: formData.observaciones,
        precioTotal: calcularTotal(),
        metodoPago: 'efectivo',
        estadoPago: 'pendiente'
      };

      await crearReserva(reservaData);
      toast.success('¡Reserva realizada exitosamente! Paga en efectivo al llegar. Revisa tu correo para la confirmación.');
      navigate('/');
    } catch (error) {
      console.error('Error al crear reserva:', error);
      toast.error(error.response?.data?.message || 'Error al realizar la reserva');
    }
  };

  const handlePagoMercadoPago = async () => {
    if (!validarDatosParaPago()) return;

    try {
      setProcesandoPago(true);
      
      const reservaData = {
        habitacion: id,
        habitacionData: {
          tipo: habitacion.type,
          numero: habitacion.roomNumber,
          precioNoche: habitacion.pricePerNight
        },
        cliente: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          dni: formData.dni,
          telefono: formData.telefono
        },
        fechaEntrada: formData.fechaEntrada,
        fechaSalida: formData.fechaSalida,
        numeroPersonas: parseInt(formData.numeroPersonas),
        noches: calcularNoches(),
        observaciones: formData.observaciones,
        precioTotal: calcularTotal()
      };

      // Crear la preferencia de pago en Mercado Pago
      const { init_point, preference_id } = await crearPreferenciaPago(reservaData);
      
      // Guardar el ID de preferencia en localStorage para recuperar después
      localStorage.setItem('mp_preference_id', preference_id);
      localStorage.setItem('reserva_temporal', JSON.stringify(reservaData));
      
      // Redirigir a Mercado Pago
      window.location.href = init_point;
      
    } catch (error) {
      console.error('Error al procesar pago con Mercado Pago:', error);
      toast.error(error.response?.data?.message || 'Error al procesar el pago');
      setProcesandoPago(false);
    }
  };

  if (cargando) {
    return <PantallaCarga />;
  }

  if (!habitacion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-gray-600">Habitación no encontrada</p>
      </div>
    );
  }

  const noches = calcularNoches();
  const total = calcularTotal();
  const tipoHabitacion = habitacion.type || 'Simple';
  const imagenUrl = habitacion.images?.[0] || IMAGENES_POR_TIPO[tipoHabitacion] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80';
  const precioNoche = habitacion.pricePerNight || 50000;
  const amenities = habitacion.amenities || ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado'];

  const formularioValido = Object.keys(errores).length === 0 && 
                          formData.nombre && 
                          formData.apellido && 
                          formData.correo && 
                          formData.dni && 
                          formData.telefono &&
                          formData.fechaEntrada &&
                          formData.fechaSalida;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-5">
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

      <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-black"></div>
            <div className="w-3 h-3 border-2 border-black rounded-full"></div>
            <div className="w-12 h-px bg-black"></div>
          </div>
          <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Reserva</p>
          <h1 className="text-5xl md:text-6xl font-serif text-black mb-6 tracking-tight">
            Completa tu Reserva
          </h1>
          <div className="w-16 h-px bg-black mx-auto"></div>
        </motion.div>

        {/* Grid: Información de habitación + Formulario */}
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Información de la habitación - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 border border-gray-200 overflow-hidden sticky top-24">
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={imagenUrl}
                  alt={tipoHabitacion}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-4 py-2">
                  <span className="text-xs tracking-widest uppercase text-black font-medium">
                    Habitación {habitacion.roomNumber}
                  </span>
                </div>
              </div>

              {/* Detalles */}
              <div className="p-6">
                <h3 className="text-2xl font-serif text-black mb-4">{tipoHabitacion}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaUsers className="text-black" />
                    <span>Capacidad: {habitacion.capacity} {habitacion.capacity === 1 ? 'persona' : 'personas'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaBed className="text-black" />
                    <span>{tipoHabitacion}</span>
                  </div>
                </div>

                {/* Descripción */}
                {habitacion.description && (
                  <div className="border-t border-gray-300 pt-4 mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {habitacion.description}
                    </p>
                  </div>
                )}

                {/* Amenities */}
                {amenities && amenities.length > 0 && (
                  <div className="border-t border-gray-300 pt-4 mb-6">
                    <h4 className="text-sm tracking-widest uppercase text-black font-medium mb-3">
                      Comodidades
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {amenities.map((amenity, index) => {
                        const IconComponent = ICONOS_AMENITIES[amenity] || ICONOS_AMENITIES[amenity.toLowerCase()] || FaCheckCircle;
                        return (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <IconComponent className="text-black flex-shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Precio */}
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Precio por noche:</span>
                    <span className="text-xl font-serif text-black">
                      ${precioNoche.toLocaleString('es-AR')}
                    </span>
                  </div>
                  
                  {noches > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                        <span>{noches} {noches === 1 ? 'noche' : 'noches'}:</span>
                        <span>${(precioNoche * noches).toLocaleString('es-AR')}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-black">Total:</span>
                          <span className="text-2xl font-serif text-black">
                            ${total.toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="space-y-8">
              
              {/* Datos Personales */}
              <div>
                <h3 className="text-2xl font-serif text-black mb-6">Datos Personales</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-white border ${
                        tocado.nombre && errores.nombre 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-black'
                      } text-black focus:outline-none transition-colors`}
                      placeholder="Tu nombre"
                    />
                    {tocado.nombre && errores.nombre && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.nombre}
                      </motion.p>
                    )}
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-white border ${
                        tocado.apellido && errores.apellido 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-black'
                      } text-black focus:outline-none transition-colors`}
                      placeholder="Tu apellido"
                    />
                    {tocado.apellido && errores.apellido && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.apellido}
                      </motion.p>
                    )}
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase();
                        handleChange({ target: { name: 'correo', value } });
                      }}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-white border ${
                        tocado.correo && errores.correo 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-black'
                      } text-black focus:outline-none transition-colors`}
                      placeholder="correo@ejemplo.com"
                      maxLength="100"
                      autoComplete="email"
                    />
                    {tocado.correo && errores.correo && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.correo}
                      </motion.p>
                    )}
                    {tocado.correo && !errores.correo && formData.correo && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" />
                        Correo válido
                      </motion.p>
                    )}
                  </div>

                  {/* DNI */}
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      DNI *
                    </label>
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-white border ${
                        tocado.dni && errores.dni 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-black'
                      } text-black focus:outline-none transition-colors`}
                      placeholder="12345678"
                    />
                    {tocado.dni && errores.dni && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.dni}
                      </motion.p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^[\d\s\-\(\)\+]*$/;
                        
                        if (regex.test(value) || value === '') {
                          handleChange(e);
                        }
                      }}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 bg-white border ${
                        tocado.telefono && errores.telefono 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-black'
                      } text-black focus:outline-none transition-colors`}
                      placeholder="+54 387 123-4567"
                      maxLength="20"
                    />
                    {tocado.telefono && errores.telefono && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.telefono}
                      </motion.p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Solo números, espacios, guiones y paréntesis
                    </p>
                  </div>

                  {/* Número de Personas */}
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Número de Personas *
                    </label>
                    <select
                      name="numeroPersonas"
                      value={formData.numeroPersonas}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-black focus:outline-none focus:border-black transition-colors"
                    >
                      {[...Array(habitacion.capacity)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Persona' : 'Personas'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Fechas de Reserva */}
              <div>
                <h3 className="text-2xl font-serif text-black mb-6">Fechas de Estadía</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Fecha de Entrada *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="fechaEntrada"
                        value={formData.fechaEntrada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 bg-white border ${
                          errores.fechaEntrada ? 'border-red-500' : 'border-gray-300'
                        } text-black focus:outline-none focus:border-black transition-colors`}
                      />
                      <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {errores.fechaEntrada && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.fechaEntrada}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                      Fecha de Salida *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="fechaSalida"
                        value={formData.fechaSalida}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        min={formData.fechaEntrada || new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 bg-white border ${
                          errores.fechaSalida ? 'border-red-500' : 'border-gray-300'
                        } text-black focus:outline-none focus:border-black transition-colors`}
                      />
                      <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {errores.fechaSalida && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errores.fechaSalida}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Indicador de disponibilidad */}
                {formData.fechaEntrada && formData.fechaSalida && !errores.fechaEntrada && !errores.fechaSalida && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    {verificandoDisponibilidad ? (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Verificando disponibilidad...</span>
                      </div>
                    ) : disponibilidad ? (
                      <div className={`flex items-center gap-2 p-4 border ${
                        disponibilidad.disponible 
                          ? 'border-green-200 bg-green-50 text-green-800' 
                          : 'border-red-200 bg-red-50 text-red-800'
                      }`}>
                        {disponibilidad.disponible ? (
                          <>
                            <FaCheckCircle />
                            <span className="text-sm font-medium">¡Habitación disponible!</span>
                          </>
                        ) : (
                          <>
                            <FaExclamationTriangle />
                            <span className="text-sm font-medium">
                              {disponibilidad.mensaje || 'Habitación no disponible para estas fechas'}
                            </span>
                          </>
                        )}
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm tracking-wide uppercase text-gray-700 mb-2">
                  Observaciones (Opcional)
                </label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  rows="4"
                  maxLength="500"
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-black focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Comentarios adicionales o solicitudes especiales..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.observaciones.length}/500 caracteres
                </p>
              </div>

              {/* SECCIÓN DE MÉTODOS DE PAGO */}
              <div className="border-t border-gray-300 pt-8">
                <h3 className="text-2xl font-serif text-black mb-6">Método de Pago</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Botón Pago en Efectivo */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: formularioValido && disponibilidad?.disponible ? 1.02 : 1 }}
                    whileTap={{ scale: formularioValido && disponibilidad?.disponible ? 0.98 : 1 }}
                    onClick={handlePagoEfectivo}
                    disabled={!formularioValido || !disponibilidad?.disponible || verificandoDisponibilidad}
                    className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-black bg-white text-black hover:bg-gray-50 transition-all disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 group"
                  >
                    <FaMoneyBillWave className="text-4xl group-disabled:text-gray-400" />
                    <div className="text-center">
                      <p className="font-medium text-lg">Pagar en Efectivo</p>
                      <p className="text-xs text-gray-600 mt-1 group-disabled:text-gray-400">
                        Paga al llegar al hotel
                      </p>
                    </div>
                  </motion.button>

                  {/* Botón Mercado Pago */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: formularioValido && disponibilidad?.disponible ? 1.02 : 1 }}
                    whileTap={{ scale: formularioValido && disponibilidad?.disponible ? 0.98 : 1 }}
                    onClick={handlePagoMercadoPago}
                    disabled={!formularioValido || !disponibilidad?.disponible || verificandoDisponibilidad || procesandoPago}
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-[#009ee3] text-white hover:bg-[#0084c7] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed group"
                  >
                    {procesandoPago ? (
                      <>
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-medium text-lg">Procesando...</p>
                      </>
                    ) : (
                      <>
                        <FaCreditCard className="text-4xl" />
                        <div className="text-center">
                          <p className="font-medium text-lg">Pagar con Mercado Pago</p>
                          <p className="text-xs opacity-90 mt-1">
                            Tarjetas de crédito/débito
                          </p>
                        </div>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Información adicional */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    💡 <strong>Pago seguro:</strong> Todos los pagos están protegidos y encriptados
                  </p>
                </div>
              </div>

              {/* Botón Volver */}
              <div className="flex justify-start">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/habitaciones')}
                  className="px-8 py-3 border-2 border-black text-black font-medium hover:bg-gray-50 transition-colors"
                >
                  ← Volver a Habitaciones
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Reservar;