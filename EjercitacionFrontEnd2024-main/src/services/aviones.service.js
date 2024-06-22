import httpService from "./http.service";
import { config } from "../config";

const urlResourceAviones = config.urlResourceAviones;
const urlResourceAerolineas = config.urlResourceAerolineas; // URL de la API para obtener aerolíneas

async function Buscar(modelo, Pagina) {
  const resp = await httpService.get(urlResourceAviones, {
    params: { modelo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourceAviones + "/" + item.id);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResourceAviones + "/" + item.id);
}

async function Grabar(item) {
  if (item.id === 0) {
    await httpService.post(urlResourceAviones, item);
  } else {
    await httpService.put(urlResourceAviones + "/" + item.id, item);
  }
}

async function ObtenerAerolineas() {
  const resp = await httpService.get(urlResourceAerolineas);
  return resp.data;
}

export const avionesService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
  ObtenerAerolineas,
};
