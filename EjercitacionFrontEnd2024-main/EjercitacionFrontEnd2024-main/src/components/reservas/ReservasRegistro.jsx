import React from 'react';
import { useForm } from 'react-hook-form';

export default function ReservasRegistro({ AccionABMC, Grabar, Volver }) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm();

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo vuelo_id */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="vuelo_id">
                ID del Vuelo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("vuelo_id", {
                  required: { value: true, message: "ID del Vuelo es requerido" },
                })}
                className={"form-control " + (errors?.vuelo_id ? "is-invalid" : "")}
              />
              {errors?.vuelo_id && touchedFields.vuelo_id && (
                <div className="invalid-feedback">
                  {errors?.vuelo_id?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo pasajero_id */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="pasajero_id">
                ID del Pasajero<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("pasajero_id", {
                  required: { value: true, message: "ID del Pasajero es requerido" },
                })}
                className={"form-control " + (errors?.pasajero_id ? "is-invalid" : "")}
              />
              <div className="invalid-feedback">{errors?.pasajero_id?.message}</div>
            </div>
          </div>

          {/* campo fecha_reserva */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_reserva">
                Fecha de Reserva<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_reserva", {
                  required: { value: true, message: "Fecha de Reserva es requerido" },
                })}
                className={"form-control " + (errors?.fecha_reserva ? "is-invalid" : "")}
              />
              <div className="invalid-feedback">{errors?.fecha_reserva?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver */}
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
