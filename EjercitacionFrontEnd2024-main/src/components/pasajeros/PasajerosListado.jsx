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
          </tr>
        </thead>
        <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.nombre}</td>
              <td>{Item.correo_electronico}</td>
              <td>{Item.fecha_nacimiento}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
