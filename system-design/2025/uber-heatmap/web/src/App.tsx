import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import './App.css';

const centerLat = 37.77;
const centerLong = -122.44;
const radius = 2000;
const squareSize = Math.round(radius/10);

interface Location {
  Latitude: number;
  Longitude: number;
  Count: number;
}

async function updateLocations(setLocations: (value: React.SetStateAction<Location[]>) => void) {
  while (true) {
    await fetch(`http://localhost:8080/locations?lat=${centerLat}&long=${centerLong}&radius=${radius}&squareSize=${squareSize}`)
      .then(resp => resp.json())
      .then(data => setLocations(data.Locations));
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    updateLocations(setLocations)
  }, []);
  
  return (
    <div className="App">
      <MapContainer center={[centerLat, centerLong]} zoom={13} scrollWheelZoom={false} style={{ height: "800px", width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.length > 0 && 
          locations.map(l => (<Polygon pathOptions={{ fillColor: 'black', fillOpacity: l.Count/20 }} positions={getHexagonCorners(l.Latitude, l.Longitude)} key={`${l.Latitude},${l.Longitude}`} />))
        }
      </MapContainer>
    </div>
  );
}

function getHexagonCorners(lat: number, long: number): LatLngExpression[] {
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
