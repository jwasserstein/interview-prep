import { LatLngExpression, Map as LeafletMap } from 'leaflet';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { MapContainer, Polygon, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import debounce from 'debounce';
import './App.css';

interface Location {
  Latitude: number;
  Longitude: number;
  Count: number;
}
interface LocationsResponse {
  Locations: Location[];
}

async function onRefresh(
  lat: number,
  long: number,
  radius: number,
  setLocations: (locations: Location[]) => void,
  setLoadTime: (loadTime: number) => void
): Promise<void> {
  const startTime = Date.now();

  const response = await fetch(`http://localhost:8080/locations?lat=${lat}&long=${long}&radius=${radius.toFixed(0)}&squareSize=${Math.round(radius/10)}`);
  const json = (await response.json()) as LocationsResponse;

  setLocations(json.Locations);
  setLoadTime(Date.now() - startTime);
}

function Map({
  setLoadTime,
}: {
  setLoadTime: (loadTime: number) => void;
}) {
  const [locations, setLocations] = useState<Location[]>([]);

  const map = useMap();
  const lat = map.getCenter().lat;
  const long = map.getCenter().lng;
  const radius = Math.abs(map.getBounds().getNorthWest().lat - map.getBounds().getSouthWest().lat)*111_111;

  const onUpdate = useRef(debounce((lat: number, long: number, radius: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (params.has('lat')) params.delete('lat');
    if (params.has('long')) params.delete('long');
    if (params.has('radius')) params.delete('radius');
    
    params.set('lat', lat.toFixed(7));
    params.set('long', long.toFixed(7));
    params.set('radius', radius.toFixed(0));

    onRefresh(lat, long, radius, setLocations, setLoadTime);

    window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
  }, 100));
  useMapEvent('move', () => onUpdate.current(lat, long, radius));

  const maxCount = Math.max(...locations.map(l => l.Count));

  return (
    <div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.length > 0 && 
        locations.map(l => (
          <Polygon
            pathOptions={{ color: 'black', fillColor: 'black', opacity: l.Count/maxCount, fillOpacity: l.Count/maxCount }}
            positions={getSquareCorners(l.Latitude, l.Longitude, Math.floor(radius/10))}
            key={`${l.Latitude},${l.Longitude}`}
          />
        ))
      }
    </div>
  );
}

function App() {
  const [loadTime, setLoadTime] = useState(0);
  const bannerHeight = 40;

  return (
    <div className="App">
      <div style={{ height: `${bannerHeight}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>Load Time: {loadTime}</span>
      </div>
      <MapContainer center={[37.77, -122.44]} zoom={13} scrollWheelZoom={false} style={{ height: `${window.innerHeight-bannerHeight}px`, width: "100%"}}>
        <Map setLoadTime={setLoadTime} />
      </MapContainer>
    </div>
  );
}

function getSquareCorners(lat: number, long: number, squareSize: number): LatLngExpression[] {
  const deltaLat = squareSize/111_111/2;
  const deltaLong = squareSize/(111_111*Math.cos(lat+deltaLat))/2;

  const corners: LatLngExpression[] = [
    { lat: lat - deltaLat, lng: long + deltaLong },
    { lat: lat + deltaLat, lng: long + deltaLong },
    { lat: lat + deltaLat, lng: long - deltaLong },
    { lat: lat - deltaLat, lng: long - deltaLong },
  ];

  return corners;
}

export default App;
