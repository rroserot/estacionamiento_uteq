import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <main className="page">
      <section className="hero home-hero">
        <div>
          <p className="eyebrow">CAMPUS UTEQ · QUEVEDO</p>
          <h1>Estacionamiento inteligente</h1>
          <p className="hero-copy">
            Aplicación web desarrollada con React y Firebase Realtime Database
            para monitorear 80 espacios de estacionamiento mediante sensores
            simulados en tiempo real.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/estacionamiento">
              Ver estacionamiento
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <strong>80</strong>
          <span>espacios monitoreados</span>
          <strong>4 × 20</strong>
          <span>distribución del parqueadero</span>
          <strong>50 cm</strong>
          <span>umbral de ocupación</span>
        </div>
      </section>

      <section className="info-grid">
        <article>
          <p className="eyebrow">TECNOLOGÍA</p>
          <h2>Monitoreo en tiempo real</h2>
          <p>
            Cada sensor registra distancia, estado, posición geográfica y fecha
            de actualización directamente en Firebase RTDB.
          </p>
        </article>
        <article>
          <p className="eyebrow">UBICACIÓN</p>
          <h2>Campus UTEQ</h2>
          <p>
            El área del estacionamiento se representa mediante sus cuatro puntos
            geográficos y un polígono visible dentro del mapa.
          </p>
        </article>
        <article>
          <p className="eyebrow">SIMULACIÓN</p>
          <h2>Estados dinámicos</h2>
          <p>
            El sistema permite generar cambios aleatorios para representar la
            entrada y salida de vehículos.
          </p>
        </article>
      </section>
    </main>
  )
}
