import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AvionesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
  aerolineas,
  aerolineaSeleccionada,
  setAerolineaSeleccionada,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ defaultValues: Item });

  useEffect(() => {
    if (Item) {
      setValue("modelo", Item.modelo);
      setValue("capacidad", Item.capacidad);
      if (Item.aerolinea) {
        setAerolineaSeleccionada(Item.aerolinea);
        setValue("aerolinea", Item.aerolinea);
      }
      setValue("fecha_fabricacion", Item.fecha_fabricacion);
    }
  }, [Item, setValue, setAerolineaSeleccionada]);

  const onSubmit = (data) => {
    data.aerolinea = aerolineaSeleccionada;
    Grabar(data);
  };

  console.log("Tipo de aerolineas:", typeof aerolineas);
  console.log("Contenido de aerolineas:", aerolineas);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="modelo">
                Modelo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("modelo", {
                  required: { value: true, message: "Modelo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Modelo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Modelo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.modelo ? "is-invalid" : "")
                }
              />
              {errors?.modelo && touchedFields.modelo && (
                <div className="invalid-feedback">
                  {errors?.modelo?.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="capacidad">
                Capacidad<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("capacidad", {
                  required: { value: true, message: "Capacidad es requerida" },
                  min: {
                    value: 1,
                    message: "Capacidad debe ser mayor a 0",
                  },
                  max: {
                    value: 9999,
                    message: "Capacidad debe ser menor o igual a 9999",
                  },
                })}
                className={
                  "form-control " + (errors?.capacidad ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.capacidad?.message}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="aerolinea">
                Aerolínea<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("aerolinea", {
                  required: { value: true, message: "Aerolínea es requerida" },
                })}
                value={aerolineaSeleccionada || ""}
                onChange={(e) => setAerolineaSeleccionada(e.target.value)}
                className={
                  "form-control" + (errors?.aerolinea ? " is-invalid" : "")
                }
              >
                <option value="">Seleccionar Aerolínea</option>
                {Array.isArray(aerolineas.Items) &&
                  aerolineas.Items.map((aerolinea) => (
                    <option key={aerolinea.id} value={aerolinea.nombre}>
                      {aerolinea.nombre}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">
                {errors?.aerolinea?.message}
              </div>
            </div>
          </div>

          <div className="row">
        <div className="col-sm-4 col-md-3 offset-md-1">
          <label className="col-form-label" htmlFor="fecha_fabricacion">
            Fecha de Fabricación<span className="text-danger">*</span>:
          </label>
        </div>
        <div className="col-sm-8 col-md-6">
          <input
            type="date"
            {...register("fecha_fabricacion", {
              required: { value: true, message: "Fecha de fabricación es requerida" },
            })}
            className={
              "form-control " + (errors?.fecha_fabricacion ? "is-invalid" : "")
            }
          />
          {errors?.fecha_fabricacion && touchedFields.fecha_fabricacion && (
            <div className="invalid-feedback">
              {errors?.fecha_fabricacion?.message}
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
