import { ref, set } from 'firebase/database'
import { db } from './services/firebase'

const P1 = { lat: -1.0122617572453996, lng: -79.4682858877737 }
const P2 = { lat: -1.0125032549290254, lng: -79.4682998912032 }
const P3 = { lat: -1.0125709715003960, lng: -79.46748620024898 }
const P4 = { lat: -1.0123403901396444, lng: -79.46746240847104 }

const lerp = (a, b, t) => a + (b - a) * t
const interp = (a, b, t) => ({
  lat: lerp(a.lat, b.lat, t),
  lng: lerp(a.lng, b.lng, t)
})

function bilinear(u, v) {
  const left = interp(P1, P2, v)
  const right = interp(P4, P3, v)
  return interp(left, right, u)
}

function generarEspacio(columna, numero) {
  const u0 = (columna - 1) / 4
  const u1 = columna / 4
  const v0 = (numero - 1) / 20
  const v1 = numero / 20

  const centro = bilinear((u0 + u1) / 2, (v0 + v1) / 2)
  const esquinas = [
    bilinear(u0, v0),
    bilinear(u1, v0),
    bilinear(u0, v1),
    bilinear(u1, v1)
  ]

  const lats = esquinas.map((p) => p.lat)
  const lngs = esquinas.map((p) => p.lng)

  const distanciaDetectada =
    Math.random() < 0.55
      ? Number((12 + Math.random() * 38).toFixed(1))
      : Number((55 + Math.random() * 195).toFixed(1))

  const estado = distanciaDetectada <= 50 ? 'ocupado' : 'libre'
  const id = `ESP-C${String(columna).padStart(2, '0')}-${String(numero).padStart(2, '0')}`

  return {
    id,
    columna,
    numero,
    distanciaDetectada,
    estado,
    fechaHora: Date.now(),
    ubicacion: {
      nombre: 'Parqueadero UTEQ',
      descripcion: `Columna ${columna}, espacio ${numero}`,
      latitud: centro.lat,
      longitud: centro.lng,
      boundingBox: {
        norte: Math.max(...lats),
        sur: Math.min(...lats),
        oeste: Math.min(...lngs),
        este: Math.max(...lngs)
      }
    }
  }
}

export async function generarDatosIniciales() {
  const espacios = {}
  const historial = {}

  for (let columna = 1; columna <= 4; columna++) {
    for (let numero = 1; numero <= 20; numero++) {
      const espacio = generarEspacio(columna, numero)
      espacios[espacio.id] = espacio
      historial[espacio.id] = {
        [espacio.fechaHora]: {
          distanciaDetectada: espacio.distanciaDetectada,
          estado: espacio.estado,
          fechaHora: espacio.fechaHora
        }
      }
    }
  }

  await set(ref(db), { espacios, historial })
  console.log('80 espacios generados correctamente.')
}
