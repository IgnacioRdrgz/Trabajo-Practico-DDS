import httpService from "./http.service";
import { config } from "../config";
const urlResourcePasajeros = config.urlResourcePasajeros; // URL de la API para obtener pasajeros
const urlResourceReservas = config.urlResourceReservas; // URL de la API para obtener reservas
export const reservasService = {
  Buscar,
  BuscarPorId,
  Grabar,
  ActivarDesactivar,
  ObtenerPasajeros,
};

async function Buscar(clase, pagina) {
  const response = await fetch(
    `${config.urlServidor}/api/reservas?clase=${clase}&pagina=${pagina}`
  );
  return await response.json();
}

async function BuscarPorId(id) {
  const response = await fetch(`${config.urlServidor}/api/reservas/${id}`);
  return await response.json();
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResourceReservas + "/" + item.id);
}

async function Grabar(item) {
  if (item.id === 0) {
    await httpService.post(urlResourceReservas, item);
  } else {
    await httpService.put(urlResourceReservas + "/" + item.id, item);
  }
}

async function ObtenerPasajeros() {
  const response = await fetch(urlResourcePasajeros);
  console.log(response);
  return await response.json();
}


