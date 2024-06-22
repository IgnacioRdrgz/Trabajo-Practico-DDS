import React, { useState } from "react";
import moment from "moment";
import PasajerosBuscar from "./PasajerosBuscar";
import PasajerosListado from "./PasajerosListado";
import PasajerosRegistro from "./PasajerosRegistro";
import { pasajerosService } from "../../services/pasajeros.service";

function Pasajeros() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await pasajerosService.Buscar(nombre, Activo, _pagina);
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
    const data = await pasajerosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  
  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdArticulo: 0,
      nombre: '',
      correo_electronico: '',
      fecha_nacimiento: moment(new Date()).format("YYYY-MM-DD"),
      Activo: true,
    });
    alert("preparando el Alta...");
    console.log(Item);
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      await pasajerosService.ActivarDesactivar(item);
      await Buscar();
    }
  }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await pasajerosService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }
  

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Pasajeros <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <PasajerosBuscar
        Nombre={nombre}
        setNombre={setNombre}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
      />
      }

      {AccionABMC === "L" && Items?.length > 0 &&
        <PasajerosListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      }

      {AccionABMC === "L" && Items?.length === 0 &&
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      }

      {AccionABMC !== "L" &&
        <PasajerosRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      }
    </div>
  );
}
export { Pasajeros };