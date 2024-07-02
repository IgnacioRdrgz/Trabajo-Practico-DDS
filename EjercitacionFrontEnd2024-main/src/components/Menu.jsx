import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";

function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );

  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }

  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    };
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className="fa fa-paper-plane"></i>
          &nbsp;<i>Gestión Aérea</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/aeropuertos">
                Aeropuertos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vuelos">
                Vuelos
                </NavLink>
              </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pasajeros">
                Pasajeros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reservas">
                Reservas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/aviones">
                Aviones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/aerolineas">
                Aerolineas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tripulaciones">
                Tripulaciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pilotos">
                Pilotos
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {usuarioLogueado && (
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Bienvenido: {usuarioLogueado}
                </a>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/Inicio">
                <span className={usuarioLogueado ? "text-warning" : "text-success"}>
                  <i className={usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"}></i>
                </span>
                {usuarioLogueado ? " Logout" : " Login"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Menu };

