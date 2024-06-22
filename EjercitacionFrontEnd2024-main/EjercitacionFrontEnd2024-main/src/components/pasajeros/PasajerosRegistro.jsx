import React from "react";
import { useForm } from "react-hook-form";

export default function PasajerosRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  if (!Item) return null;
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ defaultValues: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              {errors?.nombre && touchedFields.nombre && (
                <div className="invalid-feedback">
                  {errors?.nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo correo_electronico */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="correo_electronico">
                correo_electronico<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="email"
                {...register("correo_electronico", {
                  required: { value: true, message: "El correo electrónico es requerido" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El formato del correo electrónico no es válido",
                  },
                })}
                className={
                  "form-control " + (errors?.correo_electronico ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.correo_electronico?.message}</div>
            </div>
          </div>

          {/* campo fecha_nacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_nacimiento">
                fecha_nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_nacimiento", {
                  required: { value: true, message: "Fecha Alta es requerido" }
                })}
                className={
                  "form-control " + (errors?.fecha_nacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fecha_nacimiento?.message}
              </div>
            </div>
          </div>

          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("Activo")}
                className="form-control"
              >
                <option value="">Seleccione...</option>
                <option value="false">NO</option>
                <option value="true">SI</option>
              </select>
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