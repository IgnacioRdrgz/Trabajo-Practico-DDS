import React from "react";

export default function AeropuertosListado({ Items, Consultar, Modificar, ActivarDesactivar, Agregar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.nombre}</td>
              <td>{Item.ciudad}</td>
              <td>{Item.pais}</td>


              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline-primary me-1"
                  title="Consultar"
                  onClick={() => Consultar(Item)}
                >
                  <i className="fa fa-eye"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  title="Modificar"
                  onClick={() => Modificar(Item)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  title={Item.Activo ? "Desactivar" : "Activar"}
                  onClick={() => ActivarDesactivar(Item)}
                >
                  {Item.Activo ? <i className="fa fa-times"></i> : <i className="fa fa-check"></i>}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
