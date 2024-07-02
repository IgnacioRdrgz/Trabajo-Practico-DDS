
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/tripulacions";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import { config } from "../config";
 const urlResource = config.urlResourcePiloto;

  async function BuscarPorNombre(nombre) {
    try {
      const response = await httpService.get(urlResource, {
        params: { nombre: nombre }, // Utilizar correctamente el parámetro nombre
      });
      return response.data;
    } catch (error) {
      console.error("Error en pilotosService.BuscarPorPais:", error);
      throw error;
    }
  }


  async function Buscar(nombre, Pagina) {
    const resp = await httpService.get(urlResource, {
      params: { nombre, Pagina },
    });
    return resp.data;
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

export const pilotosService = {
  BuscarPorNombre,
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};


