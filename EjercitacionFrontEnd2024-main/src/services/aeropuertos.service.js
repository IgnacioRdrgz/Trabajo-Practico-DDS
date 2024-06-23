import httpService from "./http.service";
import { config } from "../config";

const urlResource = config.urlResourceAeropuertos;

async function BuscarPorNombre(nombre) {
  try {
    const response = await httpService.get(`${urlResource}?nombre=${nombre}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function BuscarPorPais(pais) {
  try {
    const response = await httpService.get(urlResource, {
      params: { pais: pais }, // Utilizar correctamente el parámetro pais
    });
    return response.data;
  } catch (error) {
    console.error("Error en aeropuertosService.BuscarPorPais:", error);
    throw error;
  }
}
async function BuscarPorCiudad(ciudad) {
  try {
    const response = await httpService.get(urlResource, {
      params: { ciudad: ciudad }, // Utilizar correctamente el parámetro pais
    });
    return response.data;
  } catch (error) {
    console.error("Error en aeropuertosService.BuscarPorPais:", error);
    throw error;
  }
}


async function buscarAeropuertosPorNombre(nombre) {
  try {
    const resp = await httpService.get(urlResource, {
      params: { nombre },
    });
    return resp.data;
  } catch (error) {
    console.error("Error en aeropuertosService.buscarAeropuertosPorNombre:", error);
    throw error; // Lanzar el error para que sea manejado en el componente React
  }
}

async function Buscar(nombre) {
  try {
    const resp = await httpService.get(urlResource, {
      params: { nombre },
    });
    return resp.data;
  } catch (error) {
    console.error("Error en aeropuertosService.Buscar:", error);
    throw error; // Lanzar el error para que sea manejado en el componente React
  }
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.id);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.id);
}

async function Grabar(item) {
  if (item.id === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.id, item);
  }
}

export const aeropuertosService = {
  BuscarPorNombre,
  BuscarPorCiudad,
  BuscarPorPais,
  buscarAeropuertosPorNombre,
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
