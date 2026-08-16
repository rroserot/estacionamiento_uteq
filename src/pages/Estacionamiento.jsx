import {
  useMemo,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import {
  ref,
  update,
  push,
  set
} from 'firebase/database'

import { db } from '../services/firebase'

import useEspacios
  from '../hooks/useEspacios'

import useHistorialEspacio
  from '../hooks/useHistorialEspacio'

import ResumenEstacionamiento
  from '../components/ResumenEstacionamiento'

import FiltrosEspacios
  from '../components/FiltrosEspacios'

import CuadriculaEstacionamiento
  from '../components/CuadriculaEstacionamiento'

import HistorialEspacio
  from '../components/HistorialEspacio'

import MapaEstacionamiento
  from '../components/MapaEstacionamiento'

export default function Estacionamiento() {
  const navigate = useNavigate()

  const {
    espacios,
    cargando,
    error
  } = useEspacios()

  const [
    estado,
    setEstado
  ] = useState('todos')

  const [
    columna,
    setColumna
  ] = useState(0)

  const [
    seleccionado,
    setSeleccionado
  ] = useState(null)

  const espacioActual =
    espacios.find(
      (espacio) =>
        espacio.id === seleccionado?.id
    ) ||
    seleccionado ||
    espacios[0] ||
    null

  const {
    historial
  } = useHistorialEspacio(
    espacioActual?.id
  )

  const filtrados = useMemo(() => {
    return espacios.filter(
      (espacio) => {
        const cumpleEstado =
          estado === 'todos' ||
          espacio.estado === estado

        const cumpleColumna =
          columna === 0 ||
          espacio.columna === columna

        return (
          cumpleEstado &&
          cumpleColumna
        )
      }
    )
  }, [
    espacios,
    estado,
    columna
  ])

  async function simularCambio(
    espacio
  ) {
    if (!espacio) {
      return
    }

    const distancia =
      Number(
        (
          10 +
          Math.random() * 190
        ).toFixed(1)
      )

    const nuevoEstado =
      distancia <= 50
        ? 'ocupado'
        : 'libre'

    const fechaHora =
      Date.now()

    await update(
      ref(
        db,
        `espacios/${espacio.id}`
      ),
      {
        distanciaDetectada:
          distancia,

        estado:
          nuevoEstado,

        fechaHora
      }
    )

    const historialRef =
      push(
        ref(
          db,
          `historial/${espacio.id}`
        )
      )

    await set(
      historialRef,
      {
        distanciaDetectada:
          distancia,

        estado:
          nuevoEstado,

        fechaHora
      }
    )
  }

  if (cargando) {
    return (
      <main className="page loading">
        Cargando sensores...
      </main>
    )
  }

  if (error) {
    return (
      <main className="page loading">
        Error: {error}
      </main>
    )
  }

  return (
    <main className="page">

      {/* ENCABEZADO */}

      <section className="hero compact">

        <div>

          <p className="eyebrow">
            CAMPUS UTEQ · QUEVEDO
          </p>

          <h1>
            Parqueadero inteligente
          </h1>

          <p className="hero-copy">
            Simulación de 80 sensores
            ultrasónicos organizados
            en cuatro columnas.
            Cada cuadro representa
            una plaza y se actualiza
            con información de
            Firebase Realtime Database.
          </p>

        </div>

        <div className="status-chip">
          ● RTDB en vivo
        </div>

      </section>

      {/* TARJETAS DE RESUMEN */}

      <ResumenEstacionamiento
        espacios={espacios}
      />

      {/* CUADRÍCULA + DETALLE */}

      <section className="dashboard-grid">

        <article className="panel">

          <div className="panel-heading">

            <div>

              <p className="eyebrow">
                VISTA OPERATIVA
              </p>

              <h2>
                Disponibilidad por espacio
              </h2>

            </div>

            <div className="legend">

              <span>
                <i className="dot free-dot"></i>
                Libre
              </span>

              <span>
                <i className="dot occupied-dot"></i>
                Ocupado
              </span>

              <span>
                <i className="dot unknown-dot"></i>
                Sin información
              </span>

              <span>
                <i className="dot selected-dot"></i>
                Seleccionado
              </span>

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

        {/* PANEL DERECHO */}

        <aside className="panel detail-panel">

          {espacioActual ? (

            <>

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    SENSOR SELECCIONADO
                  </p>

                  <h2 className="sensor-title">

                    {String.fromCharCode(
                      64 +
                      espacioActual.columna
                    )}

                    {String(
                      espacioActual.numero
                    ).padStart(
                      2,
                      '0'
                    )}

                  </h2>

                </div>

                <span
                  className={
                    `state-badge ${espacioActual.estado}`
                  }
                >

                  {espacioActual.estado
                    ? espacioActual.estado
                        .toUpperCase()
                    : 'SIN INFORMACIÓN'}

                </span>

              </div>

              {/* DISTANCIA */}

              <div className="distance-card">

                <small>
                  Distancia detectada
                </small>

                <strong>

                  {Number(
                    espacioActual
                      .distanciaDetectada ??
                    0
                  ).toFixed(0)}

                  {' '}

                  <em>
                    cm
                  </em>

                </strong>

                <div className="meter">

                  <span
                    style={{
                      width:
                        `${Math.min(
                          100,
                          Number(
                            espacioActual
                              .distanciaDetectada ??
                            0
                          ) / 2
                        )}%`
                    }}
                  />

                </div>

                <small>
                  Umbral del sensor:
                  50 cm
                </small>

              </div>

              {/* INFORMACIÓN */}

              <dl className="sensor-data">

                <div>

                  <dt>
                    ID RTDB
                  </dt>

                  <dd>
                    {espacioActual.id}
                  </dd>

                </div>

                <div>

                  <dt>
                    COLUMNA / NÚMERO
                  </dt>

                  <dd>

                    {espacioActual.columna}

                    {' / '}

                    {espacioActual.numero}

                  </dd>

                </div>

                <div>

                  <dt>
                    CENTRO GEOGRÁFICO
                  </dt>

                  <dd>

                    {espacioActual
                      .ubicacion
                      ?.latitud
                      ?.toFixed(8)}

                    {', '}

                    {espacioActual
                      .ubicacion
                      ?.longitud
                      ?.toFixed(8)}

                  </dd>

                </div>

                {/* BOUNDING BOX */}

                <div>

                  <dt>
                    BOUNDING BOX
                  </dt>

                  <dd className="bounding-box-data">

                    <span>

                      Norte:{' '}

                      {espacioActual
                        .ubicacion
                        ?.boundingBox
                        ?.norte
                        ?.toFixed(8)}

                    </span>

                    <span>

                      Sur:{' '}

                      {espacioActual
                        .ubicacion
                        ?.boundingBox
                        ?.sur
                        ?.toFixed(8)}

                    </span>

                    <span>

                      Oeste:{' '}

                      {espacioActual
                        .ubicacion
                        ?.boundingBox
                        ?.oeste
                        ?.toFixed(8)}

                    </span>

                    <span>

                      Este:{' '}

                      {espacioActual
                        .ubicacion
                        ?.boundingBox
                        ?.este
                        ?.toFixed(8)}

                    </span>

                  </dd>

                </div>

                <div>

                  <dt>
                    ÚLTIMA ACTUALIZACIÓN
                  </dt>

                  <dd>

                    {espacioActual.fechaHora

                      ? new Date(
                          espacioActual
                            .fechaHora
                        ).toLocaleString(
                          'es-EC'
                        )

                      : 'Sin información'
                    }

                  </dd>

                </div>

              </dl>

              {/* HISTORIAL */}

              <h3>
                Historial reciente
              </h3>

              <HistorialEspacio
                historial={
                  historial
                }
                limite={6}
              />

              {/* BOTÓN SIMULAR */}

              <button
                className="secondary-button"
                onClick={() =>
                  simularCambio(
                    espacioActual
                  )
                }
              >
                Simular cambio de estado
              </button>

              {/* BOTÓN DETALLE */}

              <button
                className="detail-button"
                onClick={() =>
                  navigate(
                    `/espacios/${espacioActual.id}`
                  )
                }
              >
                Ver detalle
              </button>

            </>

          ) : (

            <p>
              Seleccione un espacio.
            </p>

          )}

        </aside>

      </section>

      {/* MAPA */}

      <section className="panel map-section">

        <div className="panel-heading">

          <div>

            <p className="eyebrow">
              UBICACIÓN
            </p>

            <h2>
              Ubicación del estacionamiento
            </h2>

          </div>

        </div>

        <MapaEstacionamiento
          espacios={espacios}
          espacioSeleccionado={
            espacioActual
          }
          onSelect={
            setSeleccionado
          }
        />

      </section>

    </main>
  )
}