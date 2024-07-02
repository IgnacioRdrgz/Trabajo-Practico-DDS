import React from "react";
import { NavLink } from "react-router-dom";


export default function VuelosListado({ Items, Consultar, Modificar, ActivarDesactivar,

  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar, Aeropuertos }) {
  const getNombreAeropuerto = (idAeropuerto) => {
    const aeropuerto = Aeropuertos.find(a => a.idAeropuerto === idAeropuerto);
    return aeropuerto ? aeropuerto.nombre : 'Aeropuerto desconocido';
  }
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Número de Vuelo</th>
            <th>Destino</th>
            <th>Aeropuerto</th>
            <th>Fecha de Salida</th> {/* Agregar esta línea */}
            <th>Fecha de Llegada</th> {/* Agregar esta línea */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.numero_vuelo}</td>
              <td>{Item.destino}</td>
              <td>
                <NavLink className="nav-link" to="/aeropuertos">
                  {getNombreAeropuerto(Item.idAeropuerto)}
                </NavLink>


              </td>
              <td>{Item.fecha_salida}</td> {/* Agregar esta línea */}
              <td>{Item.fecha_llegada}</td> {/* Agregar esta línea */}
              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline-primary me-1"
                  title="Consultar"
                  onClick={() => Consultar(Item)}
                >
                  <i className="fa fa-eye"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-primary me-1"
                  title="Modificar"
                  onClick={() => Modificar(Item)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger me-1"
                  title="Desactivar"
                  onClick={() => ActivarDesactivar(Item)}
                >
                  <i className="fa fa-circle-down"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>



        </div>
      </div>


    </div>
  );
}
