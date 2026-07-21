const Juego = require('./models/Juego');
const Servicio = require('./models/Servicio');
const { juegos, servicios } = require('./seedData');

/**
 * Si la DB está vacía (típico en Atlas + Render free sin Shell),
 * carga el catálogo de ejemplo una sola vez.
 */
async function ensureSeed() {
  const [juegosCount, serviciosCount] = await Promise.all([
    Juego.countDocuments(),
    Servicio.countDocuments(),
  ]);

  if (juegosCount > 0 && serviciosCount > 0) {
    console.log(`DB OK: ${juegosCount} juegos, ${serviciosCount} servicios`);
    return { seeded: false, juegosCount, serviciosCount };
  }

  if (juegosCount === 0) {
    await Juego.insertMany(juegos.map((j) => ({ ...j, activo: true })));
  }
  if (serviciosCount === 0) {
    await Servicio.insertMany(servicios);
  }

  const nextJuegos = await Juego.countDocuments();
  const nextServicios = await Servicio.countDocuments();
  console.log(`Auto-seed OK: ${nextJuegos} juegos, ${nextServicios} servicios`);
  return { seeded: true, juegosCount: nextJuegos, serviciosCount: nextServicios };
}

module.exports = { ensureSeed };
