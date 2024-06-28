import React, { useState, useEffect } from "react";
import moment from "moment";
import ReservasBuscar from "./ReservasBuscar";
import ReservasListado from "./ReservasListado";
import ReservasRegistro from "./ReservasRegistro";
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

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    Buscar();
  }, []);

  async function Buscar(_pagina = Pagina) {
    modalDialogService.BloquearPantalla(true);
    const data = await reservasService.Buscar(_pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await reservasService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      id: 0,
      vuelo_id: '',
      pasajero_id: '',
      fecha_reserva: moment(new Date()).format("YYYY-MM-DD"),
    });
  }

  async function Grabar(item) {
    try {
      await reservasService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();

    modalDialogService.Alert(
      "Reserva " +
      (AccionABMC === "A" ? "agregada" : "modificada") +
      " correctamente."
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Reservas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ReservasBuscar
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resultados de búsqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ReservasListado
          {...{
            Items,
            BuscarPorId,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificación/consulta */}
      {AccionABMC !== "L" && (
        <ReservasRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Reservas };