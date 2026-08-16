import {
  get,
  push,
  ref,
  set,
  update
} from 'firebase/database'

import { db } from './services/firebase'

let intervaloSimulacion = null

function generarDistanciaAleatoria() {
  const probabilidadOcupado = Math.random()

  // Aproximadamente 50% ocupados y 50% libres
  if (probabilidadOcupado < 0.5) {
    // Ocupado: <= 50 cm
    return Number(
      (10 + Math.random() * 40).toFixed(1)
    )
  }

  // Libre: > 50 cm
  return Number(
    (55 + Math.random() * 145).toFixed(1)
  )
}

async function actualizarSensor(id) {
  const distanciaDetectada =
    generarDistanciaAleatoria()

  const estado =
    distanciaDetectada <= 50
      ? 'ocupado'
      : 'libre'

  const fechaHora = Date.now()

  // Actualizar estado actual del sensor
  await update(
    ref(db, `espacios/${id}`),
    {
      distanciaDetectada,
      estado,
      fechaHora
    }
  )

  // Guardar registro histórico
  const nuevoRegistro = push(
    ref(db, `historial/${id}`)
  )

  await set(
    nuevoRegistro,
    {
      distanciaDetectada,
      estado,
      fechaHora
    }
  )
}

async function ejecutarCicloSimulacion() {
  try {
    const snapshot = await get(
      ref(db, 'espacios')
    )

    if (!snapshot.exists()) {
      console.log(
        'No existen espacios en Firebase.'
      )
      return
    }

    const datos = snapshot.val()

    const ids = Object.keys(datos)

    if (ids.length === 0) {
      return
    }

    /*
      Elegir aleatoriamente entre
      2 y 5 sensores en cada ciclo
    */
    const cantidadCambios =
      Math.floor(
        Math.random() * 4
      ) + 2

    const sensoresSeleccionados =
      [...ids]
        .sort(
          () => Math.random() - 0.5
        )
        .slice(
          0,
          cantidadCambios
        )

    for (
      const id
      of sensoresSeleccionados
    ) {
      await actualizarSensor(id)
    }

    console.log(
      `Simulación: ${cantidadCambios} sensores actualizados`
    )
  } catch (error) {
    console.error(
      'Error durante la simulación:',
      error
    )
  }
}

export function iniciarSimulacion(
  periodoMs = 5000
) {
  if (intervaloSimulacion) {
    return
  }

  console.log(
    'Simulación automática iniciada.'
  )

  /*
    Ejecuta un primer ciclo inmediatamente
  */
  ejecutarCicloSimulacion()

  /*
    Después actualiza sensores
    cada cierto tiempo
  */
  intervaloSimulacion =
    setInterval(
      ejecutarCicloSimulacion,
      periodoMs
    )
}

export function detenerSimulacion() {
  if (!intervaloSimulacion) {
    return
  }

  clearInterval(
    intervaloSimulacion
  )

  intervaloSimulacion = null

  console.log(
    'Simulación automática detenida.'
  )
}