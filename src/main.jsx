import {
  StrictMode
} from 'react'

import {
  createRoot
} from 'react-dom/client'

import {
  BrowserRouter
} from 'react-router-dom'

import App from './App'

import {
  iniciarSimulacion
} from './simulador'

iniciarSimulacion(5000)

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)