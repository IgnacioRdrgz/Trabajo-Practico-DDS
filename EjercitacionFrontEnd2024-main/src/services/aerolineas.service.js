import httpService from "./http.service";
import { config } from "../config";

const urlResource = config.urlResourceAerolineas;

async function BuscarPorNombre(nombre) {
  try {
    const response = await httpService.get(`${urlResource}?nombre=${nombre}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function BuscarPorPais(pais_origen) {
  try {
    const response = await httpService.get(urlResource, {
      params: { pais_origen: pais_origen }, // Utilizar correctamente el parámetro pais_origen
    });
    return response.data;
  } catch (error) {
    console.error("Error en aerolineasService.BuscarPorPais:", error);
    throw error;
  }
}


async function buscarAerolineasPorNombre(nombre) {
  try {
    const resp = await httpService.get(urlResource, {
      params: { nombre },
    });
    return resp.data;
  } catch (error) {
    console.error("Error en aerolineasService.buscarAerolineasPorNombre:", error);
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
    console.error("Error en aerolineasService.Buscar:", error);
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

export const aerolineasService = {
  BuscarPorNombre,
  BuscarPorPais,
  buscarAerolineasPorNombre,
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
