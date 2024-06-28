import React from "react";
import moment from "moment";

export default function ReservasListado({
  Items,
  BuscarPorId,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ID Reserva</th>
            <th className="text-center">ID Vuelo</th>
            <th className="text-center">ID Pasajero</th>
            <th className="text-center">Fecha de Reserva</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.id}>
                <td>{Item.id}</td>
                <td className="text-end">{Item.vuelo_id}</td>
                <td className="text-end">{Item.pasajero_id}</td>
                <td className="text-end">
                  {moment(Item.fecha_reserva).format("DD/MM/YYYY")}
                </td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => BuscarPorId(Item, 'C')}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => BuscarPorId(Item, 'M')}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Página: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
        </div>
      </div>
    </div>
  );
}