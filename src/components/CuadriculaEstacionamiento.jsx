import EspacioCard from './EspacioCard'

export default function CuadriculaEstacionamiento({
  espacios,
  seleccionado,
  onSelect
}) {
  const columnas = [1, 2, 3, 4]

  return (
    <div className="parking-board">
      <div className="parking-entry">ENTRADA →</div>

      <div className="parking-columns">
        {columnas.map((columna) => {
          const espaciosColumna = espacios
            .filter((e) => e.columna === columna)
            .sort((a, b) => a.numero - b.numero)

          return (
            <div className="parking-column" key={columna}>
              <div className="column-title">
                COLUMNA {String.fromCharCode(64 + columna)}
              </div>

              <div className="column-spaces">
                {espaciosColumna.map((espacio) => (
                  <EspacioCard
                    key={espacio.id}
                    espacio={espacio}
                    seleccionado={seleccionado?.id === espacio.id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
