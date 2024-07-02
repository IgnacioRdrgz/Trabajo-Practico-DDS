import React from "react";

export default function PilotosBuscar({ nombre, setnombre, Buscar, Agregar }) {
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setnombre(e.target.value)}
              value={nombre}
              maxLength="55"
            />
          </div>
        </div>

        <hr />

        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => Buscar(1)}  // Llamar a la función de búsqueda
            >
              <i className="fa fa-search"> </i> Buscar
            </button>
            
          </div>
        </div>
      </div>
    </form>
  );
}
