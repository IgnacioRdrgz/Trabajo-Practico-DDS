import React, { useState, useEffect } from "react";
import ReservasListado from "./ReservasListado";
import ReservasRegistro from "./ReservasRegistro";
import ReservasBuscar from "./ReservasBuscar";
import { reservasService } from "../../services/reservas.service";
import modalDialogService from "../../services/modalDialog.service";

function Reservas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [id, setId] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    Buscar(Pagina);
  }, [id, Pagina]);

  async function Buscar(_pagina) {
    modalDialogService.BloquearPantalla(true);
    const data = await reservasService.Buscar(id, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data);
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
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
      vuelo_id: "",
      pasajero_id: "",
      fecha_reserva: "",
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
        await reservasService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
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
        id={id}
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
        />
      )}
    </div>
  );
}

export { Reservas };
