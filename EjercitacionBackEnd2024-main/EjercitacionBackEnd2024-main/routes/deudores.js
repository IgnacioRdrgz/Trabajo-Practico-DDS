const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos los deudores
router.get('/api/deudores', async (req, res) => {
  try {
    const { count, rows } = await db.deudores.findAndCountAll({
        attributes: [
          "IdDeudor",
          "ApellidoYNombre",
          "FechaDeuda",
          "ImporteAdeudado"
        ],
        order: [["ApellidoYNombre", "ASC"]],
      });
    
      return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los deudores' });
  }
});

// Crear un nuevo deudor
router.post('/api/deudores', async (req, res) => {
  try {
    const nuevoDeudor = await db.deudores.create(
      {
        ApellidoYNombre: req.body.ApellidoYNombre,
        FechaDeuda: req.body.FechaDeuda,
        ImporteAdeudado: req.body.ImporteAdeudado
      });
    res.status(200).json(nuevoDeudor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un deudores por su Id
router.get('/api/deudores/:id', async (req, res) => {
  try {
    const deudor = await db.deudores.findByPk(req.params.id);
    if (deudor) {
      res.json(deudor);
    } else {
      res.status(404).json({ error: 'deudores no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el deudores' });
  }
});

// Actualizar un deudor existente
router.put('/api/deudores/:id', async (req, res) => {
  try {
    const [numFilasActualizadas, deudorActualizado] = await db.deudores.update(req.body, {
      where: { IdDeudor: req.params.id },
      returning: true,
    });
    if (deudorActualizado === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'deudores no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;