const request = require("supertest");
const app = require("../index");  // Asegúrate de que este archivo exporte tu instancia de express
const { Reserva } = require("../base-orm/sequelize-init");

const nuevaReserva = {
  clase: "Economy",
  vuelo_id: 1,
  pasajero_id: 1,
  fecha_reserva: new Date().toISOString(),
};

const reservaModificacion = {
  clase: "Business",
  vuelo_id: 2,
  pasajero_id: 2,
  fecha_reserva: new Date().toISOString(),
};

// test route/reservas GET
describe("GET /api/reservas", () => {
  it("Debería devolver todas las reservas", async () => {
    const res = await request(app).get("/api/reservas");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            clase: expect.any(String),
            vuelo_id: expect.any(Number),
            pasajero_id: expect.any(Number),
            fecha_reserva: expect.any(String),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/reservas GET with filters
describe("GET /api/reservas con filtros", () => {
  it("Debería devolver las reservas según el filtro", async () => {
    const res = await request(app).get("/api/reservas?clase=Economy");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);

    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].clase.includes("Economy")) {
          return false;
        }
      }
      return true;
    }
  });
});

// test route/reservas/:id GET
describe("GET /api/reservas/:id", () => {
  it("Debería devolver la reserva con el id 1", async () => {
    const res = await request(app).get("/api/reservas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        clase: expect.any(String),
        vuelo_id: expect.any(Number),
        pasajero_id: expect.any(Number),
        fecha_reserva: expect.any(String),
      })
    );
  });
});

// test route/reservas POST
describe("POST /api/reservas", () => {
  it("Debería devolver la reserva que acabo de crear", async () => {
    const res = await request(app).post("/api/reservas").send(nuevaReserva);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        clase: expect.any(String),
        vuelo_id: expect.any(Number),
        pasajero_id: expect.any(Number),
        fecha_reserva: expect.any(String),
      })
    );
  });
});

// test route/reservas/:id PUT
describe("PUT /api/reservas/:id", () => {
  it("Debería devolver la reserva con el id 1 modificada", async () => {
    const res = await request(app)
      .put("/api/reservas/1")
      .send(reservaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/reservas/:id DELETE
describe("DELETE /api/reservas/:id", () => {
  it("Debería devolver el estado 200 para la reserva con el id 1 borrada", async () => {
    const res = await request(app).delete("/api/reservas/1");
    expect(res.statusCode).toEqual(200);
  });
});