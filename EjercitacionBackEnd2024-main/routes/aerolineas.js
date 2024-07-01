// aerolineas.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todas las aerolíneas con paginación y/o filtro por país de origen
router.get("/api/aerolineas", async (req, res) => {
  try {


    // Construye la consulta para obtener las aerolíneas de forma paginada
    const whereClause = {};
    if (req.query.pais_origen) {
      whereClause.pais_origen = { [Op.like]: `%${req.query.pais_origen}%` };
    }

    const { count, rows } = await db.Aerolinea.findAndCountAll({
      attributes: ["id", "nombre", "pais_origen"],
      where: whereClause, // Aplica el filtro por país de origen si se proporciona
      order: [["nombre", "ASC"]],

    });

    // Envía la respuesta con los datos paginados y el total de registros
    res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener las aerolíneas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener una aerolínea por su ID
router.get("/api/aerolineas/:id", async (req, res) => {
  try {
    const aerolinea = await db.Aerolinea.findOne({
      attributes: ["id", "nombre", "pais_origen"],
      where: { id: req.params.id },
    });
    if (!aerolinea) {
      return res.status(404).json({ message: "Aerolínea no encontrada" });
    }
    res.json(aerolinea);
  } catch (error) {
    console.error("Error al obtener la aerolínea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar una nueva aerolínea
router.post("/api/aerolineas", async (req, res) => {
  try {
    const nuevaAerolinea = await db.Aerolinea.create({
      nombre: req.body.nombre,
      pais_origen: req.body.pais_origen,
    });
    res.status(200).json(nuevaAerolinea);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar una nueva aerolínea:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar una aerolínea por su ID
router.put("/api/aerolineas/:id", async (req, res) => {
  try {
    const aerolinea = await db.Aerolinea.findOne({
      where: { id: req.params.id },
    });
    if (!aerolinea) {
      return res.status(404).json({ message: "Aerolínea no encontrada" });
    }
    aerolinea.nombre = req.body.nombre;
    aerolinea.pais_origen = req.body.pais_origen;
    await aerolinea.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar la aerolínea:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar una aerolínea por su ID
router.delete("/api/aerolineas/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Aerolinea.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Aerolínea no encontrada" }); // Devuelve el mensaje JSON cuando no se encuentra el avión
    }
  } catch (err) {
    console.error("Error al eliminar la aerolínea:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
