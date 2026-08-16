import { Link, useParams } from 'react-router-dom'
import useEspacios from '../hooks/useEspacios'
import useHistorialEspacio from '../hooks/useHistorialEspacio'
import HistorialEspacio from '../components/HistorialEspacio'
import MapaEstacionamiento from '../components/MapaEstacionamiento'

export default function DetalleEspacio() {
  const { id } = useParams()
  const { espacios, cargando } = useEspacios()
  const espacio = espacios.find((item) => item.id === id)
  const { historial } = useHistorialEspacio(id)

  if (cargando) return <main className="page loading">Cargando espacio...</main>
  if (!espacio) {
    return (
      <main className="page loading">
        <p>No se encontró el espacio solicitado.</p>
        <Link to="/estacionamiento">Volver</Link>
      </main>
    )
  }

  const bbox = espacio.ubicacion?.boundingBox || {}

  return (
    <main className="page">
      <section className="detail-hero">
        <div>
          <p className="eyebrow">DETALLE DEL ESPACIO</p>
          <h1>{espacio.id}</h1>
          <p>
            Columna {espacio.columna} · Espacio {espacio.numero}
          </p>
        </div>
        <span
          className={`state-badge ${
            espacio.estado === 'libre'
              ? 'libre'
              : espacio.estado === 'ocupado'
                ? 'ocupado'
                : 'unknown'
          }`}
        >
          {espacio.estado?.toUpperCase() || 'SIN INFORMACIÓN'}
        </span>
      </section>

      <section className="detail-layout">
        <article className="panel">
          <h2>Información actual</h2>
          <div className="detail-cards">
            <div>
              <span>Distancia</span>
              <strong>
                {espacio.distanciaDetectada == null
                  ? 'Sin información'
                  : `${espacio.distanciaDetectada} cm`}
              </strong>
            </div>
            <div><span>Estado</span><strong>{espacio.estado || 'Sin información'}</strong></div>
            <div><span>Actualización</span><strong>{new Date(espacio.fechaHora).toLocaleString('es-EC')}</strong></div>
          </div>

          <h3>Ubicación</h3>
          <dl className="sensor-data">
            <div><dt>Latitud</dt><dd>{espacio.ubicacion?.latitud}</dd></div>
            <div><dt>Longitud</dt><dd>{espacio.ubicacion?.longitud}</dd></div>
            <div><dt>Norte</dt><dd>{bbox.norte}</dd></div>
            <div><dt>Sur</dt><dd>{bbox.sur}</dd></div>
            <div><dt>Oeste</dt><dd>{bbox.oeste}</dd></div>
            <div><dt>Este</dt><dd>{bbox.este}</dd></div>
          </dl>
        </article>

        <article className="panel">
          <h2>Historial de cambios</h2>
          <HistorialEspacio historial={historial} />
        </article>
      </section>

      <section className="panel map-section">
        <h2>Mapa del espacio</h2>
        <MapaEstacionamiento espacio={espacio} />
      </section>
    </main>
  )
}
