// pasajeros.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los pasajeros
router.get("/api/pasajeros", async (req, res) => {
  try {
    const pasajeros = await db.Pasajero.findAll({
      attributes: ["id", "nombre", "correo_electronico", "fecha_nacimiento","Activo"],
    });
    res.json(pasajeros);
  } catch (error) {
    console.error("Error al obtener los pasajeros:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un pasajero por su ID
router.get("/api/pasajeros/:id", async (req, res) => {
  try {
    const pasajero = await db.Pasajero.findOne({
      attributes: ["id", "nombre", "correo_electronico", "fecha_nacimiento", "Activo"],
      where: { id: req.params.id },
    });
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado" });
    }
    res.json(pasajero);
  } catch (error) {
    console.error("Error al obtener el pasajero:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar un nuevo pasajero
router.post("/api/pasajeros", async (req, res) => {
  try {
    const nuevoPasajero = await db.Pasajero.create({
      nombre: req.body.nombre,
      correo_electronico: req.body.correo_electronico,
      fecha_nacimiento: req.body.fecha_nacimiento,
      Activo: req.body.Activo,
    });
    res.status(200).json(nuevoPasajero);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar un nuevo pasajero:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar un pasajero por su ID
router.put("/api/pasajeros/:id", async (req, res) => {
  try {
    const pasajero = await db.Pasajero.findOne({
      where: { id: req.params.id },
    });
    if (!pasajero) {
      return res.status(404).json({ message: "Pasajero no encontrado" });
    }
    pasajero.nombre = req.body.nombre;
    pasajero.correo_electronico = req.body.correo_electronico;
    pasajero.fecha_nacimiento = req.body.fecha_nacimiento;
    pasajero.Activo = req.body.Activo;
    await pasajero.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar el pasajero:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar un pasajero por su ID
router.delete("/api/pasajeros/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Pasajero.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar el pasajero:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
