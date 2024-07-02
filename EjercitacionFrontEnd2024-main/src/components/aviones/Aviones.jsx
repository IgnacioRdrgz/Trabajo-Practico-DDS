import React, { useState, useEffect } from "react";
import AvionesListado from "./AvionesListado";
import AvionesRegistro from "./AvionesRegistro";
import AvionesBuscar from "./AvionesBuscar";
import { avionesService } from "../../services/aviones.service";
import modalDialogService from "../../services/modalDialog.service";
import AuthService from "../../services/auth.service";

function Aviones() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  
  const [AccionABMC, setAccionABMC] = useState("L");
  const [modelo, setModelo] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [aerolineas, setAerolineas] = useState([]);
  const [aerolineaSeleccionada, setAerolineaSeleccionada] = useState(null);
  const [PaginasTotal, setPaginasTotal] = useState(0);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const usuarioLogueado = AuthService.getUsuarioLogueado();
 // useEffect(() => {
 //   cargarDatos();
 // }, [modelo, Pagina]);

 useEffect(() => {
  console.log("Ejecutando useEffect con Pagina:", Pagina);
  cargarDatos();
  Buscar(1);
}, [Pagina]);


  async function cargarDatos() {
    await cargarAerolineas();
    await Buscar(Pagina);
  }

  

  async function Buscar(_pagina) {
    modalDialogService.BloquearPantalla(true);
    try {
      console.log("Buscando aviones con país de origen:", modelo);
      const response = await avionesService.Buscar(modelo);
      console.log("Respuesta de búsqueda:", response);
      const { Items, RegistrosTotal, PaginasTotal } = response;
      setItems(Items);
      console.log("Items actualizados:", Items);
      setRegistrosTotal(RegistrosTotal);
      setPaginasTotal(PaginasTotal);
    } catch (error) {
      console.error("Error al buscar aviones:", error);
      modalDialogService.Alert("Error al buscar aviones. Por favor, inténtelo nuevamente.");
    } finally {
      modalDialogService.BloquearPantalla(false);
    }
  }

 // async function buscarAviones(_pagina) {
 //   modalDialogService.BloquearPantalla(true);
  //  const data = await avionesService.Buscar(modelo, _pagina);
  //  modalDialogService.BloquearPantalla(false);
  //  setItems(data);
  //  const arrPaginas = [];
  //  for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
  //    arrPaginas.push(i);
  //  }
 //   setPaginas(arrPaginas);
 // }
  
  async function cargarAerolineas() {
    const aerolineasData = await avionesService.ObtenerAerolineas();
    setAerolineas(aerolineasData);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await avionesService.BuscarPorId(item);
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
      modelo: "",
      capacidad: 0,
      aerolinea: null,
      fecha_fabricacion: "",
    });
  }

  async function ActivarDesactivar(item) {
    if (usuarioLogueado === "matias" || usuarioLogueado === "admin") {
    modalDialogService.Confirm(
      `¿Está seguro que quiere ${item.Activo ? "desactivar" : "activar"
      } el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        await avionesService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  } else {
    modalDialogService.Alert("No tiene permisos para realizar esta acción.");
  }
}

  async function Grabar(item) {
    if (usuarioLogueado === "matias" || usuarioLogueado === "admin") {
    try {
      item.aerolinea = aerolineaSeleccionada;
      await avionesService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      `Registro ${AccionABMC === "A" ? "agregado" : "modificado"
      } correctamente.`
    );
  } else {
    modalDialogService.Alert("No tiene permisos para realizar esta acción.");
  }
}

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Aviones <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      <AvionesBuscar
        Modelo={modelo}
        setModelo={setModelo}
        Buscar={() => Buscar(1)}
        Agregar={Agregar}
      />

      {AccionABMC === "L" && Items.length > 0 && (
        <AvionesListado
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
        <AvionesRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
          aerolineas={aerolineas}
          aerolineaSeleccionada={aerolineaSeleccionada}
          setAerolineaSeleccionada={setAerolineaSeleccionada}
        />
      )}


          {/* Mostrar total de registros */}
          <div className="mt-3">Total de registros: {RegistrosTotal}</div>
    </div>
  );
}

export { Aviones };
