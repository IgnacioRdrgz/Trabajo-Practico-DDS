import React, { useState, useEffect } from "react";
import ReservasListado from "./ReservasListado";
import ReservasRegistro from "./ReservasRegistro";
import ReservasBuscar from "./ReservasBuscar";
import { reservasService } from "../../services/reservas.service";
import modalDialogService from "../../services/modalDialog.service";
import AuthService from "../../services/auth.service";

function Reservas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [clase, setId] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);
  const [PaginasTotal, setPaginasTotal] = useState(0);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const usuarioLogueado = AuthService.getUsuarioLogueado();

  useEffect(() => {
    cargarPasajeros();
    Buscar(Pagina);
  }, [clase, Pagina]);


  async function Buscar(_pagina) {
    modalDialogService.BloquearPantalla(true);
    try {
      console.log("Buscando clases de reservas:", clase);
      const response = await reservasService.Buscar(clase);
      console.log("Respuesta de búsqueda:", response);
      const { Items, RegistrosTotal, PaginasTotal } = response;
      setItems(Items);
      console.log("Items actualizados:", Items);
      setRegistrosTotal(RegistrosTotal);
      setPaginasTotal(PaginasTotal);
    } catch (error) {
      console.error("Error al buscar reservas:", error);
      modalDialogService.Alert("Error al buscar reservas. Por favor, inténtelo nuevamente.");
    } finally {
      modalDialogService.BloquearPantalla(false);
    }
  }
  async function cargarPasajeros() {
    const pasajerosData = await reservasService.ObtenerPasajeros();
    console.log(pasajerosData);
    setPasajeros(pasajerosData);
  }
  async function BuscarPorId(item, accionABMC) {
    const data = await reservasService.BuscarPorId(item.id);
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
      clase: "",
      vuelo_id: 0,
      pasajero_id: "",
      fecha_reserva: "",
    });
  }

  async function ActivarDesactivar(item) {
    if (usuarioLogueado === "franco" || usuarioLogueado === "admin") {
    modalDialogService.Confirm(
      `¿Está seguro que quiere ${
        item.Activo ? "desactivar" : "activar"
      } el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        await reservasService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  } else {
    modalDialogService.Alert("No tiene permisos para realizar esta acción.");
  }
}

  async function Grabar(item) {
    if (usuarioLogueado === "franco" || usuarioLogueado === "admin") {
    try {
      await reservasService.Grabar(item);
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
        Reservas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      <ReservasBuscar
        clase={clase}
        setId={setId}
        Buscar={() => Buscar(1)}
        Agregar={Agregar}
      />

      {AccionABMC === "L" && Items.length > 0 && (
        <ReservasListado
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
        <ReservasRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
          pasajeros={pasajeros}
        />
      )}
    </div>
  );
}

export { Reservas };
