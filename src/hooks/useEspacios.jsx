import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../services/firebase'

export default function useEspacios() {
  const [espacios, setEspacios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const espaciosRef = ref(db, 'espacios')

    const unsubscribe = onValue(
      espaciosRef,
      (snapshot) => {
        const data = snapshot.val() || {}
        setEspacios(Object.values(data).sort((a, b) => {
          if (a.columna !== b.columna) return a.columna - b.columna
          return a.numero - b.numero
        }))
        setCargando(false)
      },
      (err) => {
        setError(err.message)
        setCargando(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { espacios, cargando, error }
}
