import React from "react";

export default function AeropuertosBuscar({ pais, setpais, Buscar, Agregar }) {
  return (
    <form>
      {/* Campo de búsqueda por país de origen */}
      <div className="row mt-3">
        <div className="col-sm-4 col-md-2">
          <label className="col-form-label">País:</label>
        </div>
        <div className="col-sm-8 col-md-4">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setpais(e.target.value)}
            value={pais}
            maxLength="55"
            autoFocus
          />
        </div>
      </div>

      {/* Botones */}
      <div className="row mt-3">
        <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1)} // Llamar a la función de búsqueda con página 1
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar()} // Llamar a la función de agregar
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
        </div>
      </div>
    </form>
  );
}
