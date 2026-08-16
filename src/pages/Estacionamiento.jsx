import { useMemo, useState } from 'react'
import { ref, update, push, set } from 'firebase/database'
import { db } from '../services/firebase'
import useEspacios from '../hooks/useEspacios'
import useHistorialEspacio from '../hooks/useHistorialEspacio'
import ResumenEstacionamiento from '../components/ResumenEstacionamiento'
import FiltrosEspacios from '../components/FiltrosEspacios'
import CuadriculaEstacionamiento from '../components/CuadriculaEstacionamiento'
import HistorialEspacio from '../components/HistorialEspacio'
import MapaEstacionamiento from '../components/MapaEstacionamiento'

export default function Estacionamiento() {
  const { espacios, cargando, error } = useEspacios()
  const [estado, setEstado] = useState('todos')
  const [columna, setColumna] = useState(0)
  const [seleccionado, setSeleccionado] = useState(null)

  const espacioActual =
    espacios.find((e) => e.id === seleccionado?.id) || seleccionado || espacios[0] || null

  const { historial } = useHistorialEspacio(espacioActual?.id)

  const filtrados = useMemo(() => {
    return espacios.filter((espacio) => {
      const esSinInformacion = espacio.estado !== 'libre' && espacio.estado !== 'ocupado'
      const cumpleEstado =
        estado === 'todos' ||
        espacio.estado === estado ||
        (estado === 'sin-info' && esSinInformacion)
      const cumpleColumna = columna === 0 || espacio.columna === columna
      return cumpleEstado && cumpleColumna
    })
  }, [espacios, estado, columna])

  async function simularCambio(espacio) {
    if (!espacio) return
    const distancia = Number((10 + Math.random() * 190).toFixed(1))
    const nuevoEstado = distancia <= 50 ? 'ocupado' : 'libre'
    const fechaHora = Date.now()

    await update(ref(db, `espacios/${espacio.id}`), {
      distanciaDetectada: distancia,
      estado: nuevoEstado,
      fechaHora
    })

    const historialRef = push(ref(db, `historial/${espacio.id}`))
    await set(historialRef, {
      distanciaDetectada: distancia,
      estado: nuevoEstado,
      fechaHora
    })
  }

  if (cargando) return <main className="page loading">Cargando sensores...</main>
  if (error) return <main className="page loading">Error: {error}</main>

  return (
    <main className="page">
      <section className="hero compact">
        <div>
          <p className="eyebrow">CAMPUS UTEQ · QUEVEDO</p>
          <h1>Parqueadero inteligente</h1>
          <p className="hero-copy">
            Simulación de 80 sensores ultrasónicos organizados en cuatro columnas.
            Cada cuadro representa una plaza y se actualiza con información de Firebase RTDB.
          </p>
        </div>
        <div className="status-chip">● RTDB en vivo</div>
      </section>

      <ResumenEstacionamiento espacios={espacios} />

      <section className="dashboard-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">VISTA OPERATIVA</p>
              <h2>Disponibilidad por espacio</h2>
            </div>
            <div className="legend">
              <span><i className="dot free-dot"></i>Libre</span>
              <span><i className="dot occupied-dot"></i>Ocupado</span>
              <span><i className="dot unknown-dot"></i>Sin información</span>
              <span><i className="dot selected-dot"></i>Seleccionado</span>
            </div>
          </div>

          <FiltrosEspacios
            estado={estado}
            setEstado={setEstado}
            columna={columna}
            setColumna={setColumna}
          />

          <CuadriculaEstacionamiento
            espacios={filtrados}
            seleccionado={espacioActual}
            onSelect={setSeleccionado}
          />
        </article>

        <aside className="panel detail-panel">
          {espacioActual ? (
            <>
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">SENSOR SELECCIONADO</p>
                  <h2 className="sensor-title">
                    {String.fromCharCode(64 + espacioActual.columna)}
                    {String(espacioActual.numero).padStart(2, '0')}
                  </h2>
                </div>
                <span
                  className={`state-badge ${
                    espacioActual.estado === 'libre'
                      ? 'libre'
                      : espacioActual.estado === 'ocupado'
                        ? 'ocupado'
                        : 'unknown'
                  }`}
                >
                  {espacioActual.estado?.toUpperCase() || 'SIN INFORMACIÓN'}
                </span>
              </div>

              <div className="distance-card">
                <small>Distancia detectada</small>
                <strong>
                  {espacioActual.distanciaDetectada == null
                    ? 'Sin información'
                    : `${Number(espacioActual.distanciaDetectada).toFixed(0)} cm`}
                </strong>
                <div className="meter">
                  <span
                    style={{
                      width: `${
                        espacioActual.distanciaDetectada == null
                          ? 0
                          : Math.min(100, Number(espacioActual.distanciaDetectada) / 2)
                      }%`
                    }}
                  ></span>
                </div>
                <small>Umbral del sensor: 50 cm</small>
              </div>

              <dl className="sensor-data">
                <div><dt>ID RTDB</dt><dd>{espacioActual.id}</dd></div>
                <div><dt>COLUMNA / NÚMERO</dt><dd>{espacioActual.columna} / {espacioActual.numero}</dd></div>
                <div>
                  <dt>CENTRO GEOGRÁFICO</dt>
                  <dd>
                    {espacioActual.ubicacion?.latitud?.toFixed(6)}, {espacioActual.ubicacion?.longitud?.toFixed(6)}
                  </dd>
                </div>
                <div><dt>ÚLTIMA ACTUALIZACIÓN</dt><dd>{new Date(espacioActual.fechaHora).toLocaleString('es-EC')}</dd></div>
              </dl>

              <h3>Historial reciente</h3>
              <HistorialEspacio historial={historial} limite={6} />

              <button className="secondary-button" onClick={() => simularCambio(espacioActual)}>
                Simular cambio de estado
              </button>
            </>
          ) : (
            <p>Seleccione un espacio.</p>
          )}
        </aside>
      </section>

      <section className="panel map-section">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">GEOMETRÍA</p>
            <h2>Ubicación del estacionamiento</h2>
          </div>
        </div>
        <MapaEstacionamiento espacio={espacioActual} />
      </section>
    </main>
  )
}
