// aviones.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los aviones filtrados por modelo
router.get("/api/aviones", async (req, res) => {
  try {
    const { modelo } = req.query;

    let whereClause = {};
    if (modelo) {
      whereClause.modelo = {
        [Op.like]: `%${modelo}%` // Búsqueda por modelo que contenga el texto proporcionado
      };
    }

    const aviones = await db.Avion.findAll({
      attributes: ["id", "modelo", "capacidad", "aerolinea", "fecha_fabricacion"],
      where: whereClause
    });
    
    res.json(aviones);
  } catch (error) {
    console.error("Error al obtener los aviones:", error);
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
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar el avión:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
