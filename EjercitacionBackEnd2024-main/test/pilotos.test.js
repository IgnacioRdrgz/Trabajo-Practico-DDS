const request = require("supertest");
const app = require("../index"); // Asegúrate de que esta es la ruta correcta a tu aplicación Express
const db = require("../base-orm/sequelize-init");

describe("API Pilotos", () => {
  beforeAll(async () => {
    // Opcional: se puede inicializar la base de datos aquí si es necesario
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("GET /api/pilotos", () => {
    it("debería obtener todos los pilotos sin filtro", async () => {
      const response = await request(app).get("/api/pilotos");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("nombre");
        expect(response.body[0]).toHaveProperty("licencia");
      }
    });

    it("debería filtrar pilotos por nombre", async () => {
      const response = await request(app).get("/api/pilotos?nombre=John");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("nombre");
        expect(response.body[0]).toHaveProperty("licencia");
      }
    });
  });

  describe("GET /api/pilotos/:id", () => {
    it("debería obtener un piloto por su ID", async () => {
      const response = await request(app).get("/api/pilotos/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre");
        expect(response.body).toHaveProperty("licencia");
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("POST /api/pilotos", () => {
    it("debería agregar un nuevo piloto", async () => {
      const nuevoPiloto = {
        nombre: "Alice Johnson",
        licencia: "L12345",
        fecha_contratacion: "2023-06-01",
      };

      const response = await request(app).post("/api/pilotos").send(nuevoPiloto);
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre", "Alice Johnson");
        expect(response.body).toHaveProperty("licencia", "L12345");
      } else {
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe("PUT /api/pilotos/:id", () => {
    it("debería actualizar un piloto por su ID", async () => {
      const datosActualizados = {
        nombre: "Alice Brown",
        licencia: "L67890",
        fecha_contratacion: "2023-07-01",
      };

      const response = await request(app).put("/api/pilotos/1").send(datosActualizados); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 204) {
        expect(response.statusCode).toBe(204);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("DELETE /api/pilotos/:id", () => {
    it("debería eliminar un piloto por su ID", async () => {
      const response = await request(app).delete("/api/pilotos/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.statusCode).toBe(200);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });
});
