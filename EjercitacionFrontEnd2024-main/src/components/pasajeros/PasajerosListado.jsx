import React from "react";
import { NavLink } from "react-router-dom";

export default function PasajerosListado({ Items, Consultar, Modificar, ActivarDesactivar, Agregar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.nombre}</td>
              <td>{Item.correo_electronico}</td>
              <td>{Item.fecha_nacimiento}</td>
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
