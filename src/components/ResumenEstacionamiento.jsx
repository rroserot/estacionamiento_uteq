export default function ResumenEstacionamiento({ espacios }) {
  const total = espacios.length
  const libres = espacios.filter((e) => e.estado === 'libre').length
  const ocupados = espacios.filter((e) => e.estado === 'ocupado').length
  const porcentajeDisponible = total > 0 ? (libres / total) * 100 : 0

  return (
    <section className="stats-grid">
      <article className="stat-card stat-total">
        <span>TOTAL DE ESPACIOS</span>
        <strong>{total}</strong>
        <small>espacios monitoreados</small>
      </article>

      <article className="stat-card stat-free">
        <span>ESPACIOS LIBRES</span>
        <strong>{libres}</strong>
        <small>disponibles actualmente</small>
      </article>

      <article className="stat-card stat-occupied">
        <span>ESPACIOS OCUPADOS</span>
        <strong>{ocupados}</strong>
        <small>ocupados actualmente</small>
      </article>

      <article className="stat-card stat-percentage">
        <span>PORCENTAJE DISPONIBLE</span>
        <strong>{porcentajeDisponible.toFixed(1)}%</strong>
        <small>{libres} de {total} espacios libres</small>
      </article>
    </section>
  )
}
