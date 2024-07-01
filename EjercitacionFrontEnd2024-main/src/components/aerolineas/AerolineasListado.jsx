import React from "react";

export default function AerolineasListado({ Items, Consultar, Modificar, ActivarDesactivar, Agregar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País de Origen</th>
            {/* <th>Acciones</th> */} {/* Comentado */}
            </tr>
        </thead>
        <tbody>
          {Items && Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.nombre}</td>
              <td>{Item.pais_origen}</td>
              {/*
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
            */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
