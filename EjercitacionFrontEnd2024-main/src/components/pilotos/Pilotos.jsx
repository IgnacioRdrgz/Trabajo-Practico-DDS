import React, { useEffect, useState } from "react";
import modalDialogService from "../../services/modalDialog.service";
import { pilotosService } from "../../services/pilotos.service";
import PilotosBuscar from "./PilotosBuscar";
import PilotosListado from "./PilotosListado";
import PilotosRegistro from "./PilotosRegistro";

function Pilotos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [nombre, setnombre] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [tripulaciones, setTriplaciones] = useState([]);
  const [Seleccionada, setTripulacionSeleccionada] = useState(null);

  useEffect(() => {
    //cargarTripulaciones(); // Mantenemos esta llamada si es necesaria
    Buscar(Pagina); // Eliminar esta línea para evitar la búsqueda automática
  }, [nombre, Pagina]);
  
  async function Buscar(_pagina) {
    modalDialogService.BloquearPantalla(true);
    const data = await pilotosService.Buscar(nombre, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data);
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }
  
  async function cargarP() {
    const tripulacionesData = await pilotosService.ObtenerTripulaciones();
  //  setTripulaciones(tripulacionesData);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await pilotosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      id: 0,
      nombre: "",
      licencia: 0,
      fecha_contratacion: "",
    });
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      `¿Está seguro que quiere ${
        item.Activo ? "desactivar" : "activar"
      } el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        await pilotosService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
    //  item.tripulacion = tripulacionSeleccionada;
      await pilotosService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      `Registro ${
        AccionABMC === "A" ? "agregado" : "modificado"
      } correctamente.`
    );
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Pilotos<small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      <PilotosBuscar
        nombre={nombre}
        setnombre={setnombre}
        Buscar={() => Buscar(1)}
        Agregar={Agregar}
      />

      {AccionABMC === "L" && Items.length > 0 && (
        <PilotosListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          ActivarDesactivar={ActivarDesactivar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <PilotosRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
//          tripulacionSeleccionada={tripulacionSeleccionada}
          setTripulacionSeleccionada={setTripulacionSeleccionada}
        />
      )}
    </div>
  );
}

export { Pilotos };

