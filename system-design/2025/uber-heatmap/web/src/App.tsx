import { LatLngExpression } from 'leaflet';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import './App.css';

const centerLat = 37.77;
const centerLong = -122.44;
const sideLength = .002;

const squares: LatLngExpression[][] = [
  getHexagonCorners(centerLat, centerLong, sideLength),
  getHexagonCorners(centerLat + sideLength, centerLong, sideLength),
  getHexagonCorners(centerLat - sideLength, centerLong, sideLength),
  getHexagonCorners(centerLat, centerLong + sideLength, sideLength),
  getHexagonCorners(centerLat, centerLong - sideLength, sideLength),
];

function App() {
  
  return (
    <div className="App">
      <MapContainer center={[centerLat, centerLong]} zoom={13} scrollWheelZoom={false} style={{ height: "800px", width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon pathOptions={{ fillColor: 'black', fillOpacity: .25 }} positions={squares} />
      </MapContainer>
    </div>
  );
}

function getHexagonCorners(centerX: number, centerY: number, sideLength: number): LatLngExpression[] {
  const corners: LatLngExpression[] = [
    { lat: centerX - sideLength/2, lng: centerY + sideLength/2 },
    { lat: centerX + sideLength/2, lng: centerY + sideLength/2 },
    { lat: centerX + sideLength/2, lng: centerY - sideLength/2 },
    { lat: centerX - sideLength/2, lng: centerY - sideLength/2 },
  ];

  return corners;
}

export default App;
