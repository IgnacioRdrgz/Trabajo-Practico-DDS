import httpService from "./http.service";
// Cambiamos la URL para apuntar al recurso de reservas
import { config } from "../config";
const urlResource = config.urlResourceReservas;

async function Buscar(vuelo_id, pasajero_id, fecha_reserva, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { vuelo_id, pasajero_id, fecha_reserva, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(id) {
  const resp = await httpService.get(`${urlResource}/${id}`);
  return resp.data;
}

async function ActivarDesactivar(id) {
  await httpService.delete(`${urlResource}/${id}`);
}

async function Grabar(reserva) {
  if (reserva.id === 0) {
    await httpService.post(urlResource, reserva);
  } else {
    await httpService.put(`${urlResource}/${reserva.id}`, reserva);
  }
}

export const reservasService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};