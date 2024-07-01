import axios from "axios";
import { config } from "../config";




const urlResource = "http://localhost:4000/api/aeropuertos"
async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const aeropuertosService = {
  Buscar
};
