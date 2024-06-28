import React from "react";
export default function ReservasBuscar({ VueloId, setVueloId, PasajeroId, setPasajeroId, FechaReserva, setFechaReserva, Buscar, Agregar }) {

    return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">ID de Vuelo:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setVueloId(e.target.value)}
              value={VueloId}
              autoFocus
            />
          </div>
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">ID de Pasajero:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPasajeroId(e.target.value)}
              value={PasajeroId}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Fecha de Reserva:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFechaReserva(e.target.value)}
              value={FechaReserva}
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
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };