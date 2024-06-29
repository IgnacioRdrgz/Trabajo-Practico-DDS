import { config } from "../config";

export const reservasService = {
  Buscar,
  BuscarPorId,
  Grabar,
  ActivarDesactivar,
};

async function Buscar(id, pagina) {
  const response = await fetch(
    `${config.urlServidor}/api/reservas?id=${id}&pagina=${pagina}`
  );
  return await response.json();
}

async function BuscarPorId(id) {
  const response = await fetch(`${config.urlServidor}/api/reservas/${id}`);
  return await response.json();
}

async function Grabar(item) {
  const response = await fetch(`${config.urlServidor}/api/reservas`, {
    method: item.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

async function ActivarDesactivar(item) {
  const response = await fetch(
    `${config.urlServidor}/api/reservas/${item.id}/activar-desactivar`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}
