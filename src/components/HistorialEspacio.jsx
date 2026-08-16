function fecha(timestamp) {
  return new Date(timestamp).toLocaleString('es-EC')
}

export default function HistorialEspacio({ historial, limite }) {
  const registros = limite ? historial.slice(0, limite) : historial

  if (!registros.length) {
    return <p className="empty-state">Todavía no hay registros históricos.</p>
  }

  return (
    <div className="history-list">
      {registros.map((item) => (
        <article className="history-row" key={item.fechaHora}>
          <div>
            <span className={`history-dot ${item.estado}`}></span>
            <strong>{item.estado === 'libre' ? 'Libre' : 'Ocupado'}</strong>
            <small>{fecha(item.fechaHora)}</small>
          </div>
          <b>{Number(item.distanciaDetectada).toFixed(0)} cm</b>
        </article>
      ))}
    </div>
  )
}
