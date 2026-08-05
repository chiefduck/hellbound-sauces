import { useEffect, useRef } from 'react';

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
}

interface GoogleMapProps {
  locations: StoreLocation[];
}

declare global {
  interface Window {
    google?: typeof google;
  }
}

export function GoogleMap({ locations }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 },
      zoom: 4,
    });

    const bounds = new window.google.maps.LatLngBounds();
    let pointCount = 0;

    locations.forEach((location) => {
      if (location.latitude === null || location.longitude === null) return;

      const position = { lat: location.latitude, lng: location.longitude };
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: location.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: sans-serif; color: #111;">
            <strong>${location.name}</strong><br>
            ${location.address}<br>
            ${location.city}, ${location.state} ${location.zipCode}
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      bounds.extend(position);
      pointCount += 1;
    });

    if (pointCount === 1) {
      map.setCenter(bounds.getCenter());
      map.setZoom(11);
    } else if (pointCount > 1) {
      map.fitBounds(bounds);
    }
  }, [locations]);

  return <div ref={mapRef} className="w-full h-full" />;
}
