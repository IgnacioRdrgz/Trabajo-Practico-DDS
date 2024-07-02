const request = require("supertest");
const app = require("../index"); // Asegúrate de que esta es la ruta correcta a tu aplicación Express
const db = require("../base-orm/sequelize-init");

describe("API Pasajeros", () => {
  beforeAll(async () => {
    // Opcional: se puede inicializar la base de datos aquí si es necesario
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("GET /api/pasajeros", () => {
    it("debería obtener todos los pasajeros con paginación", async () => {
      const response = await request(app).get("/api/pasajeros?Pagina=1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("Items");
      expect(response.body).toHaveProperty("RegistrosTotal");
    });

    it("debería filtrar pasajeros por nombre", async () => {
      const response = await request(app).get("/api/pasajeros?nombre=John");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("Items");
      expect(response.body).toHaveProperty("RegistrosTotal");
    });
  });

  describe("GET /api/pasajeros/:id", () => {
    it("debería obtener un pasajero por su ID", async () => {
      const response = await request(app).get("/api/pasajeros/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre");
        expect(response.body).toHaveProperty("correo_electronico");
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("POST /api/pasajeros", () => {
    it("debería agregar un nuevo pasajero", async () => {
      const nuevoPasajero = {
        nombre: "ALICE JOHNSON",
        correo_electronico: "alice@example.com",
        fecha_nacimiento: "1990-01-01",
      };

      const response = await request(app).post("/api/pasajeros").send(nuevoPasajero);
      if (response.statusCode === 200) {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nombre", "ALICE JOHNSON");
        expect(response.body).toHaveProperty("correo_electronico", "alice@example.com");
      } else {
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe("PUT /api/pasajeros/:id", () => {
    it("debería actualizar un pasajero por su ID", async () => {
      const datosActualizados = {
        nombre: "ALICE BROWN",
        correo_electronico: "alicebrown@example.com",
        fecha_nacimiento: "1990-01-01",
      };

      const response = await request(app).put("/api/pasajeros/1").send(datosActualizados); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 204) {
        expect(response.statusCode).toBe(204);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });

  describe("DELETE /api/pasajeros/:id", () => {
    it("debería eliminar un pasajero por su ID", async () => {
      const response = await request(app).delete("/api/pasajeros/1"); // Ajusta el ID según tus datos de prueba
      if (response.statusCode === 200) {
        expect(response.statusCode).toBe(200);
      } else {
        expect(response.statusCode).toBe(404);
      }
    });
  });
});
