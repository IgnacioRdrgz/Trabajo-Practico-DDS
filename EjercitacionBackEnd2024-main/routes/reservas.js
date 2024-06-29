const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todas las reservas
router.get("/api/reservas", async (req, res) => {
  const { id, pagina = 1 } = req.query;
  const opciones = {
    attributes: ["id", "vuelo_id", "pasajero_id", "fecha_reserva"],
    limit: 10,
    offset: (pagina - 1) * 10,
  };

  if (id) {
    opciones.where = {
      id: { [Op.eq]: id },
    };
  }

  try {
    const reservas = await db.Reserva.findAll(opciones);
    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// GET: Obtener una reserva por su ID
router.get("/api/reservas/:id", async (req, res) => {
  try {
    const reserva = await db.Reserva.findOne({
      attributes: ["id", "vuelo_id", "pasajero_id", "fecha_reserva"],
      where: { id: req.params.id },
    });
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// POST: Agregar una nueva reserva
router.post("/api/reservas", async (req, res) => {
  try {
    const nuevaReserva = await db.Reserva.create({
      vuelo_id: req.body.vuelo_id,
      pasajero_id: req.body.pasajero_id,
      fecha_reserva: req.body.fecha_reserva,
    });
    res.status(200).json(nuevaReserva);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al agregar una nueva reserva:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// PUT: Actualizar una reserva por su ID
router.put("/api/reservas/:id", async (req, res) => {
  try {
    const reserva = await db.Reserva.findOne({
      where: { id: req.params.id },
    });
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    reserva.vuelo_id = req.body.vuelo_id;
    reserva.pasajero_id = req.body.pasajero_id;
    reserva.fecha_reserva = req.body.fecha_reserva;
    await reserva.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      console.error("Error al actualizar la reserva:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// DELETE: Eliminar una reserva por su ID
router.delete("/api/reservas/:id", async (req, res) => {
  try {
    const filasBorradas = await db.Reserva.destroy({
      where: { id: req.params.id },
    });
    if (filasBorradas == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error al eliminar la reserva:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
