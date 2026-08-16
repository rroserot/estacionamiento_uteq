import { NavLink, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Estacionamiento from './pages/Estacionamiento'
import DetalleEspacio from './pages/DetalleEspacio'
import './styles.css'

export default function App() {
  return (
    <>
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">U</span>
          <span>
            <strong>UTEQ Smart Parking</strong>
            <small>Monitoreo telemático del parqueadero</small>
          </span>
        </NavLink>

        <nav>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/estacionamiento">Parqueadero</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/estacionamiento" element={<Estacionamiento />} />
        <Route path="/espacios/:id" element={<DetalleEspacio />} />
      </Routes>
    </>
  )
}
