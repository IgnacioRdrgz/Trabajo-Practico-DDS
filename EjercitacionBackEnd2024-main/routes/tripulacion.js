// tripulacion.js

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener toda la tripulación con paginación y/o filtro por rol
router.get("/api/tripulacion", async (req, res) => {
  try {
    const Pagina = req.query.Pagina ? parseInt(req.query.Pagina, 10) : 1;
    const TamañoPagina = 10;

    // Construye la consulta para obtener la tripulación de forma paginada
    const whereClause = {};
    if (req.query.nombre) {
      whereClause.nombre = { [Op.like]: `%${req.query.nombre}%` };
    }

    const { count, rows } = await db.Tripulacion.findAndCountAll({
      attributes: ["id", "nombre", "rol", "fecha_contratacion"],
      where: whereClause, // Aplica el filtro por rol si se proporciona
      order: [["nombre", "ASC"]],
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    // Envía la respuesta con los datos paginados y el total de registros
    res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener la tripulación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un miembro de la tripulación por su ID
router.get("/api/tripulacion/:id", async (req, res) => {
  try {
    const miembroTripulacion = await db.Tripulacion.findOne({
      attributes: ["id", "nombre", "rol", "fecha_contratacion"],
      where: { id: req.params.id },
    });
    if (!miembroTripulacion) {
      return res.status(404).json({ message: "Miembro de tripulación no encontrado" });
    }
    res.json(miembroTripulacion);
  } catch (error) {
    console.error("Error al obtener el miembro de tripulación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar un nuevo miembro de tripulación
router.post("/api/tripulacion", async (req, res) => {
  try {
    const nuevoMiembro = await db.Tripulacion.create({
      nombre: req.body.nombre,
      rol: req.body.rol,
      fecha_contratacion: req.body.fecha_contratacion,
    });
    res.status(200).json(nuevoMiembro);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar un nuevo miembro de tripulación:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar un miembro de tripulación por su ID
router.put("/api/tripulacion/:id", async (req, res) => {
  try {
    const miembroTripulacion = await db.Tripulacion.findOne({
      where: { id: req.params.id },
    });
    if (!miembroTripulacion) {
      return res.status(404).json({ message: "Miembro de tripulación no encontrado" });
    }
    miembroTripulacion.nombre = req.body.nombre;
    miembroTripulacion.rol = req.body.rol;
    miembroTripulacion.fecha_contratacion = req.body.fecha_contratacion;
    await miembroTripulacion.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar el miembro de tripulación:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar un miembro de tripulación por su ID
router.delete("/api/tripulacion/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Tripulacion.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar el miembro de tripulación:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;