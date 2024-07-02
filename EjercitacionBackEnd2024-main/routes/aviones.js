// aviones.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todas las aerolíneas con paginación y/o filtro por país de origen
router.get("/api/aviones", async (req, res) => {
  try {


    // Construye la consulta para obtener las aerolíneas de forma paginada
    const whereClause = {};
    if (req.query.modelo) {
      whereClause.modelo = { [Op.like]: `%${req.query.modelo}%` };
    }

    const { count, rows } = await db.Avion.findAndCountAll({
      attributes: ["id", "modelo", "capacidad", "aerolinea", "fecha_fabricacion"],
      where: whereClause, // Aplica el filtro por país de origen si se proporciona
      order: [["modelo", "ASC"]],
    });

    // Envía la respuesta con los datos paginados y el total de registros
    res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener las aviones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un avión por su ID
router.get("/api/aviones/:id", async (req, res) => {
  try {
    const avion = await db.Avion.findOne({
      attributes: ["id", "modelo", "capacidad", "aerolinea", "fecha_fabricacion"],
      where: { id: req.params.id },
    });
    if (!avion) {
      return res.status(404).json({ message: "Avión no encontrado" });
    }
    res.json(avion);
  } catch (error) {
    console.error("Error al obtener el avión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar un nuevo avión
router.post("/api/aviones", async (req, res) => {
  try {
    const nuevoAvion = await db.Avion.create({
      modelo: req.body.modelo,
      capacidad: req.body.capacidad,
      aerolinea: req.body.aerolinea,
      fecha_fabricacion: req.body.fecha_fabricacion
    });
    res.status(200).json(nuevoAvion);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar un nuevo avión:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar un avión por su ID
router.put("/api/aviones/:id", async (req, res) => {
  try {
    const avion = await db.Avion.findOne({
      where: { id: req.params.id },
    });
    if (!avion) {
      return res.status(404).json({ message: "Avión no encontrado" });
    }
    avion.modelo = req.body.modelo;
    avion.capacidad = req.body.capacidad;
    avion.aerolinea = req.body.aerolinea;
    avion.fecha_fabricacion = req.body.fecha_fabricacion;
    await avion.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar el avión:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar un avión por su ID
router.delete("/api/aviones/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Avion.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Avión no encontrado" }); // Devuelve el mensaje JSON cuando no se encuentra el avión
    }
  } catch (err) {
    console.error("Error al eliminar el avión:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


module.exports = router;
