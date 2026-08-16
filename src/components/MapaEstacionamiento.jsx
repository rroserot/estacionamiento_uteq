import { MapContainer, Polygon, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

const puntos = [
  [-1.0122617572453996, -79.4682858877737],
  [-1.0125032549290254, -79.4682998912032],
  [-1.012570971500396, -79.46748620024898],
  [-1.0123403901396444, -79.46746240847104]
]

const centro = [-1.012416, -79.467881]

export default function MapaEstacionamiento({ espacio }) {
  const marker =
    espacio?.ubicacion?.latitud && espacio?.ubicacion?.longitud
      ? [espacio.ubicacion.latitud, espacio.ubicacion.longitud]
      : centro

  return (
    <div className="map-wrap">
      <MapContainer center={centro} zoom={19} scrollWheelZoom className="map">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon positions={puntos} />
        <Marker position={marker}>
          <Popup>
            {espacio ? espacio.id : 'Parqueadero inteligente UTEQ'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
