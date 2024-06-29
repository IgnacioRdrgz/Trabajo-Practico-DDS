import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PasajerosRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ defaultValues: Item });

  useEffect(() => {
    if (Item) {
      setValue("nombre", Item.nombre);
      setValue("correo_electronico", Item.correo_electronico);
      setValue("fecha_nacimiento", Item.fecha_nacimiento);
    }
  }, [Item, setValue]);

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 2,
                    message: "Nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Nombre debe tener como máximo 100 caracteres",
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

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="correo_electronico">
                Correo Electrónico<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="email"
                {...register("correo_electronico", {
                  required: {
                    value: true,
                    message: "Correo Electrónico es requerido",
                  },
                  maxLength: {
                    value: 100,
                    message: "Correo Electrónico debe tener como máximo 100 caracteres",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo Electrónico inválido",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.correo_electronico ? "is-invalid" : "")
                }
              />
              {errors?.correo_electronico && touchedFields.correo_electronico && (
                <div className="invalid-feedback">
                  {errors?.correo_electronico?.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fecha_nacimiento">
                Fecha de Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fecha_nacimiento", {
                  required: {
                    value: true,
                    message: "Fecha de Nacimiento es requerida",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.fecha_nacimiento ? "is-invalid" : "")
                }
              />
              {errors?.fecha_nacimiento && touchedFields.fecha_nacimiento && (
                <div className="invalid-feedback">
                  {errors?.fecha_nacimiento?.message}
                </div>
              )}
            </div>
          </div>
        </fieldset>

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
