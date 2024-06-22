import React from "react";
import { NavLink } from "react-router-dom";

export default function AvionesListado({ Items, Consultar, Modificar, ActivarDesactivar, Agregar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Aerolínea</th>
            <th>Fecha de Fabricación</th> {/* Agregar esta línea */}
            <th>Acciones</th>
          </tr>
        </thead>
                <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.modelo}</td>
              <td>{Item.capacidad}</td>
              <td>
                <NavLink className="nav-link" to="/aerolineas">
                  {Item.aerolinea}
                </NavLink>
              </td>
              <td>{Item.fecha_fabricacion}</td> {/* Agregar esta línea */}
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

   
    </div>
  );
}
