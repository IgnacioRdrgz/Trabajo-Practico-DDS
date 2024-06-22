import httpService from "./http.service";
const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2024/api/pasajeros";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// import {config} from "../config";
// const urlResource = config.urlResourcePasajeross;




async function Buscar(nombre, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombre, Activo, Pagina },
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


export const pasajerosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
