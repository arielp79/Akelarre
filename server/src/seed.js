const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { connectDB } = require('./config/db');
const Juego = require('./models/Juego');
const Servicio = require('./models/Servicio');
const { juegos, servicios } = require('./seedData');

async function seed() {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Juego.deleteMany({});
    await Servicio.deleteMany({});
    await Juego.insertMany(juegos.map((j) => ({ ...j, activo: true })));
    await Servicio.insertMany(servicios);
    console.log(`Seed OK: ${juegos.length} juegos y ${servicios.length} servicios`);
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error.message);
    process.exit(1);
  }
}

seed();
