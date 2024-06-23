const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todas las aerolíneas con paginación y/o filtro por país de origen
router.get("/api/aeropuertos", async (req, res) => {
  try {
    const Pagina = req.query.Pagina ? parseInt(req.query.Pagina, 20) : 1;
    const TamañoPagina = 20;

    // Construye la consulta para obtener las aerolíneas de forma paginada
    const whereClause = {};
    if (req.query.pais) {
      whereClause.pais = { [Op.like]: `%${req.query.pais}%` };
    }

    const { count, rows } = await db.Aeropuerto.findAndCountAll({
      attributes: ["id", "nombre", "ciudad", "pais"],
      where: whereClause, // Aplica el filtro por país de origen si se proporciona
      order: [["nombre", "ASC"]],
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    // Envía la respuesta con los datos paginados y el total de registros
    res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener las aerolíneas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener una aeropuerto por su ID
router.get("/api/aeropuertos/:id", async (req, res) => {
  try {
    const aeropuerto = await db.Aeropuerto.findOne({
      attributes: ["id", "nombre", "ciudad", "pais"],
      where: { id: req.params.id },
    });
    if (!aeropuerto) {
      return res.status(404).json({ message: "Aeropuerto no encontrada" });
    }
    res.json(aeropuerto);
  } catch (error) {
    console.error("Error al obtener la aeropuerto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar una nueva aeropuerto
router.post("/api/aeropuertos", async (req, res) => {
  try {
    const nuevaAerolinea = await db.Aeropuerto.create({
      nombre: req.body.nombre,
      ciudad: req.body.ciudad,
      pais: req.body.pais,
    });
    res.status(200).json(nuevaAerolinea);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar un nuevo aeropuerto:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar una aeropuerto por su ID
router.put("/api/aeropuertos/:id", async (req, res) => {
  try {
    const aeropuerto = await db.Aeropuerto.findOne({
      where: { id: req.params.id },
    });
    if (!aeropuerto) {
      return res.status(404).json({ message: "Aeropuerto no encontrado" });
    }
    aeropuerto.nombre = req.body.nombre;
    aeropuerto.ciudad = req.body.ciudad;
    aeropuerto.pais = req.body.pais;

    await aeropuerto.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar el aeropuerto:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar una aeropuerto por su ID
router.delete("/api/aeropuertos/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Aeropuerto.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar el aeropuerto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
