const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    tipoEvento: { type: String, required: true, trim: true },
    cantidadAsistentes: { type: Number, required: true, min: 1 },
    fecha: { type: Date, required: true },
    email: { type: String, trim: true, default: '' },
    mensaje: { type: String, trim: true, default: '' },
  },
  {
    timestamps: { createdAt: 'creadoEn', updatedAt: false },
  }
);

module.exports = mongoose.model('Contacto', contactoSchema);
