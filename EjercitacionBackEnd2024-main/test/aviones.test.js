const request = require("supertest");
const app = require("../index"); // Ajusta la importación según tu estructura de archivos
const db = require("../base-orm/sequelize-init"); // Asegúrate de importar tu configuración de base de datos

// Datos de ejemplo para las pruebas
const avionAlta = {
  modelo: "Boeing 747",
  capacidad: 500,
  aerolinea: "Lufthansa",
  fecha_fabricacion: new Date().toISOString()
};

const avionModificacion = {
  modelo: "Airbus A380",
  capacidad: 600,
  aerolinea: "Emirates",
  fecha_fabricacion: new Date().toISOString()
};

// Test para GET /api/aviones
describe("GET /api/aviones", () => {
  it("Debería devolver todos los aviones", async () => {
    const res = await request(app).get("/api/aviones");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("Items");
    expect(res.body).toHaveProperty("RegistrosTotal");
  });
});

// Test para GET /api/aviones/:id
describe("GET /api/aviones/:id", () => {
  let avionId;

  beforeAll(async () => {
    // Insertar un avión de prueba antes de las pruebas
    const nuevoAvion = await db.Avion.create(avionAlta);
    avionId = nuevoAvion.id;
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.Avion.destroy({ where: {}, truncate: true });
  });

  it("Debería devolver un avión por su ID", async () => {
    const res = await request(app).get(`/api/aviones/${avionId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: avionId,
        modelo: expect.any(String),
        capacidad: expect.any(Number),
        aerolinea: expect.any(String),
        fecha_fabricacion: expect.any(String)
      })
    );
  });

  it("Debería devolver 404 si el avión no existe", async () => {
    const res = await request(app).get("/api/aviones/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Avión no encontrado"
      })
    );
  });
});

// Test para POST /api/aviones
describe("POST /api/aviones", () => {
  it("Debería crear un nuevo avión", async () => {
    const res = await request(app).post("/api/aviones").send(avionAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        modelo: avionAlta.modelo,
        capacidad: avionAlta.capacidad,
        aerolinea: avionAlta.aerolinea,
        fecha_fabricacion: expect.any(String)
      })
    );
  });

  it("Debería devolver un error 400 si falta algún campo requerido", async () => {
    const avionSinModelo = {
      capacidad: 250,
      aerolinea: "American Airlines",
      fecha_fabricacion: new Date().toISOString()
    };

    const res = await request(app).post("/api/aviones").send(avionSinModelo);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});

// Test para PUT /api/aviones/:id
describe("PUT /api/aviones/:id", () => {
  let avionId;

  beforeAll(async () => {
    // Insertar un avión de prueba antes de las pruebas
    const nuevoAvion = await db.Avion.create(avionAlta);
    avionId = nuevoAvion.id;
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.Avion.destroy({ where: {}, truncate: true });
  });

  it("Debería actualizar un avión por su ID", async () => {
    const res = await request(app).put(`/api/aviones/${avionId}`).send(avionModificacion);
    expect(res.statusCode).toEqual(204);
  });

  it("Debería devolver un error 404 si el avión no existe", async () => {
    const res = await request(app).put("/api/aviones/999").send(avionModificacion);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Avión no encontrado"
      })
    );
  });
});

// Test para DELETE /api/aviones/:id
describe("DELETE /api/aviones/:id", () => {
  let avionId;

  beforeAll(async () => {
    // Insertar un avión de prueba antes de las pruebas
    const nuevoAvion = await db.Avion.create(avionAlta);
    avionId = nuevoAvion.id;
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.Avion.destroy({ where: {}, truncate: true });
  });

  it("Debería eliminar un avión por su ID", async () => {
    const res = await request(app).delete(`/api/aviones/${avionId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("Debería devolver 404 si el avión no existe al intentar eliminar", async () => {
    const res = await request(app).delete("/api/aviones/999"); // ID que no existe en la base de datos
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
      message: "Avión no encontrado"
    });
  });
});
