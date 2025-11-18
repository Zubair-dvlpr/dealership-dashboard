// GoogleMapComponent.jsx
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ locations = [] }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyD2TlQGlD0lFiw9m6gS5QHbgTbi3yVF9vM',
      version: 'weekly'
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const geocoder = new window.google.maps.Geocoder();

      // Center map fallback
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 43.6532, lng: -79.3832 }, // Toronto default
        zoom: 5
      });

      const infoWindow = new window.google.maps.InfoWindow();

      // Loop through locations
      locations.forEach(loc => {
        const addMarker = position => {
          const marker = new window.google.maps.Marker({
            position,
            map
          });

          // Info window content
          const content = `
            <div style="font-size:14px; color:#000000;">
              <strong>${loc?.name || 'Unknown'}</strong><br/>
              Vehicle: ${loc?.vehicle || 'N/A'}<br/>
              Phone: ${loc?.phone || 'N/A'}<br/>
              <a href="${
                loc?.shortLink || '#'
              }" target="_blank" style="color:#0000EE; text-decoration:underline;">View Offer</a>
            </div>
          `;

          marker.addListener('click', () => {
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
          });
        };

        // ✅ If geo.lat & geo.lng exist, use them
        if (loc.geo?.lat && loc.geo?.lng) {
          addMarker({ lat: loc.geo.lat, lng: loc.geo.lng });
        }
        // ❌ Else try postalCode with geocoder
        else if (loc.postalCode) {
          geocoder.geocode({ address: loc.postalCode }, (results, status) => {
            if (status === 'OK' && results[0]) {
              addMarker(results[0].geometry.location);
            } else {
              console.error('Geocode error:', status, loc.postalCode);
            }
          });
        }
      });
    });
  }, [locations]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px', borderRadius: '16px' }} />;
};

export default Map;
