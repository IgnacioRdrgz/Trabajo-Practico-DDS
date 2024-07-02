import httpService from "./http.service";
import { config } from "../config";

const urlResourceVuelos = config.urlResourceVuelos;
const urlResourceAeropuertos = config.urlResourceAeropuertos; // URL de la API para obtener aerolíneas

async function Buscar(destino, Pagina) {
  const resp = await httpService.get(urlResourceVuelos, {
    params: { destino, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResourceVuelos + "/" + item.id);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResourceVuelos + "/" + item.id);
}

async function Grabar(item) {
  if (item.id === 0) {
    await httpService.post(urlResourceVuelos, item);
  } else {
    await httpService.put(urlResourceVuelos + "/" + item.id, item);
  }
}

async function ObtenerAeropuertos() {
  const resp = await httpService.get(urlResourceAeropuertos);
  return resp.data;
}

export const vuelosService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
  ObtenerAeropuertos,
};
