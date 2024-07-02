import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { aeropuertosService } from "../../services/aeropuertos.service";

export default function AeropuertosRegistro({
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
      setValue("ciudad", Item.ciudad || "");
      setValue("pais", Item.pais || "");

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
              <label className="col-form-label" htmlFor="ciudad">
                Ciudad<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("ciudad", {
                  required: { value: true, message: "Ciudad es requerido" },
                  minLength: {
                    value: 3,
                    message: "Ciudad debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Ciudad debe tener como máximo 100 caracteres",
                  },
                })}
                className={
                  "form-control" + (errors?.ciudad ? " is-invalid" : "")
                }
              />
              {errors?.ciudad && (
                <div className="invalid-feedback">
                  {errors?.ciudad?.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="pais">
                País<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("pais", {
                  required: { value: true, message: "País de Origen es requerido" },
                  minLength: {
                    value: 3,
                    message: "País de Origen debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "País de Origen debe tener como máximo 100 caracteres",
                  },
                })}
                className={
                  "form-control" + (errors?.pais ? " is-invalid" : "")
                }
              />
              {errors?.pais && (
                <div className="invalid-feedback">
                  {errors?.pais?.message}
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
