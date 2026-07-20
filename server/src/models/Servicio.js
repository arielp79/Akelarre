const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ['noches-de-juegos', 'eventos', 'instalaciones-ludicas'],
    },
    descripcion: { type: String, required: true, trim: true },
    imagenUrl: { type: String, default: '' },
    orden: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Servicio', servicioSchema);
