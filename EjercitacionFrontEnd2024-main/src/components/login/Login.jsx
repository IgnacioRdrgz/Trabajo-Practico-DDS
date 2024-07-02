import React, { useState, useEffect } from "react";
import "./Login.css"; //css global
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import AuthService from "../../services/auth.service";


 function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();
  const {componentFrom} = useParams();


  const navigateToComponent = () => {
    navigate(`/${componentFrom}`);
  };


  const handleIngresar = async () => {
    //AuthService.login(usuario, clave, navigate);
    AuthService.login(usuario, clave, navigateToComponent);
  };




  useEffect(() => {
    // lo primero que hacemos al ingresar al login es desloguearnos
    // borrando los datos de sessionStorage y el state usuarioLogueado
    AuthService.logout();
  });


  return (
    <>
    <div className="divbody text-center">
      <main className="form-signin w-100 m-auto">
        <form className="p-5">
          <img
            className="mb-4"
            src="https://static.vecteezy.com/system/resources/previews/028/754/395/original/flight-insurance-3d-icon-illustrations-png.png"
            alt=""
            width="150"
            height="150"
          />
          <h1 className="h3 mb-3 fw-normal">Por favor ingrese</h1>


          <div className="form-floating">
            <input
              type="text"
              autoComplete="off"
              placeholder="usuario"
              onChange={(e) => setUsuario(e.target.value)}
              value = {usuario}
              autoFocus
              className="form-control"
              id="usuario"
            />
            <label className="custom-control" htmlFor="usuario">
              Usuario
            </label>
          </div>
          <div className="form-floating">
            <input
             type="password"
             autoComplete="off"
             placeholder="Clave"
             onChange={(e) => setClave(e.target.value)}
             value = {clave}
             className="form-control"
             id="clave"
       
            />
            <label className="custom-control" for="clave">
              Clave
            </label>
          </div>


          
          <button className="w-100 btn btn-lg btn-primary" type="button"  onClick={(e) => handleIngresar()}>
            Ingresar
          </button>
          <p className="mt-5 mb-3 text-muted">© 2024</p>
        </form>
      </main>
    </div>


  </>
  );
}

export {Login};