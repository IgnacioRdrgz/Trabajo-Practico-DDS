import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { ArticulosFamilias } from "./components/ArticulosFamilias";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";
import { Aviones } from "./components/aviones/Aviones";
import { Aerolineas } from "./components/aerolineas/Aerolineas";
import { Aeropuertos } from "./components/aeropuertos/Aeropuertos";




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
            <Route path="/aeropuertos" element={<Aeropuertos />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
