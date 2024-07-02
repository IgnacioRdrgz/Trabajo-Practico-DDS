import React from "react";

export default function PilotosListado({ Items, Consultar, Modificar, ActivarDesactivar, Agregar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>licencia</th>
            <th>Fecha de contratacion</th> {/* Agregar esta línea */}
            

          </tr>
        </thead>
                <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.nombre}</td>
              <td>{Item.licencia}</td>
              <td>{Item.fecha_contratacion}</td> {/* Agregar esta línea */}
              

              
            </tr>
          ))}
        </tbody>
      </table>

   
    </div>
  );
}
