const express = require('express');
const Servicio = require('../models/Servicio');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const servicios = await Servicio.find().sort({ orden: 1 });
    res.json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
});

module.exports = router;
