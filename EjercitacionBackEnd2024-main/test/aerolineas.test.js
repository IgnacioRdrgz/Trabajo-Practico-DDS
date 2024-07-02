const request = require("supertest");
const app = require("../index"); // Ajusta la importación según tu estructura de archivos
const db = require("../base-orm/sequelize-init"); // Asegúrate de importar tu configuración de base de datos

// Datos de ejemplo para las pruebas
const aerolineaAlta = {
  nombre: "Lufthansa",
  pais_origen: "Alemania"
};

const aerolineaModificacion = {
  nombre: "Emirates",
  pais_origen: "Emiratos Árabes Unidos"
};

// Test para GET /api/aerolineas
describe("GET /api/aerolineas", () => {
  it("Debería devolver todas las aerolíneas", async () => {
    const res = await request(app).get("/api/aerolineas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("Items");
    expect(res.body).toHaveProperty("RegistrosTotal");
  });
});

// Test para GET /api/aerolineas/:id
describe("GET /api/aerolineas/:id", () => {
  let aerolineaId;

  beforeAll(async () => {
    // Insertar una aerolínea de prueba antes de las pruebas
    const nuevaAerolinea = await db.Aerolinea.create(aerolineaAlta);
    aerolineaId = nuevaAerolinea.id;
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.Aerolinea.destroy({ where: {}, truncate: true });
  });

  it("Debería devolver una aerolínea por su ID", async () => {
    const res = await request(app).get(`/api/aerolineas/${aerolineaId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: aerolineaId,
        nombre: expect.any(String),
        pais_origen: expect.any(String)
      })
    );
  });

  it("Debería devolver 404 si la aerolínea no existe", async () => {
    const res = await request(app).get("/api/aerolineas/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Aerolínea no encontrada"
      })
    );
  });
});

// Test para POST /api/aerolineas
describe("POST /api/aerolineas", () => {
  it("Debería crear una nueva aerolínea", async () => {
    const res = await request(app).post("/api/aerolineas").send(aerolineaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nombre: aerolineaAlta.nombre,
        pais_origen: aerolineaAlta.pais_origen
      })
    );
  });

  it("Debería devolver un error 400 si falta algún campo requerido", async () => {
    const aerolineaSinNombre = {
      pais_origen: "Francia"
    };

    const res = await request(app).post("/api/aerolineas").send(aerolineaSinNombre);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});

// Test para PUT /api/aerolineas/:id
describe("PUT /api/aerolineas/:id", () => {
  let aerolineaId;

  beforeAll(async () => {
    // Insertar una aerolínea de prueba antes de las pruebas
    const nuevaAerolinea = await db.Aerolinea.create(aerolineaAlta);
    aerolineaId = nuevaAerolinea.id;
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.Aerolinea.destroy({ where: {}, truncate: true });
  });

  it("Debería actualizar una aerolínea por su ID", async () => {
    const res = await request(app).put(`/api/aerolineas/${aerolineaId}`).send(aerolineaModificacion);
    expect(res.statusCode).toEqual(204);
  });

  it("Debería devolver un error 404 si la aerolínea no existe", async () => {
    const res = await request(app).put("/api/aerolineas/999").send(aerolineaModificacion);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Aerolínea no encontrada"
      })
    );
  });
});

// Test para DELETE /api/aerolineas/:id
describe("DELETE /api/aerolineas/:id", () => {
  let aerolineaId;

  beforeAll(async () => {
    // Insertar una aerolínea de prueba antes de las pruebas
    const nuevaAerolinea = await db.Aerolinea.create(aerolineaAlta);
    aerolineaId = nuevaAerolinea.id;
  });

  afterAll(async () => {
    // Limpiar la base de datos después de las pruebas
    await db.Aerolinea.destroy({ where: {}, truncate: true });
  });

  it("Debería eliminar una aerolínea por su ID", async () => {
    const res = await request(app).delete(`/api/aerolineas/${aerolineaId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("Debería devolver 404 si la aerolínea no existe al intentar eliminar", async () => {
    const res = await request(app).delete("/api/aerolineas/999"); // ID que no existe en la base de datos
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
      message: "Aerolínea no encontrada"
    });
  });
});