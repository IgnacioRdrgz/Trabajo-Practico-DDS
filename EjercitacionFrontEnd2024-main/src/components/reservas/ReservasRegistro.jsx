import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ReservasRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
  pasajeros,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ defaultValues: Item });

  useEffect(() => {
    if (Item) {
      setValue("clase_id", Item.clase_id);
      setValue("vuelo_id", Item.vuelo_id);
      setValue("pasajero_id", Item.pasajero_id);
      setValue("fecha_reserva", Item.fecha_reserva);
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
              <label className="col-form-label" htmlFor="vuelo_id">
                Vuelo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("vuelo_id", {
                  required: { value: true, message: "Vuelo es requerido" },
                  min: {
                    value: 1,
                    message: "Vuelo debe ser mayor a 0",
                  },
                })}
                className={
                  "form-control " + (errors?.vuelo_id ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.vuelo_id?.message}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="pasajero_id">
                Pasajeros<span className="text-danger"></span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("pasajero_id", {
                  required: { value: true, message: "Pasajeros es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.pasajero_id ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Array.isArray(pasajeros.Items) &&
                  pasajeros.Items.map((pasajero) => (
                    <option key={pasajero.id} value={pasajero.nombre}>
                      {pasajero.nombre}
                    </option>
                  ))}
              </select>

            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="clase">
                clase<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("clase", {
                  required: { value: true, message: "Pasajero es requerido" },
                  minLength: {
                    value: 1,
                    message: "clase debe tener al menos 1 caracter",
                  },
                
                })}
                className={
                  "form-control " + (errors?.clase ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.clase?.message}
              </div>
            </div>
          </div>





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
                  required: { value: true, message: "Fecha de reserva es requerida" },
                })}
                className={
                  "form-control " + (errors?.fecha_reserva ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fecha_reserva?.message}
              </div>
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
