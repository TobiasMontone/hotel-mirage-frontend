import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';
import MapaHotel from '../../components/common/MapaHotel';
import { enviarConsulta } from '../../services/emailService'; // ✅ IMPORTAR SERVICIO

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [enviando, setEnviando] = useState(false); // ✅ ESTADO DE CARGA

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ VALIDACIÓN BÁSICA
    if (!formData.nombre || !formData.correo || !formData.asunto || !formData.mensaje) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setEnviando(true); // ✅ MOSTRAR ESTADO DE CARGA

    try {
      // ✅ ENVIAR EMAIL CON EMAILJS
      const resultado = await enviarConsulta(formData);

      if (resultado.success) {
        toast.success('¡Mensaje enviado! Te responderemos pronto.');
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          asunto: '',
          mensaje: ''
        });
      } else {
        toast.error(resultado.message);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      toast.error('Ocurrió un error. Por favor, intenta nuevamente.');
    } finally {
      setEnviando(false); // ✅ OCULTAR ESTADO DE CARGA
    }
  };

  const infoContacto = [
    {
      icon: FaMapMarkerAlt,
      titulo: 'Dirección',
      contenido: 'Av. Principal 123',
      subtitulo: 'Salta, Argentina',
      color: 'black'
    },
    {
      icon: FaPhone,
      titulo: 'Teléfono',
      contenido: '+54 387 123-4567',
      subtitulo: 'Lun - Dom: 24 horas',
      link: 'tel:+543871234567',
      color: 'black'
    },
    {
      icon: FaWhatsapp,
      titulo: 'WhatsApp',
      contenido: '+54 387 458-3315',
      subtitulo: 'Respuesta inmediata',
      link: 'https://wa.me/5493874583315?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta%20sobre%20Hotel%20Mirage.',
      color: '#25D366',
      destacado: true
    },
    {
      icon: FaEnvelope,
      titulo: 'Email',
      contenido: 'info@hotelmirage.com',
      subtitulo: 'Respuesta en 24hs',
      link: 'mailto:info@hotelmirage.com',
      color: 'black'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
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

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Contáctanos</p>
            <h1 className="text-6xl md:text-7xl font-serif text-black mb-6 tracking-tight">
              Estamos Aquí
            </h1>
            <div className="w-16 h-px bg-black mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ¿Tienes alguna pregunta? Nuestro equipo está disponible 24/7 para asistirte
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mapa */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <MapaHotel altura="600px" />
      </motion.div>

      {/* Información de contacto + Formulario */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Cards de información */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-serif text-black mb-8">
              Información de Contacto
            </h2>

            {infoContacto.map((info, index) => {
              const Icon = info.icon;
              const bgColor = info.destacado ? 'bg-[#25D366]' : 'bg-gray-50';
              const borderColor = info.destacado ? 'border-[#25D366]' : 'border-gray-200';
              const textColor = info.destacado ? 'text-white' : 'text-black';
              const iconBg = info.destacado ? 'bg-white' : 'bg-black';
              const iconColor = info.destacado ? 'text-[#25D366]' : 'text-white';

              const content = (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`${bgColor} p-6 border-2 ${borderColor} hover:shadow-lg transition-all cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-12 h-12 ${iconBg} flex items-center justify-center flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`${iconColor} text-xl`} />
                    </motion.div>
                    <div>
                      <h3 className={`text-sm uppercase tracking-wide ${info.destacado ? 'text-white/80' : 'text-gray-500'} mb-2`}>
                        {info.titulo}
                      </h3>
                      <p className={`text-lg font-medium ${textColor} mb-1`}>
                        {info.contenido}
                      </p>
                      <p className={`text-sm ${info.destacado ? 'text-white/70' : 'text-gray-600'}`}>
                        {info.subtitulo}
                      </p>
                    </div>
                  </div>

                  {info.destacado && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-4 pt-4 border-t border-white/20"
                    >
                      <div className="flex items-center justify-center gap-2 text-white text-sm">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                        <span>Click para chatear ahora</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );

              return info.link ? (
                <a 
                  key={index} 
                  href={info.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : content;
            })}

            {/* Horarios */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-black text-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-white flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-300 mb-3">
                    Horarios
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Recepción:</span>
                      <span className="font-medium">24 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span className="font-medium">14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span className="font-medium">11:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-serif text-black mb-8">
              Envíanos un Mensaje
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-700 mb-2">
                    Correo *
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={enviando}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+54 387 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wide text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    disabled={enviando}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="Consulta sobre reserva">Consulta sobre reserva</option>
                    <option value="Servicios del hotel">Servicios del hotel</option>
                    <option value="Eventos y reuniones">Eventos y reuniones</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wide text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  disabled={enviando}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <motion.button
                whileHover={!enviando ? { scale: 1.02 } : {}}
                whileTap={!enviando ? { scale: 0.98 } : {}}
                type="submit"
                disabled={enviando}
                className={`w-full md:w-auto px-12 py-4 font-medium transition-colors ${
                  enviando 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                } text-white`}
              >
                {enviando ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar Mensaje'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;