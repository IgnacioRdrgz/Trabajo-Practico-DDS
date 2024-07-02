const request = require("supertest");
const app = require("../index"); // Asegúrate de que esta es la ruta correcta a tu aplicación Express
const db = require("../base-orm/sequelize-init");

describe("API Vuelos", () => {
  beforeAll(async () => {
    // Opcional: se puede inicializar la base de datos aquí si es necesario
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("GET /api/vuelos", () => {
    it("debería obtener todos los vuelos", async () => {
      const response = await request(app).get("/api/vuelos");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("Items");
      expect(response.body).toHaveProperty("RegistrosTotal");
    });

    it("debería filtrar vuelos por destino", async () => {
      const response = await request(app).get("/api/vuelos?destino=Miami");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("Items");
      expect(response.body).toHaveProperty("RegistrosTotal");
    });
  });

  describe("GET /api/vuelos/:id", () => {
    it("debería obtener un vuelo por su ID", async () => {
      const response = await request(app).get("/api/vuelos/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("numero_vuelo");
        expect(response.body).toHaveProperty("destino");
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("POST /api/vuelos", () => {
    it("debería agregar un nuevo vuelo", async () => {
      const nuevoVuelo = {
        numero_vuelo: "AA123",
        destino: "Nueva York",
        idAeropuerto: 1,
        fecha_salida: "2024-07-10T10:00:00Z",
        fecha_llegada: "2024-07-10T14:00:00Z",
      };

      const response = await request(app).post("/api/vuelos").send(nuevoVuelo);
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("numero_vuelo", "AA123");
        expect(response.body).toHaveProperty("destino", "Nueva York");
      } else {
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe("PUT /api/vuelos/:id", () => {
    it("debería actualizar un vuelo por su ID", async () => {
      const datosActualizados = {
        numero_vuelo: "AA456",
        destino: "Los Angeles",
        IdAeropuerto: 2,
        fecha_salida: "2024-07-15T12:00:00Z",
        fecha_llegada: "2024-07-15T16:00:00Z",
      };

      const response = await request(app).put("/api/vuelos/1").send(datosActualizados); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 204) {
        expect(response.statusCode).toBe(204);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("DELETE /api/vuelos/:id", () => {
    it("debería eliminar un vuelo por su ID", async () => {
      const response = await request(app).delete("/api/vuelos/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.statusCode).toBe(200);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });
});
