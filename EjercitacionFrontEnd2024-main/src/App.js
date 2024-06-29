import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";
import { Aviones } from "./components/aviones/Aviones";
import { Aerolineas } from "./components/aerolineas/Aerolineas";
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
            <Route path="/pasajeros" element={<Pasajeros />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/aviones" element={<Aviones />} />
            <Route path="/aerolineas" element={<Aerolineas />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
