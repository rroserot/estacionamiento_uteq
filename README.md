# UTEQ Smart Parking

Aplicación web para simular y monitorear un estacionamiento inteligente de 80 espacios en la Universidad Técnica Estatal de Quevedo (UTEQ).

## Tecnologías

- React
- Vite
- Firebase Realtime Database
- React Router
- Leaflet / React Leaflet

## Distribución

El estacionamiento contiene 80 espacios distribuidos en 4 columnas de 20 espacios.

- Columnas: A, B, C y D
- 20 espacios por columna
- Umbral de ocupación: 50 cm
- Distancia <= 50 cm: ocupado
- Distancia > 50 cm: libre

## Estructura principal solicitada

```text
src/
├── components/
│   ├── ResumenEstacionamiento.jsx
│   ├── CuadriculaEstacionamiento.jsx
│   ├── EspacioCard.jsx
│   ├── FiltrosEspacios.jsx
│   ├── HistorialEspacio.jsx
│   └── MapaEstacionamiento.jsx
├── hooks/
│   ├── useEspacios.jsx
│   └── useHistorialEspacio.jsx
├── pages/
│   ├── Inicio.jsx
│   ├── Estacionamiento.jsx
│   └── DetalleEspacio.jsx
├── services/
│   └── firebase.js
└── App.jsx
```

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Copiar `.env.example` como `.env`.

3. Colocar en `.env` la configuración de tu proyecto de Firebase.

4. En Firebase Console, crear una Realtime Database.

5. Para pruebas académicas, puedes usar temporalmente reglas abiertas:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

No se recomienda mantener estas reglas en producción.

6. Ejecutar:

```bash
npm run dev
```

## Generación inicial de los 80 espacios

El archivo `src/generarDatosIniciales.js` contiene la función `generarDatosIniciales()` que crea los 80 espacios y su primer registro histórico.

Puedes importarla temporalmente en una página o en `main.jsx`, ejecutarla una sola vez y luego retirar la llamada.

Ejemplo temporal:

```js
import { generarDatosIniciales } from './generarDatosIniciales'

generarDatosIniciales()
```

Después de confirmar que los datos ya están en Firebase, elimina esa llamada para evitar sobrescribirlos.

## Simulación periódica

El archivo `src/simulador.js` incluye:

```js
iniciarSimulacion(5000)
```

La función actualiza aleatoriamente entre 1 y 4 sensores por ciclo, recalcula su estado y añade cada cambio al historial.

## Rutas

- `/` → Inicio
- `/estacionamiento` → estacionamiento completo
- `/espacios/:id` → detalle e historial de un espacio

## Coordenadas generales

P1: -1.0122617572453996, -79.4682858877737  
P2: -1.0125032549290254, -79.4682998912032  
P3: -1.0125709715003960, -79.46748620024898  
P4: -1.0123403901396444, -79.46746240847104

## Evidencias recomendadas para el PDF

- Portada
- Cálculo y distribución de los 80 espacios
- URL del repositorio
- Página de inicio
- Cuadrícula de 80 espacios
- Tarjetas estadísticas
- Detalle e historial
- Mapa
- Firebase RTDB
- Código principal de páginas, componentes y hooks

## Seguridad con Git

El archivo `.gitignore` evita subir al repositorio las dependencias, la carpeta de compilación y las variables de entorno. El archivo `.env` debe permanecer únicamente en el equipo local. Para compartir la estructura de configuración se incluye `.env.example` sin credenciales reales.

## Estados visuales

La cuadrícula representa el estado de cada sensor mediante colores:

- Verde: espacio libre.
- Rojo: espacio ocupado.
- Gris: sensor sin información.

Las tarjetas de resumen muestran total de espacios, espacios libres, espacios ocupados y porcentaje disponible.
