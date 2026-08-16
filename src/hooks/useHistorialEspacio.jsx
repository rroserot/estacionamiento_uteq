import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../services/firebase'

export default function useHistorialEspacio(id) {
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!id) return

    const historialRef = ref(db, `historial/${id}`)
    const unsubscribe = onValue(historialRef, (snapshot) => {
      const data = snapshot.val() || {}
      const registros = Object.values(data)
        .sort((a, b) => b.fechaHora - a.fechaHora)
      setHistorial(registros)
      setCargando(false)
    })

    return () => unsubscribe()
  }, [id])

  return { historial, cargando }
}
