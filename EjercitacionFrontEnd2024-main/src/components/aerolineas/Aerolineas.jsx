import React, { useState, useEffect } from "react";
import AerolineasListado from "./AerolineasListado";
import AerolineasRegistro from "./AerolineasRegistro";
import AerolineasBuscar from "./AerolineasBuscar";
import { aerolineasService } from "../../services/aerolineas.service";
import modalDialogService from "../../services/modalDialog.service";

function Aerolineas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  const [AccionABMC, setAccionABMC] = useState("L");
  const [pais_origen, setpais_origen] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);
  const [Pagina, setPagina] = useState(1);
  const [PaginasTotal, setPaginasTotal] = useState(0);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);

  useEffect(() => {
    console.log("Ejecutando useEffect con Pagina:", Pagina);
    Buscar(1);
  }, [Pagina]);

  async function Buscar(_pagina) {
    modalDialogService.BloquearPantalla(true);
    try {
      console.log("Buscando aerolíneas con país de origen:", pais_origen);
      const response = await aerolineasService.BuscarPorPais(pais_origen);
      console.log("Respuesta de búsqueda:", response);
      const { Items, RegistrosTotal, PaginasTotal } = response;
      setItems(Items);
      console.log("Items actualizados:", Items);
      setRegistrosTotal(RegistrosTotal);
      setPaginasTotal(PaginasTotal);
    } catch (error) {
      console.error("Error al buscar aerolíneas:", error);
      modalDialogService.Alert("Error al buscar aerolíneas. Por favor, inténtelo nuevamente.");
    } finally {
      modalDialogService.BloquearPantalla(false);
    }
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await aerolineasService.BuscarPorId(item);
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
      pais_origen: "",
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
        try {
          await aerolineasService.ActivarDesactivar(item);
          console.log(`${item.Activo ? "Desactivada" : "Activada"} aerolínea:`, item.id);
          await Buscar(1);
        } catch (error) {
          console.error("Error al activar/desactivar aerolínea:", error);
          modalDialogService.Alert("Error al activar/desactivar aerolínea. Por favor, inténtelo nuevamente.");
        }
      }
    );
  }

  async function Grabar(item) {
    try {
      await aerolineasService.Grabar(item);
      console.log(`Registro ${AccionABMC === "A" ? "agregado" : "modificado"} correctamente.`);
      await Buscar(1);
      Volver();
      modalDialogService.Alert(
        `Registro ${
          AccionABMC === "A" ? "agregado" : "modificado"
        } correctamente.`
      );
    } catch (error) {
      console.error("Error al grabar aerolínea:", error);
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
    }
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Aerolíneas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
      <AerolineasBuscar
        pais_origen={pais_origen}
        setpais_origen={setpais_origen}
        Agregar={Agregar}
        Buscar={Buscar}
      />
    )}
    
      {AccionABMC === "L" && Items.length > 0 && (
        <AerolineasListado
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
        <AerolineasRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}

      {/* Mostrar total de registros */}
      <div className="mt-3">Total de registros: {RegistrosTotal}</div>
    </div>
  );
}

export { Aerolineas };
