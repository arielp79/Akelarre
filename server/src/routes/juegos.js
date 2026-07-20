const express = require('express');
const Juego = require('../models/Juego');

const router = express.Router();

function buildFilter(query) {
  const filter = { activo: true };

  if (query.edad) {
    const edad = Number(query.edad);
    if (!Number.isNaN(edad)) {
      filter.edadMinima = { $lte: edad };
    }
  }

  if (query.duracion) {
    const duracion = Number(query.duracion);
    if (!Number.isNaN(duracion)) {
      filter.duracionMinutos = { $lte: duracion };
    }
  }

  if (query.jugadores) {
    const jugadores = Number(query.jugadores);
    if (!Number.isNaN(jugadores)) {
      filter.jugadoresMin = { $lte: jugadores };
      filter.jugadoresMax = { $gte: jugadores };
    }
  }

  if (query.tipo) {
    filter.tipos = query.tipo;
  }

  if (query.q) {
    filter.$or = [
      { nombre: { $regex: query.q, $options: 'i' } },
      { descripcion: { $regex: query.q, $options: 'i' } },
    ];
  }

  return filter;
}

router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find(buildFilter(req.query)).sort({ nombre: 1 });
    res.json(juegos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el catálogo de juegos' });
  }
});

router.get('/random', async (req, res) => {
  try {
    const filter = { activo: true };

    if (req.query.jugadores) {
      const jugadores = Number(req.query.jugadores);
      if (!Number.isNaN(jugadores)) {
        filter.jugadoresMin = { $lte: jugadores };
        filter.jugadoresMax = { $gte: jugadores };
      }
    }

    const [juego] = await Juego.aggregate([{ $match: filter }, { $sample: { size: 1 } }]);

    if (!juego) {
      return res.status(404).json({
        message: 'No hay juegos compatibles. Probá ajustar la cantidad de jugadores.',
      });
    }

    res.json(juego);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al elegir un juego al azar' });
  }
});

module.exports = router;
