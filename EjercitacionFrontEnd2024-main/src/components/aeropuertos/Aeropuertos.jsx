import React, { useState, useEffect } from 'react';
import { aeropuertosService } from '../../services/aeropuertos.service';


function Aeropuertos() {
  const tituloPagina = 'Aeropuertos';
  const [aeropuertos, setAeropuertos] = useState([]); // Inicializar como un arreglo vacío

  // Cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarAeropuertos();
  }, []);

  async function BuscarAeropuertos() {
    try {
      let data = await aeropuertosService.Buscar();
      console.log('Datos recibidos de aeropuertosService.Buscar:', data); // Verificar los datos recibidos
      if (Array.isArray(data)) {
        setAeropuertos(data);

      } else {

        console.error('La respuesta no es un arreglo:', data);

        setAeropuertos([]); // Asignar un arreglo vacío en caso de error
      }
    } catch (error) {
      console.error('Error al buscar aeropuertos:', error);
      setAeropuertos([]); // Asignar un arreglo vacío en caso de error
    }
  };

  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Id</th>
            <th style={{ width: "30%" }}>Nombre</th>
            <th style={{ width: "25%" }}>Ciudad</th>
            <th style={{ width: "20%" }}>Pais</th>
            <th style={{ width: "35%" }}>Fecha Inaugiracion</th>
          </tr>
        </thead>
        <tbody>
          {aeropuertos.length > 0 ? (
            aeropuertos.map((aeropuerto) => (
              <tr key={aeropuerto.id}>
                <td>{aeropuerto.idAeropuerto}</td>
                <td>{aeropuerto.nombre}</td>
                <td>{aeropuerto.ciudad}</td>
                <td>{aeropuerto.pais}</td>
                <td>{aeropuerto.fecha_inauguracion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { Aeropuertos };