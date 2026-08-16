import {
  MapContainer,
  Polygon,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Rectangle,
  useMap
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',

  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',

  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

const puntosParqueadero = [
  [-1.0122617572453996, -79.4682858877737],
  [-1.0125032549290254, -79.4682998912032],
  [-1.012570971500396, -79.46748620024898],
  [-1.0123403901396444, -79.46746240847104]
]

const centroParqueadero = [
  -1.012416,
  -79.467881
]

function obtenerColor(estado) {
  if (estado === 'libre') {
    return '#14995d'
  }

  if (estado === 'ocupado') {
    return '#e45747'
  }

  return '#8a928d'
}

function AjustarVista() {
  const map = useMap()

  const bounds = L.latLngBounds(
    puntosParqueadero.map((punto) =>
      L.latLng(
        punto[0],
        punto[1]
      )
    )
  )

  map.fitBounds(
    bounds,
    {
      padding: [35, 35]
    }
  )

  return null
}

export default function MapaEstacionamiento({
  espacios = [],
  espacioSeleccionado = null,
  onSelect
}) {
  const boundingBox =
    espacioSeleccionado
      ?.ubicacion
      ?.boundingBox

  const boundsSeleccionado =
    boundingBox
      ? [
          [
            boundingBox.sur,
            boundingBox.oeste
          ],
          [
            boundingBox.norte,
            boundingBox.este
          ]
        ]
      : null

  const latitudSeleccionada =
    espacioSeleccionado
      ?.ubicacion
      ?.latitud

  const longitudSeleccionada =
    espacioSeleccionado
      ?.ubicacion
      ?.longitud

  return (
    <div className="map-wrap">

      <MapContainer
        center={centroParqueadero}
        zoom={19}
        scrollWheelZoom={true}
        className="map"
      >

        <AjustarVista />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ÁREA GENERAL DEL ESTACIONAMIENTO */}
        <Polygon
          positions={puntosParqueadero}
          pathOptions={{
            color: '#07864b',
            weight: 3,
            fillColor: '#14995d',
            fillOpacity: 0.08
          }}
        />

        {/* SENSORES */}
        {espacios.map((espacio) => {
          const latitud =
            espacio
              .ubicacion
              ?.latitud

          const longitud =
            espacio
              .ubicacion
              ?.longitud

          if (
            latitud == null ||
            longitud == null
          ) {
            return null
          }

          const seleccionado =
            espacioSeleccionado
              ?.id === espacio.id

          return (
            <CircleMarker
              key={espacio.id}
              center={[
                latitud,
                longitud
              ]}
              radius={
                seleccionado
                  ? 7
                  : 4
              }
              pathOptions={{
                color:
                  seleccionado
                    ? '#111111'
                    : obtenerColor(
                        espacio.estado
                      ),

                fillColor:
                  obtenerColor(
                    espacio.estado
                  ),

                fillOpacity: 1,

                weight:
                  seleccionado
                    ? 3
                    : 1
              }}
              eventHandlers={{
                click: () => {
                  if (onSelect) {
                    onSelect(
                      espacio
                    )
                  }
                }
              }}
            >

              <Popup>
                <div>

                  <strong>
                    {espacio.id}
                  </strong>

                  <br />

                  Estado:{' '}
                  {espacio.estado ||
                    'sin información'}

                  <br />

                  Distancia:{' '}
                  {espacio
                    .distanciaDetectada != null
                    ? `${espacio.distanciaDetectada} cm`
                    : 'Sin información'}

                  <br />

                  Columna:{' '}
                  {espacio.columna}

                  <br />

                  Espacio:{' '}
                  {espacio.numero}

                </div>
              </Popup>

            </CircleMarker>
          )
        })}

        {/* BOUNDING BOX DEL ESPACIO SELECCIONADO */}
        {boundsSeleccionado && (

          <Rectangle
            bounds={
              boundsSeleccionado
            }
            pathOptions={{
              color: '#1769e0',
              weight: 5,
              fillColor: '#1769e0',
              fillOpacity: 0.25
            }}
          >

            <Popup>
              <strong>
                Bounding Box de{' '}
                {espacioSeleccionado.id}
              </strong>
            </Popup>

          </Rectangle>
        )}

        {/* MARCADOR DEL ESPACIO SELECCIONADO */}
        {latitudSeleccionada != null &&
          longitudSeleccionada != null && (

            <Marker
              position={[
                latitudSeleccionada,
                longitudSeleccionada
              ]}
            >

              <Popup>
                <strong>
                  {espacioSeleccionado.id}
                </strong>

                <br />

                Estado:{' '}
                {espacioSeleccionado.estado}

                <br />

                Distancia:{' '}
                {espacioSeleccionado
                  .distanciaDetectada} cm
              </Popup>

            </Marker>
          )}

      </MapContainer>

    </div>
  )
}