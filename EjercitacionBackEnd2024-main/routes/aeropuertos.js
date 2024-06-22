const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los aeropuertos
router.get("/api/aeropuertos", async (req, res) => {
  try {
    const aeropuertos = await db.Aeropuerto.findAll({
      attributes: ["id", "nombre", "ciudad", "pais"],
    });
    res.json(aeropuertos);
  } catch (error) {
    console.error("Error al obtener los aeropuertos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un aeropuerto por su ID
router.get("/api/aeropuertos/:id", async (req, res) => {
  try {
    const aeropuerto = await db.Aeropuerto.findOne({
      attributes: ["id", "nombre", "ciudad", "pais"],
      where: { id: req.params.id },
    });
    if (!aeropuerto) {
      return res.status(404).json({ message: "Aeropuerto no encontrado" });
    }
    res.json(aeropuerto);
  } catch (error) {
    console.error("Error al obtener el aeropuerto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar un nuevo aeropuerto
router.post("/api/aeropuertos", async (req, res) => {
  try {
    const nuevoAeropuerto = await db.Aeropuerto.create({
      nombre: req.body.nombre,
      ciudad: req.body.ciudad,
      pais: req.body.pais,
    });
    res.status(200).json(nuevoAeropuerto);
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

// PUT: Actualizar un aeropuerto por su ID
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

// DELETE: Eliminar un aeropuerto por su ID
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
