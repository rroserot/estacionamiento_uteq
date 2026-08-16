import { useNavigate } from 'react-router-dom'

function formatFecha(timestamp) {
  if (!timestamp) return 'Sin información'
  return new Date(timestamp).toLocaleString('es-EC')
}

export default function EspacioCard({ espacio, seleccionado, onSelect }) {
  const navigate = useNavigate()
  const claseEstado =
    espacio.estado === 'libre'
      ? 'free'
      : espacio.estado === 'ocupado'
        ? 'occupied'
        : 'unknown'

  return (
    <button
      className={`parking-space ${claseEstado} ${seleccionado ? 'selected' : ''}`}
      onClick={() => onSelect(espacio)}
      onDoubleClick={() => navigate(`/espacios/${espacio.id}`)}
      title={`${espacio.id} · ${formatFecha(espacio.fechaHora)}`}
    >
      <span className="space-code">
        {String.fromCharCode(64 + espacio.columna)}
        {String(espacio.numero).padStart(2, '0')}
      </span>
      <span className="car-icon">▰</span>
      <span className="space-distance">
        {espacio.distanciaDetectada == null
          ? 'Sin información'
          : `${Number(espacio.distanciaDetectada).toFixed(0)} cm`}
      </span>
    </button>
  )
}
