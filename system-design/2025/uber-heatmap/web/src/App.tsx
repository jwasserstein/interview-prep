import { LatLngExpression, Map as LeafletMap } from 'leaflet';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { MapContainer, Polygon, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import debounce from 'debounce';
import './App.css';

interface Location {
  NorthWestLatitude: number;
  NorthWestLongitude: number;
  SouthEastLatitude: number;
  SouthEastLongitude: number;
  Count: number;
}
interface LocationsResponse {
  Locations: Location[];
}

async function onRefresh(
  northWestLat: number,
  northWestLong: number,
  southEastLat: number,
  southEastLong: number,
  setLocations: (locations: Location[]) => void,
  setLoadTime: (loadTime: number) => void
): Promise<void> {
  const startTime = Date.now();

  const response = await fetch(`http://localhost:8080/locations?northWestLat=${northWestLat}&northWestLong=${northWestLong}&southEastLat=${southEastLat}&southEastLong=${southEastLong}`);
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
  const northWestLat = map.getBounds().getNorthWest().lat;
  const northWestLong = map.getBounds().getNorthWest().lng;
  const southEastLat = map.getBounds().getSouthEast().lat;
  const southEastLong = map.getBounds().getSouthEast().lng;

  const onUpdate = useRef(debounce((northWestLat: number, northWestLong: number, southEastLat: number, southEastLong: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (params.has('northWestLat')) params.delete('northWestLat');
    if (params.has('northWestLong')) params.delete('northWestLong');
    if (params.has('southEastLat')) params.delete('southEastLat');
    if (params.has('southEastLong')) params.delete('southEastLong');
    
    params.set('northWestLat', northWestLat.toFixed(7));
    params.set('northWestLong', northWestLong.toFixed(7));
    params.set('southWestLat', southEastLat.toFixed(7));
    params.set('southWestLong', southEastLong.toFixed(7));

    onRefresh(
      northWestLat,
      northWestLong,
      southEastLat,
      southEastLong,
      setLocations,
      setLoadTime,
    );

    window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
  }, 100));
  useMapEvent('move', () => onUpdate.current(northWestLat, northWestLong, southEastLat, southEastLong));

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
            positions={getSquareCorners(l)}
            key={Object.values(l).join(',')}
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

function getSquareCorners(location: Location): LatLngExpression[] {
  return [
    { lat: location.NorthWestLatitude, lng: location.NorthWestLongitude },
    { lat: location.NorthWestLatitude, lng: location.SouthEastLongitude },
    { lat: location.SouthEastLatitude, lng: location.SouthEastLongitude },
    { lat: location.SouthEastLatitude, lng: location.NorthWestLongitude },
  ];
}

export default App;
