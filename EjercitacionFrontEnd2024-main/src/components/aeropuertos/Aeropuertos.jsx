import React, { useState, useEffect } from "react";
import AeropuertosListado from "./AeropuertosListado";
import AeropuertosRegistro from "./AeropuertosRegistro";
import AeropuertosBuscar from "./AeropuertosBuscar";
import { aeropuertosService } from "../../services/aeropuertos.service";
import modalDialogService from "../../services/modalDialog.service";

function Aeropuertos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  const [AccionABMC, setAccionABMC] = useState("L");
  const [pais, setpais] = useState("");
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
      console.log("Buscando aerolíneas con país de origen:", pais);
      const response = await aeropuertosService.BuscarPorPais(pais);
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
    const data = await aeropuertosService.BuscarPorId(item);
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
      ciudad: "",
      pais: "",
    });
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      `¿Está seguro que quiere ${item.Activo ? "desactivar" : "activar"
      } el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        try {
          await aeropuertosService.ActivarDesactivar(item);
          console.log(`${item.Activo ? "Desactivada" : "Activada"} aeropuerto:`, item.id);
          await Buscar(1);
        } catch (error) {
          console.error("Error al activar/desactivar aeropuerto:", error);
          modalDialogService.Alert("Error al activar/desactivar aeropuerto. Por favor, inténtelo nuevamente.");
        }
      }
    );
  }

  async function Grabar(item) {
    try {
      await aeropuertosService.Grabar(item);
      console.log(`Registro ${AccionABMC === "A" ? "agregado" : "modificado"} correctamente.`);
      await Buscar(1);
      Volver();
      modalDialogService.Alert(
        `Registro ${AccionABMC === "A" ? "agregado" : "modificado"
        } correctamente.`
      );
    } catch (error) {
      console.error("Error al grabar aeropuerto:", error);
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
        Aeropuertos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <AeropuertosBuscar
          pais={pais}
          setpais={setpais}
          Agregar={Agregar}
          Buscar={Buscar}
        />
      )}

      {AccionABMC === "L" && Items.length > 0 && (
        <AeropuertosListado
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
        <AeropuertosRegistro
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}

      {/* Mostrar paginación solo si hay más de una página */}
      {PaginasTotal > 1 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: PaginasTotal }, (_, index) => (
              <li className={`page-item ${index + 1 === Pagina ? 'active' : ''}`} key={index}>
                <button className="page-link" onClick={() => setPagina(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Mostrar total de registros */}
      <div className="mt-3">Total de registros: {RegistrosTotal}</div>
    </div>
  );
}

export { Aeropuertos };
