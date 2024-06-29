import httpService from "./http.service";
import { config } from "../config";

const urlResourcePasajeros = config.urlResourcePasajeros;

async function Buscar(nombre, Pagina) {
  const resp = await httpService.get(urlResourcePasajeros, {
    params: { nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourcePasajeros + "/" + item.id);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResourcePasajeros + "/" + item.id);
}

async function Grabar(item) {
  if (item.id === 0) {
    await httpService.post(urlResourcePasajeros, item);
  } else {
    await httpService.put(urlResourcePasajeros + "/" + item.id, item);
  }
}

export const pasajerosService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
