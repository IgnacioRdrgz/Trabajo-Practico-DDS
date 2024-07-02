// pilotos.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los pilotos filtrados por nombre
router.get("/api/pilotos", async (req, res) => {
  try {
    const { nombre } = req.query;

    let whereClause = {};
    if (nombre) {
      whereClause.nombre = {
        [Op.like]: `%${nombre}%` // Búsqueda por nombre que contenga el texto proporcionado
      };
    }

    const pilotos = await db.Piloto.findAll({
      attributes: ["id", "nombre", "licencia", "fecha_contratacion"],
      where: whereClause
    });

    res.json(pilotos);
  } catch (error) {
    console.error("Error al obtener los pilotos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un piloto por su ID
router.get("/api/pilotos/:id", async (req, res) => {
  try {
    const piloto = await db.Piloto.findOne({
      attributes: ["id", "nombre", "licencia", "fecha_contratacion"],
      where: { id: req.params.id },
    });
    if (!piloto) {
      return res.status(404).json({ message: "Piloto no encontrado" });
    }
    res.json(piloto);
  } catch (error) {
    console.error("Error al obtener el piloto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar un nuevo piloto
router.post("/api/pilotos", async (req, res) => {
  try {
    const nuevoPiloto = await db.Piloto.create({
      nombre: req.body.nombre,
      licencia: req.body.licencia,
      fecha_contratacion: req.body.fecha_contratacion,
    });
    res.status(200).json(nuevoPiloto);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar un nuevo piloto:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar un piloto por su ID
router.put("/api/pilotos/:id", async (req, res) => {
  try {
    const piloto = await db.Piloto.findOne({
      where: { id: req.params.id },
    });
    if (!piloto) {
      return res.status(404).json({ message: "Piloto no encontrado" });
    }
    piloto.nombre = req.body.nombre;
    piloto.licencia = req.body.licencia;
    piloto.fecha_contratacion = req.body.fecha_contratacion;
    await piloto.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar el piloto:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar un piloto por su ID
router.delete("/api/pilotos/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Piloto.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar el piloto:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
