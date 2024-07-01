// pasajeros.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los pasajeros con paginación y/o filtro por nombre
router.get("/api/pasajeros", async (req, res) => {
  try {
    const Pagina = req.query.Pagina ? parseInt(req.query.Pagina, 10) : 1;
    const TamañoPagina = 10;

    // Construye la consulta para obtener los pasajeros de forma paginada
    const whereClause = {};
    if (req.query.nombre) {
      whereClause.nombre = { [Op.like]: `%${req.query.nombre}%` };
    }

    const { count, rows } = await db.Pasajero.findAndCountAll({
      attributes: ["id", "nombre", "correo_electronico", "fecha_nacimiento"],
      where: whereClause, // Aplica el filtro por nombre si se proporciona
      order: [["nombre", "ASC"]],
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    // Envía la respuesta con los datos paginados y el total de registros
    res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener los pasajeros:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un pasajero por su ID
router.get("/api/pasajeros/:id", async (req, res) => {
  try {
    const pasajero = await db.Pasajero.findOne({
      attributes: ["id", "nombre", "correo_electronico", "fecha_nacimiento"],
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
