const express = require('express');
const Contacto = require('../models/Contacto');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, telefono, tipoEvento, cantidadAsistentes, fecha, email, mensaje } =
      req.body;

    const errores = [];

    if (!nombre || !String(nombre).trim()) errores.push('El nombre es obligatorio');
    if (!telefono || !String(telefono).trim()) errores.push('El teléfono es obligatorio');
    if (!tipoEvento || !String(tipoEvento).trim()) {
      errores.push('El tipo de evento es obligatorio');
    }

    const asistentes = Number(cantidadAsistentes);
    if (!cantidadAsistentes || Number.isNaN(asistentes) || asistentes < 1) {
      errores.push('La cantidad de asistentes debe ser un número mayor a 0');
    }

    const fechaParsed = fecha ? new Date(fecha) : null;
    if (!fecha || !fechaParsed || Number.isNaN(fechaParsed.getTime())) {
      errores.push('La fecha es obligatoria y debe ser válida');
    }

    if (errores.length) {
      return res.status(400).json({ message: 'Datos inválidos', errores });
    }

    const contacto = await Contacto.create({
      nombre: String(nombre).trim(),
      telefono: String(telefono).trim(),
      tipoEvento: String(tipoEvento).trim(),
      cantidadAsistentes: asistentes,
      fecha: fechaParsed,
      email: email ? String(email).trim() : '',
      mensaje: mensaje ? String(mensaje).trim() : '',
    });

    res.status(201).json({
      message: 'Solicitud recibida. ¡Pronto nos pondremos en contacto!',
      contacto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar la solicitud de contacto' });
  }
});

module.exports = router;
