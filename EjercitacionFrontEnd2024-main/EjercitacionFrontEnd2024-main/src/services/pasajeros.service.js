import httpService from "./http.service";

const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2024/api/pasajeros";

async function Buscar(nombre = '', Pagina = 1) {
  const params = {
    nombre,
    Pagina,
  };
  try {
    const resp = await httpService.get(urlResource, { params });
    return resp.data;
  } catch (error) {
    console.error("Error en función Buscar:", error);
    throw error; // Propaga el error para manejo externo
  }
}

async function BuscarPorId(item) {
  try {
    const resp = await httpService.get(`${urlResource}/${item.id}`);
    return resp.data;
  } catch (error) {
    console.error("Error en función BuscarPorId:", error);
    throw error; // Propaga el error para manejo externo
  }
}

async function Grabar(item) {
  try {
    if (item.id === 0) {
      await httpService.post(urlResource, item);
    } else {
      await httpService.put(`${urlResource}/${item.id}`, item);
    }
  } catch (error) {
    console.error("Error en función Grabar:", error);
    throw error; // Propaga el error para manejo externo
  }
}

export const pasajerosService = {
  Buscar,
  BuscarPorId,
  Grabar,
};