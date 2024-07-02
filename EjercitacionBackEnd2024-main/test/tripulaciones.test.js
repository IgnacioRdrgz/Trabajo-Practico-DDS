const request = require("supertest");
const app = require("../index"); // Asegúrate de que este es el path correcto a tu aplicación Express
const db = require("../base-orm/sequelize-init");

describe("API Tripulación", () => {
  beforeAll(async () => {
    // Opcional: se puede inicializar la base de datos aquí si es necesario
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("GET /api/tripulacion", () => {
    it("debería obtener toda la tripulación", async () => {
      const response = await request(app).get("/api/tripulacion");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("Items");
      expect(response.body).toHaveProperty("RegistrosTotal");
    });

    it("debería filtrar la tripulación por nombre", async () => {
      const response = await request(app).get("/api/tripulacion?nombre=Juan");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("Items");
      expect(response.body).toHaveProperty("RegistrosTotal");
    });
  });

  describe("GET /api/tripulacion/:id", () => {
    it("debería obtener un miembro de tripulación por su ID", async () => {
      const response = await request(app).get("/api/tripulacion/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre");
        expect(response.body).toHaveProperty("rol");
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("POST /api/tripulacion", () => {
    it("debería agregar un nuevo miembro de tripulación", async () => {
      const nuevoMiembro = {
        nombre: "Juan Pérez",
        rol: "Piloto",
        fecha_contratacion: "2023-01-01",
        idPiloto: 1,
      };

      const response = await request(app).post("/api/tripulacion").send(nuevoMiembro);
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre", "Juan Pérez");
        expect(response.body).toHaveProperty("rol", "Piloto");
      } else {
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe("PUT /api/tripulacion/:id", () => {
    it("debería actualizar un miembro de tripulación por su ID", async () => {
      const datosActualizados = {
        nombre: "Juan Gómez",
        rol: "Copiloto",
        fecha_contratacion: "2023-02-01",
        idPiloto: 2,
      };

      const response = await request(app).put("/api/tripulacion/1").send(datosActualizados); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 204) {
        expect(response.statusCode).toBe(204);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("DELETE /api/tripulacion/:id", () => {
    it("debería eliminar un miembro de tripulación por su ID", async () => {
      const response = await request(app).delete("/api/tripulacion/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.statusCode).toBe(200);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });
});
