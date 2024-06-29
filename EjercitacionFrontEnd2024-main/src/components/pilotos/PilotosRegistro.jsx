import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PilotosRegistro({
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
      setValue("nombre", Item.nombre || "");
      setValue("licencia", Item.licencia || "");
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
                    value: 3,
                    message: "Nombre debe tener al menos 3 caracteres",
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
              <label className="col-form-label" htmlFor="licencia">
                Licencia <span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("licencia", {
                  required: { value: true, message: "Licencia es requerido" },
                  minLength: {
                    value: 3,
                    message: "Licencia debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Licencia debe tener como máximo 100 caracteres",
                  },
                })}
                className={
                  "form-control" + (errors?.licencia ? " is-invalid" : "")
                }
              />
              {errors?.licencia && (
                <div className="invalid-feedback">
                  {errors?.licencia?.message}
                </div>
              )}
            </div>
            
          </div>
          <div className="row">
        <div className="col-sm-4 col-md-3 offset-md-1">
          <label className="col-form-label" htmlFor="fecha_contratacion">
            Fecha de Fabricación<span className="text-danger">*</span>:
          </label>
        </div>
        <div className="col-sm-8 col-md-6">
          <input
            type="date"
            {...register("fecha_contratacion", {
              required: { value: false, message: "Fecha de contratacion es requerida" },
            })}
            className={
              "form-control " + (errors?.fecha_fabricacion ? "is-invalid" : "")
            }
          />
          {errors?.fecha_contratacion && touchedFields.fecha_contratacion && (
            <div className="invalid-feedback">
              {errors?.fecha_contratacion?.message}
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
