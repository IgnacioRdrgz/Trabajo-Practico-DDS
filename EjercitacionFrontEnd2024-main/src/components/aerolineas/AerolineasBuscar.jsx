import React from "react";

export default function AerolineasBuscar({ pais_origen, setpais_origen, Buscar, Agregar }) {
  return (
    <form>
      {/* Campo de búsqueda por país de origen */}
      <div className="row mt-3">
        <div className="col-sm-4 col-md-2">
          <label className="col-form-label">País de Origen:</label>
        </div>
        <div className="col-sm-8 col-md-4">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setpais_origen(e.target.value)}
            value={pais_origen}
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
          {/*
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar()} // Llamar a la función de agregar
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
  */}
        </div>
      </div>
    </form>
  );
}
