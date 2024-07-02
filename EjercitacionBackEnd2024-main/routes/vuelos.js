const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los vuelos con filtros y paginación
router.get("/api/vuelos", async function (req, res, next) {
  try {
    let where = {};
    if (req.query.destino !== undefined && req.query.destino !== "") {
      where.destino = {
        [Op.like]: "%" + req.query.destino + "%",
      };
    }
    
    const { count, rows } = await db.Vuelo.findAndCountAll({
      attributes: ["id", "numero_vuelo", "destino", "idAeropuerto", "fecha_salida", "fecha_llegada"],
      order: [["destino", "ASC"]],
      where,
      
    });
    return res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    console.error("Error al obtener los vuelos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener un vuelo por su ID
router.get("/api/vuelos/:id", async function (req, res, next) {
  try {
    const vuelo = await db.Vuelo.findOne({
      where: { id: req.params.id },
    });
    if (!vuelo) {
      return res.status(404).json({ message: "Vuelo no encontrado" });
    }
    res.json(vuelo);
  } catch (error) {
    console.error("Error al obtener el vuelo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar un nuevo vuelo
router.post("/api/vuelos", async (req, res) => {
  try {
    const nuevoVuelo = await db.Vuelo.create({
      numero_vuelo: req.body.numero_vuelo,
      destino: req.body.destino,
      idAeropuerto: req.body.idAeropuerto,
      fecha_salida: req.body.fecha_salida,
      fecha_llegada: req.body.fecha_llegada,
    });
    res.status(200).json(nuevoVuelo);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar un nuevo vuelo:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar un vuelo por su ID
router.put("/api/vuelos/:id", async (req, res) => {
  try {
    const vuelo = await db.Vuelo.findOne({
      where: { id: req.params.id },
    });
    if (!vuelo) {
      return res.status(404).json({ message: "Vuelo no encontrado" });
    }
    vuelo.numero_vuelo = req.body.numero_vuelo;
    vuelo.destino = req.body.destino;
    vuelo.IdAeropuerto = req.body.IdAeropuerto;
    vuelo.fecha_salida = req.body.fecha_salida;
    vuelo.fecha_llegada = req.body.fecha_llegada;
    await vuelo.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar el vuelo:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar un vuelo por su ID
router.delete("/api/vuelos/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Vuelo.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar el vuelo:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
