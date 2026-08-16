import { onValue, push, ref, set, update } from 'firebase/database'
import { db } from './services/firebase'

let intervalo = null

export function iniciarSimulacion(periodoMs = 5000) {
  if (intervalo) return

  intervalo = setInterval(() => {
    onValue(
      ref(db, 'espacios'),
      async (snapshot) => {
        const data = snapshot.val() || {}
        const ids = Object.keys(data)
        if (!ids.length) return

        const cambios = Math.max(1, Math.floor(Math.random() * 5))

        for (let i = 0; i < cambios; i++) {
          const id = ids[Math.floor(Math.random() * ids.length)]
          const distanciaDetectada = Number((10 + Math.random() * 190).toFixed(1))
          const estado = distanciaDetectada <= 50 ? 'ocupado' : 'libre'
          const fechaHora = Date.now() + i

          await update(ref(db, `espacios/${id}`), {
            distanciaDetectada,
            estado,
            fechaHora
          })

          await set(push(ref(db, `historial/${id}`)), {
            distanciaDetectada,
            estado,
            fechaHora
          })
        }
      },
      { onlyOnce: true }
    )
  }, periodoMs)
}

export function detenerSimulacion() {
  clearInterval(intervalo)
  intervalo = null
}
