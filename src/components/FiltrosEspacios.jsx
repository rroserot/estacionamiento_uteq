export default function FiltrosEspacios({
  estado,
  setEstado,
  columna,
  setColumna
}) {
  const estados = [
    { valor: 'todos', etiqueta: 'Todos' },
    { valor: 'libre', etiqueta: 'Libres' },
    { valor: 'ocupado', etiqueta: 'Ocupados' },
    { valor: 'sin-info', etiqueta: 'Sin información' }
  ]

  return (
    <div className="filters">
      <div className="filter-group">
        {estados.map((opcion) => (
          <button
            key={opcion.valor}
            className={estado === opcion.valor ? 'active' : ''}
            onClick={() => setEstado(opcion.valor)}
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>

      <div className="filter-group">
        {[0, 1, 2, 3, 4].map((numero) => (
          <button
            key={numero}
            className={columna === numero ? 'active' : ''}
            onClick={() => setColumna(numero)}
          >
            {numero === 0 ? 'Todas' : String.fromCharCode(64 + numero)}
          </button>
        ))}
      </div>
    </div>
  )
}
