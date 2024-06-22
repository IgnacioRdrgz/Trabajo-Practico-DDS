// MiComponente.js

import React, { useEffect, useState } from 'react';
import httpService from '../services/http.service'; // Ajusta la ruta según donde hayas ubicado tu archivo de configuración de Axios

function MiComponente() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await httpService.get('/api/vuelos'); // Reemplaza '/ruta-de-tu-api' con la ruta correcta de tu API
        setData(response.data); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

    fetchData(); // Llama a la función fetchData al montar el componente
  }, []); // [] como segundo argumento para que se ejecute solo una vez al montar

  return (
    <div>
      {/* Renderiza los datos obtenidos */}
      {data.map(item => (
        <div key={item.id}>{item.modelo}</div>
      ))}
    </div>
  );
}

export default MiComponente;
