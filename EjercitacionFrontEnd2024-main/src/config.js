//const urlServidor = "http://localhost:3000"
//const urlServidor = ""  // vacio para cuando se despliega el frontend, en el mismo servidor que el backend
const urlServidor = "http://localhost:4000"
//const urlServidor = "https://webapi.pymes.net.ar"
//const urlServidor = "https://labsys.frc.utn.edu.ar/dds-express"



const urlResourceAviones = urlServidor + "/api/aviones";
const urlResourceAerolineas = urlServidor + "/api/aerolineas";
const urlResourceAeropuertos = "http://localhost:4000/api/aeropuertos";
const urlResourceVuelos = urlServidor + "/api/vuelos";

export const config = {
    urlServidor,
    urlResourceAviones,
    urlResourceAerolineas,
    urlResourceAeropuertos,
    urlResourceVuelos
}