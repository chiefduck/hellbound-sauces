import { useEffect, useState } from 'react';

const SCRIPT_ID = 'google-maps-js';

export function useGoogleMapsScript(): boolean {
  const [loaded, setLoaded] = useState(!!window.google?.maps);

  useEffect(() => {
    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => setLoaded(true));
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  return loaded;
}
