import httpService from "./http.service";
import { config } from "../config";

const urlResourcePasajeros = config.urlResourcePasajeros;

async function Buscar(nombre) {
  try {
    const response = await httpService.get(urlResourcePasajeros, {
      params: { nombre: nombre }, // Utilizar correctamente el parámetro pais_origen
    });
    return response.data;
  } catch (error) {
    console.error("Error en pasajeros:", error);
    throw error;
  }
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
