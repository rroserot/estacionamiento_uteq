# UTEQ Smart Parking

Aplicación web para simular y monitorear un estacionamiento inteligente de 80 espacios en la Universidad Técnica Estatal de Quevedo (UTEQ).
<img width="1907" height="900" alt="image" src="https://github.com/user-attachments/assets/d2cf24f8-387f-4840-8463-f6830b02c9fd" />
<img width="1309" height="684" alt="image" src="https://github.com/user-attachments/assets/561f14b2-3573-406b-b22a-84ff88243795" />
<img width="1285" height="790" alt="image" src="https://github.com/user-attachments/assets/92aa0892-21cf-432d-bb72-041505a57aa0" />
<img width="428" height="770" alt="image" src="https://github.com/user-attachments/assets/75bcde17-923f-4e1b-86d1-013cea469e9d" />
<img width="462" height="720" alt="image" src="https://github.com/user-attachments/assets/08887315-5477-4bcb-9e9a-d11a415a4ed1" />

El sistema utiliza **React**, **Firebase Realtime Database** y **Leaflet** para representar en tiempo real el estado de 80 espacios de estacionamiento organizados en 4 columnas de 20 espacios.

## Tecnologías utilizadas

* React
* Vite
* Firebase Realtime Database
* React Router DOM
* Leaflet
* React Leaflet
* JavaScript
* CSS

## Características principales

La aplicación permite:

* Consultar 80 espacios de estacionamiento en tiempo real.
* Visualizar los espacios en una cuadrícula de 4 columnas y 20 espacios.
* Mostrar espacios libres, ocupados y sin información.
* Filtrar espacios por estado.
* Filtrar espacios por columna.
* Mostrar estadísticas generales del estacionamiento.
* Seleccionar un espacio específico.
* Consultar el detalle de cada espacio.
* Visualizar el historial de cambios.
* Representar el estacionamiento en un mapa.
* Mostrar el bounding box general del estacionamiento.
* Mostrar el bounding box del espacio seleccionado.
* Mostrar la ubicación central de cada sensor.
* Simular cambios automáticos en los sensores.
* Registrar cada cambio en Firebase Realtime Database.

## Distribución del estacionamiento

El estacionamiento dispone de:

* 80 espacios en total.
* 4 columnas.
* 20 espacios por columna.

Las columnas se identifican visualmente como:

* A
* B
* C
* D

Cada sensor utiliza un identificador como:

```text
ESP-C01-01
ESP-C01-02
ESP-C02-01
ESP-C04-20
```

## Regla para determinar el estado

La aplicación utiliza la distancia detectada por el sensor para determinar si un espacio está libre u ocupado.

```js
const estado =
  distanciaDetectada <= 50
    ? 'ocupado'
    : 'libre'
```

La regla utilizada es:

* Distancia menor o igual a 50 cm: ocupado.
* Distancia mayor a 50 cm: libre.
* Sensor sin información: estado representado en gris.

## Colores utilizados

* Verde: espacio libre.
* Rojo: espacio ocupado.
* Gris: sensor sin información.
* Azul: bounding box del espacio seleccionado.

## Estadísticas

La página del estacionamiento presenta tarjetas con:

* Total de espacios.
* Espacios libres.
* Espacios ocupados.
* Porcentaje disponible.

## Estructura principal del proyecto

```text
src/
├── components/
│   ├── ResumenEstacionamiento.jsx
│   ├── CuadriculaEstacionamiento.jsx
│   ├── EspacioCard.jsx
│   ├── FiltrosEspacios.jsx
│   ├── HistorialEspacio.jsx
│   └── MapaEstacionamiento.jsx
│
├── hooks/
│   ├── useEspacios.jsx
│   └── useHistorialEspacio.jsx
│
├── pages/
│   ├── Inicio.jsx
│   ├── Estacionamiento.jsx
│   └── DetalleEspacio.jsx
│
├── services/
│   └── firebase.js
│
├── generarDatosIniciales.js
├── simulador.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Componentes principales

### ResumenEstacionamiento.jsx

Muestra las estadísticas principales del estacionamiento:

* Total de espacios.
* Espacios libres.
* Espacios ocupados.
* Porcentaje disponible.

### CuadriculaEstacionamiento.jsx

Organiza visualmente los 80 espacios en 4 columnas de 20 espacios.

### EspacioCard.jsx

Representa individualmente cada espacio de estacionamiento.

### FiltrosEspacios.jsx

Permite filtrar los espacios por:

* Estado.
* Columna.

### HistorialEspacio.jsx

Muestra el historial reciente de cambios de un espacio.

### MapaEstacionamiento.jsx

Representa:

* Ubicación del estacionamiento.
* Polígono general.
* Sensores.
* Estados mediante colores.
* Bounding box del espacio seleccionado.
* Marcador del espacio seleccionado.

## Hooks

### useEspacios.jsx

Escucha en tiempo real la información almacenada en:

```text
/espacios
```

dentro de Firebase Realtime Database.

### useHistorialEspacio.jsx

Consulta el historial correspondiente a un sensor desde:

```text
/historial/{id}
```

## Páginas

### Inicio

Ruta:

```text
/
```

Presenta una descripción general del proyecto y acceso al estacionamiento.

### Estacionamiento

Ruta:

```text
/estacionamiento
```

Incluye:

* Estadísticas.
* Cuadrícula de 80 espacios.
* Filtros.
* Leyenda.
* Sensor seleccionado.
* Historial reciente.
* Botón para simular un cambio.
* Botón para visualizar el detalle completo.
* Mapa del estacionamiento.

### Detalle del espacio

Ruta:

```text
/espacios/:id
```

Ejemplo:

```text
/espacios/ESP-C01-01
```

Muestra:

* Identificación del espacio.
* Columna.
* Número.
* Estado actual.
* Distancia detectada.
* Fecha de actualización.
* Latitud.
* Longitud.
* Bounding box.
* Historial de cambios en tabla.
* Mapa del espacio seleccionado.

## Coordenadas del estacionamiento

El área general está delimitada por los siguientes puntos:

```text
P1
Latitud:  -1.0122617572453996
Longitud: -79.4682858877737

