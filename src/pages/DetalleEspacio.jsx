import {
  Link,
  useParams
} from 'react-router-dom'

import useEspacios
  from '../hooks/useEspacios'

import useHistorialEspacio
  from '../hooks/useHistorialEspacio'

import MapaEstacionamiento
  from '../components/MapaEstacionamiento'

export default function DetalleEspacio() {
  const { id } =
    useParams()

  const {
    espacios,
    cargando
  } = useEspacios()

  const espacio =
    espacios.find(
      (item) =>
        item.id === id
    )

  const {
    historial
  } = useHistorialEspacio(id)

  if (cargando) {
    return (
      <main className="page loading">
        Cargando espacio...
      </main>
    )
  }

  if (!espacio) {
    return (
      <main className="page loading">

        <p>
          No se encontró el espacio solicitado.
        </p>

        <Link
          to="/estacionamiento"
        >
          Volver al estacionamiento
        </Link>

      </main>
    )
  }

  const boundingBox =
    espacio
      .ubicacion
      ?.boundingBox || {}

  return (
    <main className="page">

      {/* ENCABEZADO */}

      <section className="detail-hero">

        <div>

          <p className="eyebrow">
            DETALLE DEL ESPACIO
          </p>

          <h1>
            {espacio.id}
          </h1>

          <p>
            Columna{' '}
            {espacio.columna}
            {' · '}
            Espacio{' '}
            {espacio.numero}
          </p>

        </div>

        <span
          className={
            `state-badge ${espacio.estado}`
          }
        >
          {espacio.estado
            ?.toUpperCase()}
        </span>

      </section>

      <section className="detail-layout">

        {/* INFORMACIÓN ACTUAL */}

        <article className="panel">

          <h2>
            Información actual
          </h2>

          <div className="detail-cards">

            <div>

              <span>
                Distancia
              </span>

              <strong>
                {espacio.distanciaDetectada}
                {' '}
                cm
              </strong>

            </div>

            <div>

              <span>
                Estado
              </span>

              <strong>
                {espacio.estado}
              </strong>

            </div>

            <div>

              <span>
                Actualización
              </span>

              <strong>
                {espacio.fechaHora
                  ? new Date(
                      espacio.fechaHora
                    ).toLocaleString(
                      'es-EC'
                    )
                  : 'Sin información'
                }
              </strong>

            </div>

          </div>

          <h3>
            Ubicación
          </h3>

          <dl className="sensor-data">

            <div>
              <dt>
                Latitud
              </dt>

              <dd>
                {espacio
                  .ubicacion
                  ?.latitud}
              </dd>
            </div>

            <div>
              <dt>
                Longitud
              </dt>

              <dd>
                {espacio
                  .ubicacion
                  ?.longitud}
              </dd>
            </div>

          </dl>

          <h3 className="detail-subtitle">
            Bounding box
          </h3>

          <dl className="sensor-data">

            <div>
              <dt>
                Norte
              </dt>

              <dd>
                {boundingBox.norte}
              </dd>
            </div>

            <div>
              <dt>
                Sur
              </dt>

              <dd>
                {boundingBox.sur}
              </dd>
            </div>

            <div>
              <dt>
                Oeste
              </dt>

              <dd>
                {boundingBox.oeste}
              </dd>
            </div>

            <div>
              <dt>
                Este
              </dt>

              <dd>
                {boundingBox.este}
              </dd>
            </div>

          </dl>

        </article>

        {/* HISTORIAL */}

        <article className="panel">

          <h2>
            Historial de cambios
          </h2>

          {historial.length > 0 ? (

            <div className="history-table-wrapper">

              <table className="history-table">

                <thead>

                  <tr>
                    <th>
                      Fecha y hora
                    </th>

                    <th>
                      Distancia
                    </th>

                    <th>
                      Estado
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {historial.map(
                    (
                      registro,
                      index
                    ) => (

                      <tr
                        key={
                          `${registro.fechaHora}-${index}`
                        }
                      >

                        <td>
                          {new Date(
                            registro.fechaHora
                          ).toLocaleString(
                            'es-EC'
                          )}
                        </td>

                        <td>
                          {Number(
                            registro
                              .distanciaDetectada
                          ).toFixed(1)}
                          {' '}
                          cm
                        </td>

                        <td>

                          <span
                            className={
                              `history-status ${registro.estado}`
                            }
                          >
                            {registro.estado}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="empty-state">
              No existen registros
              históricos para este espacio.
            </p>

          )}

        </article>

      </section>

      {/* MAPA */}

      <section className="panel map-section">

        <h2>
          Mapa del espacio
        </h2>

        <MapaEstacionamiento
          espacios={espacios}
          espacioSeleccionado={
            espacio
          }
        />

      </section>

      <div className="detail-back">

        <Link
          to="/estacionamiento"
          className="primary-button"
        >
          Volver al estacionamiento
        </Link>

      </div>

    </main>
  )
}