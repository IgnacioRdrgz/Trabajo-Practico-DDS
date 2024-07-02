import axios from "axios";
import { config } from "../config";




const urlResource = config.urlResourceAeropuertos;
async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const aeropuertosService = {
  Buscar
};