P2
Latitud:  -1.0125032549290254
Longitud: -79.4682998912032

P3
Latitud:  -1.0125709715003960
Longitud: -79.46748620024898

P4
Latitud:  -1.0123403901396444
Longitud: -79.46746240847104
```

## Bounding box general

```json
{
  "norte": -1.0122617572453996,
  "sur": -1.012570971500396,
  "oeste": -79.4682998912032,
  "este": -79.46746240847104
}
```

Cada uno de los 80 espacios también dispone de su propio bounding box.

## Firebase Realtime Database

La estructura principal utilizada es:

```text
espacios
├── ESP-C01-01
├── ESP-C01-02
├── ...
└── ESP-C04-20

historial
├── ESP-C01-01
├── ESP-C01-02
├── ...
└── ESP-C04-20
```

Cada espacio almacena información similar a:

```json
{
  "id": "ESP-C01-01",
  "columna": 1,
  "numero": 1,
  "distanciaDetectada": 135.4,
  "estado": "libre",
  "fechaHora": 1786676400000,
  "ubicacion": {
    "nombre": "Parqueadero UTEQ",
    "latitud": -1.012270,
    "longitud": -79.468280,
    "boundingBox": {
      "norte": -1.012261,
      "sur": -1.012302,
      "oeste": -79.468299,
      "este": -79.468240
    }
  }
}
```

## Generación inicial de datos

El archivo:

```text
src/generarDatosIniciales.js
```

se utiliza para crear inicialmente los 80 espacios.

La función genera:

* ID del sensor.
* Columna.
* Número.
* Distancia inicial.
* Estado.
* Fecha y hora.
* Latitud.
* Longitud.
* Bounding box.
* Registro histórico inicial.

Este proceso debe ejecutarse únicamente una vez para cargar los datos iniciales en Firebase.

## Simulación automática

El archivo:

```text
src/simulador.js
```

actualiza aleatoriamente algunos sensores cada cierto tiempo.

Actualmente, la simulación selecciona varios sensores y modifica:

* Distancia detectada.
* Estado.
* Fecha y hora.
* Registro histórico.

La simulación mantiene una combinación aproximada de espacios libres y ocupados.

En:

```text
src/main.jsx
```

se inicia mediante:

```js
iniciarSimulacion(5000)
```

El valor `5000` representa 5 segundos.

## Configuración del proyecto

### 1. Clonar o descargar el repositorio

Descargar el proyecto o clonarlo desde GitHub.

Después ingresar a la carpeta del proyecto.

### 2. Instalar las dependencias

Ejecutar:

```bash
npm install
```

### 3. Crear el archivo .env

En la raíz del proyecto crear:

```text
.env
```

Agregar la configuración correspondiente al proyecto de Firebase:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_PROYECTO.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://TU_PROYECTO-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=TU_PROYECTO
VITE_FIREBASE_STORAGE_BUCKET=TU_PROYECTO.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

El archivo `.env` no debe subirse al repositorio.

## .gitignore

El archivo `.gitignore` debe contener, entre otros:

```gitignore
node_modules/
dist/

.env
.env.local
.env.development.local
.env.test.local
.env.production.local

*.log

.vscode/
.idea/

.DS_Store
Thumbs.db
```

Esto evita subir información privada y archivos innecesarios.

## Ejecutar la aplicación

Para iniciar el servidor de desarrollo ejecutar:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

## Generar versión de producción

Ejecutar:

```bash
npm run build
```

Para visualizar localmente la compilación:

```bash
npm run preview
```

## Funcionamiento de la simulación

Durante la ejecución de la aplicación:

1. Se consultan los 80 espacios almacenados en Firebase.
2. Cada cierto tiempo se seleccionan algunos sensores aleatoriamente.
3. Se genera una nueva distancia.
4. Se calcula el estado del espacio.
5. Se actualiza la fecha y hora.
6. Firebase actualiza el estado actual.
7. Se registra el cambio dentro del historial.
8. React recibe los cambios automáticamente desde Firebase RTDB.
9. La cuadrícula, estadísticas, detalle e historial se actualizan en tiempo real.

## Autor

Proyecto académico desarrollado para la Universidad Técnica Estatal de Quevedo — UTEQ.
