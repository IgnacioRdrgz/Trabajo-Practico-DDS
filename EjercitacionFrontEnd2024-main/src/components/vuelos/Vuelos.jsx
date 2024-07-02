
import React, { useState, useEffect } from "react";
import moment from "moment";
import VuelosBuscar from "./VuelosBuscar";
import VuelosListado from "./VuelosListado";
import VuelosRegistro from "./VuelosRegistro";
import { vuelosService } from "../../services/vuelos.service";
import { aeropuertosService } from "../../services/aeropuertos.service";
import modalDialogService from "../../services/modalDialog.service";
import AuthService from "../../services/auth.service";
//import { ModalDialog } from "./components/ModalDialog";
//import { vuelosFamiliasMockService as vuelosFamiliasService } from "../../services/vuelosFamilias-mock.service";

function Vuelos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [numero_vuelo, setnumero_vuelo] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [Aeropuertos, setAeropuertos] = useState(null);
  const usuarioLogueado = AuthService.getUsuarioLogueado();

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarAeropuertos() {
      let data = await aeropuertosService.Buscar();
      setAeropuertos(data);
    }
    BuscarAeropuertos();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await vuelosService.Buscar(numero_vuelo, _pagina);
    modalDialogService.BloquearPantalla(false);

    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);


    //generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 20); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }



  async function BuscarPorId(item, accionABMC) {
    const data = await vuelosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }


  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    // if (!item.Activo) {
    //      modalDialogService.Alert("No puede modificarse un registro Inactivo.");

    //   return;
    // }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      id: 0,
      numero_vuelo: '',
      destino: '',
      idAeropuerto: '',
      fecha_salida: moment(new Date()).format("YYYY-MM-DD"),
      fecha_llegada: moment(new Date()).format("YYYY-MM-DD"),

    });
    modalDialogService.Alert("preparando el Alta...");
    console.log(Item);
  }



  async function ActivarDesactivar(item) {
    if (usuarioLogueado === "ignacio" || usuarioLogueado === "admin") {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (item.Activo ? "desactivar" : "activar") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await vuelosService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  } else {
    modalDialogService.Alert("No tiene permisos para realizar esta acción.");
  }
}


  async function Grabar(item) {
    if (usuarioLogueado === "ignacio" || usuarioLogueado === "admin") {
    // agregar o modificar
    try {
      await vuelosService.Grabar(item);
    }
    catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
      );
    }, 0);
  } else {
    modalDialogService.Alert("No tiene permisos para realizar esta acción.");
  }
}


  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Vuelos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <VuelosBuscar
        numero_vuelo={numero_vuelo}
        setnumero_vuelo={setnumero_vuelo}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
      />
      }



      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 &&
        <VuelosListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          ActivarDesactivar={ActivarDesactivar}


          RegistrosTotal={RegistrosTotal}

          Buscar={Buscar}
          Aeropuertos={Aeropuertos} // Pasar Aeropuertos como prop al Listado
        />
      }


      {AccionABMC === "L" && Items?.length === 0 &&
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      }

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" &&
        <VuelosRegistro
          {...{ AccionABMC, Aeropuertos, Item, Grabar, Volver }}
        />
      }

    </div>
  );
}
export { Vuelos };
