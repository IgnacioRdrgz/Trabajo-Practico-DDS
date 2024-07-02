import React from "react";
import { useForm } from "react-hook-form";

export default function VuelosRegistro({
  AccionABMC,
  Aeropuertos,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });
  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo numero de vuelo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="numero_vuelo">
                Número de Vuelo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("numero_vuelo", {
                  required: { value: true, message: "Número de vuelo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Número de vuelo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Número de vuelo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.numero_vuelo ? "is-invalid" : "")
                }
              />
              {errors?.numero_vuelo && touchedFields.numero_vuelo && (
                <div className="invalid-feedback">
                  {errors?.numero_vuelo?.message}
                </div>
              )}

            </div>
          </div>

          {/* campo destino */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="destino">
                Destino<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("destino", {
                  required: { value: true, message: "Destino de vuelo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Destino debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Destino debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.destino ? "is-invalid" : "")
                }
              />
              {errors?.destino && touchedFields.destino && (
                <div className="invalid-feedback">
                  {errors?.destino?.message}
                </div>
              )}

            </div>
          </div>



          {/* campo Aeropuerto */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="idAeropuerto">
                Aeropuerto<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("idAeropuerto", {
                  required: { value: true, message: "Aeropuerto es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.idAeropuerto ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Aeropuertos?.map((x) => (
                  <option value={x.idAeropuerto} key={x.idAeropuerto}>
                    {x.nombre}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* campo Fecha salida */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_salida">
                Fecha de Salida<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_salida", {
                  required: { value: true, message: "Fecha de salida es requerido" }
                })}
                className={
                  "form-control " + (errors?.fecha_salida ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fecha_salida?.message}
              </div>

            </div>
          </div>
          {/* campo Fecha salida */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_llegada">
                Fecha de Llegada<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_llegada", {
                  required: { value: true, message: "Fecha de salida es requerido" }
                })}
                className={
                  "form-control " + (errors?.fecha_llegada ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fecha_llegada?.message}
              </div>

            </div>
          </div>



        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}


      </div>
    </form>
  );
}
