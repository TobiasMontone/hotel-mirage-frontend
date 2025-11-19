// frontend/src/components/common/MapaHotel.jsx
// Versión corregida

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const MapaHotel = ({ 
  altura = '500px',
  mostrarControles = true,
  zoom = 15
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  // Coordenadas del Hotel Mirage en Salta, Argentina
  const HOTEL_LOCATION = {
    longitude: -65.4165,
    latitude: -24.7859,
    nombre: 'Hotel Mirage',
    direccion: 'Av. Principal 123, Salta, Argentina'
  };

  useEffect(() => {
    // Prevenir doble inicialización
    if (map.current) return;

    console.log('🗺️ Iniciando mapa...');
    console.log('📍 Token:', import.meta.env.VITE_MAPBOX_TOKEN);

    // Configurar token de Mapbox
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    try {
      // Crear mapa
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [HOTEL_LOCATION.longitude, HOTEL_LOCATION.latitude],
        zoom: zoom,
        pitch: 0,
        bearing: 0
      });

      console.log('✅ Mapa creado exitosamente');

      // Agregar controles después de que el mapa cargue
      map.current.on('load', () => {
        console.log('✅ Mapa cargado');

        // Agregar controles de navegación
        if (mostrarControles) {
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
        }

        // Crear elemento del marcador personalizado
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div style="
            width: 48px;
            height: 48px;
            background-color: black;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 4px solid white;
            cursor: pointer;
            position: relative;
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 48px;
              height: 48px;
              background-color: black;
              border-radius: 50%;
              opacity: 0.3;
              animation: pulse 2s infinite;
              z-index: -1;
            "></div>
          </div>
        `;

        // Agregar estilo de animación
        if (!document.getElementById('mapbox-marker-styles')) {
          const style = document.createElement('style');
          style.id = 'mapbox-marker-styles';
          style.textContent = `
            @keyframes pulse {
              0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
              50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
              100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .custom-marker:hover {
              animation: bounce 2s infinite;
            }
          `;
          document.head.appendChild(style);
        }

        // Agregar marcador al mapa
        marker.current = new mapboxgl.Marker(markerElement)
          .setLngLat([HOTEL_LOCATION.longitude, HOTEL_LOCATION.latitude])
          .addTo(map.current);

        // Evento click en el marcador
        markerElement.addEventListener('click', () => {
          setMostrarPopup(true);
        });

        console.log('✅ Marcador agregado');
      });

      map.current.on('error', (e) => {
        console.error('❌ Error del mapa:', e);
      });

    } catch (error) {
      console.error('❌ Error al crear el mapa:', error);
    }

    // Cleanup
    return () => {
      if (marker.current) {
        marker.current.remove();
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Array vacío para ejecutar solo una vez

  return (
    <div className="relative w-full" style={{ height: altura }}>
      {/* Contenedor del mapa */}
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ minHeight: altura }}
      />

      {/* Popup con información */}
      <AnimatePresence>
        {mostrarPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-6 shadow-2xl border border-gray-200 min-w-[300px] max-w-[400px] z-50"
          >
            <button
              onClick={() => setMostrarPopup(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 hover:text-black"
            >
              <FaTimes />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-black mb-1">
                  {HOTEL_LOCATION.nombre}
                </h3>
                <div className="w-12 h-px bg-black mb-2"></div>
                <p className="text-sm text-gray-600">
                  {HOTEL_LOCATION.direccion}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${HOTEL_LOCATION.latitude},${HOTEL_LOCATION.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-black text-white text-center text-sm hover:bg-gray-800 transition-colors"
              >
                Cómo llegar
              </a>
              <a
                href={`tel:+543871234567`}
                className="block w-full py-3 px-4 border-2 border-black text-black text-center text-sm hover:bg-gray-50 transition-colors"
              >
                Llamar al hotel
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapaHotel;