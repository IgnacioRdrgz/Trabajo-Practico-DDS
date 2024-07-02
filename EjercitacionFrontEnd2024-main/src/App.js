import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { ModalDialog } from "./components/ModalDialog";
import { Aerolineas } from "./components/aerolineas/Aerolineas";
import { Aviones } from "./components/aviones/Aviones";
import { Tripulaciones } from "./components/tripulaciones/Tripulaciones";
import { Pilotos } from "./components/pilotos/Pilotos";
import { Aeropuertos } from "./components/aeropuertos/Aeropuertos";
import { Vuelos } from "./components/vuelos/Vuelos";
import { Login } from "./components/login/Login";


import { Pasajeros } from "./components/pasajeros/Pasajeros";
import { Reservas } from "./components/reservas/Reservas";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
<Routes>
  <Route path="/inicio" element={<Inicio />} />
  <Route path="/aviones" element={<Aviones />} />
  <Route path="/aerolineas" element={<Aerolineas />} />
  <Route path="/tripulaciones" element={<Tripulaciones/>} />
  <Route path="/aeropuertos" element={<Aeropuertos/>} />
  <Route path="/vuelos" element={<Vuelos/>} />
  <Route path="/pilotos" element={<Pilotos/>} />
  <Route path="/pasajeros" element={<Pasajeros/>} />
  <Route path="/reservas" element={<Reservas/>} />
  <Route path="/login/:componentFrom" element={<Login />} />

  <Route path="*" element={<Navigate to="/inicio" replace />} />
</Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
