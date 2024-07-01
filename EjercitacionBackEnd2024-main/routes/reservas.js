const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op } = require("sequelize");

// GET: Obtener todas las reservas
router.get("/api/reservas", async (req, res) => {
  const { id, pagina = 1 } = req.query;
  const opciones = {
    attributes: ["id", "vuelo_id", "pasajero_id", "fecha_reserva"],
    limit: 20,
    offset: (pagina - 1) * 20,
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

module.exports = router;
