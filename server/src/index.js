const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const juegosRouter = require('./routes/juegos');
const serviciosRouter = require('./routes/servicios');
const contactoRouter = require('./routes/contacto');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

app.use(
  cors({
    origin(origin, callback) {
      // Permite tools sin Origin (curl, health checks, Render)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
  })
);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'akelarre-api',
    env: process.env.NODE_ENV || 'development',
  });
});

app.use('/api/juegos', juegosRouter);
app.use('/api/servicios', serviciosRouter);
app.use('/api/contacto', contactoRouter);

app.use((err, _req, res, _next) => {
  if (err && String(err.message || '').includes('CORS')) {
    return res.status(403).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`API Akelarre en puerto ${PORT}`);
      console.log(`CORS permitido: ${allowedOrigins.join(', ') || '(ninguno)'}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

start();
