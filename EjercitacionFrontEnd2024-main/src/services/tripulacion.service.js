
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/tripulacions";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import { config } from "../config";
 const urlResource = config.urlResourceTripulacion;

  async function BuscarPorNombre(nombre) {
    try {
      const response = await httpService.get(urlResource, {
        params: { nombre: nombre }, // Utilizar correctamente el parámetro nombre
      });
      return response.data;
    } catch (error) {
      console.error("Error en tripulacionService.BuscarPorPais:", error);
      throw error;
    }
  }


  
async function Buscar(nombre) {
  try {
    const resp = await httpService.get(urlResource, {
      params: { nombre },
    });
    return resp.data;
  } catch (error) {
    console.error("Error en tripulacionService.Buscar:", error);
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

export const tripulacionService = {
  BuscarPorNombre,
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};


