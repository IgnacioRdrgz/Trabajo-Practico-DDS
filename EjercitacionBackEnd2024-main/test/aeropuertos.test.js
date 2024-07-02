const request = require("supertest");
const app = require("../index"); // Asegúrate de que esta es la ruta correcta a tu aplicación Express
const db = require("../base-orm/sequelize-init");

describe("API Aeropuertos", () => {
  beforeAll(async () => {
    // Opcional: se puede inicializar la base de datos aquí si es necesario
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("GET /api/aeropuertos", () => {
    it("debería obtener todos los aeropuertos", async () => {
      const response = await request(app).get("/api/aeropuertos");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty("idAeropuerto");
        expect(response.body[0]).toHaveProperty("nombre");
        expect(response.body[0]).toHaveProperty("ciudad");
        expect(response.body[0]).toHaveProperty("pais");
      }
    });
  });

  describe("GET /api/aeropuertos/:id", () => {
    it("debería obtener un aeropuerto por su ID", async () => {
      const response = await request(app).get("/api/aeropuertos/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("idAeropuerto");
        expect(response.body).toHaveProperty("nombre");
        expect(response.body).toHaveProperty("ciudad");
        expect(response.body).toHaveProperty("pais");
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });
});
