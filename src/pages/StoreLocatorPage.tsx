import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import { MapPin, Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoogleMap, type StoreLocation } from '@/components/store-locator/GoogleMap';
import { useGoogleMapsScript } from '@/hooks/useGoogleMapsScript';

const CSV_URL = import.meta.env.VITE_STORE_LOCATIONS_CSV_URL;

interface LocationRow {
  'Store Name'?: string;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Phone?: string;
  Hours?: string;
  Type?: string;
  Latitude?: string;
  Longitude?: string;
}

export default function StoreLocatorPage() {
  const mapsLoaded = useGoogleMapsScript();
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<StoreLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!CSV_URL) {
      setIsLoading(false);
      return;
    }

    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse<LocationRow>(csvText, { header: true });
        const mapped: StoreLocation[] = parsed.data.map((row, index) => {
          const lat = parseFloat(String(row.Latitude ?? '').trim());
          const lng = parseFloat(String(row.Longitude ?? '').trim());
          return {
            id: `${index}`,
            name: row['Store Name']?.trim() || 'Unknown',
            address: row.Address?.trim() || '',
            city: row.City?.trim() || '',
            state: row.State?.trim() || '',
            zipCode: String(row.Zip ?? ''),
            latitude: !isNaN(lat) ? lat : null,
            longitude: !isNaN(lng) ? lng : null,
          };
        });
        setLocations(mapped.filter((location) => location.name !== 'Unknown' || location.address));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredLocations = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return locations.filter(
      (location) =>
        location.name.toLowerCase().includes(term) ||
        location.city.toLowerCase().includes(term) ||
        location.state.toLowerCase().includes(term) ||
        location.zipCode.includes(searchTerm)
    );
  }, [locations, searchTerm]);

  const mappableLocations = useMemo(
    () => filteredLocations.filter((location) => location.latitude !== null && location.longitude !== null),
    [filteredLocations]
  );

  return (
    <Layout>
      <SEOHead
        title="Find HellBound Sauces Near You | Store Locator"
        description="Find retailers carrying HellBound Sauces hot sauces and BBQ rubs near you."
        canonical="/store-locator"
      />

      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-heading text-sm uppercase tracking-widest mb-4">
            <MapPin className="h-4 w-4" />
            Store Locator
          </div>
          <h1 className="font-display text-5xl lg:text-6xl mb-4">Find HellBound Near You</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            HellBound Sauces are available at select retailers. Search by city, state, or zip to find one nearby.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter city, state, or zip code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary h-4 w-4" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl mb-6">Locations</h2>

              {isLoading ? (
                <p className="text-muted-foreground">Loading locations...</p>
              ) : filteredLocations.length === 0 ? (
                <p className="text-muted-foreground">No locations found. Try a different search.</p>
              ) : (
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                  {filteredLocations.map((location) => (
                    <div key={location.id} className="border-b border-border pb-6 last:border-b-0">
                      <h3 className="font-heading text-lg">{location.name}</h3>
                      <p className="text-muted-foreground">{location.address}</p>
                      <p className="text-muted-foreground">
                        {location.city}, {location.state} {location.zipCode}
                      </p>
                      {location.address && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="mt-3">
                            <MapPin className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl overflow-hidden border border-border h-[600px] bg-secondary/40">
              {mapsLoaded ? (
                <GoogleMap locations={mappableLocations} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Loading map...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
