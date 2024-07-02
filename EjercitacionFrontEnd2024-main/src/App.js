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
  <Route path="*" element={<Navigate to="/inicio" replace />} />
  <Route path="/tripulaciones" element={<Tripulaciones/>} />
  <Route path="/pilotos" element={<Pilotos/>} />

</Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
