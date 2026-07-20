const mongoose = require('mongoose');

const TIPOS = ['cooperativo', 'estrategico', 'rapido', 'grupos_grandes'];

const juegoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    imagenUrl: { type: String, default: '' },
    edadMinima: { type: Number, required: true, min: 0 },
    duracionMinutos: { type: Number, required: true, min: 1 },
    jugadoresMin: { type: Number, required: true, min: 1 },
    jugadoresMax: { type: Number, required: true, min: 1 },
    tipos: {
      type: [{ type: String, enum: TIPOS }],
      default: [],
    },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

juegoSchema.index({ nombre: 'text', descripcion: 'text' });

module.exports = mongoose.model('Juego', juegoSchema);
module.exports.TIPOS = TIPOS;
