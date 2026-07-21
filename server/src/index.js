const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { ensureSeed } = require('./ensureSeed');
const juegosRouter = require('./routes/juegos');
const serviciosRouter = require('./routes/servicios');
const contactoRouter = require('./routes/contacto');

const app = express();
const PORT = process.env.PORT || 4000;

function normalizeOrigin(origin) {
  return String(origin || '')
    .trim()
    .replace(/\/+$/, '');
}

const defaultOrigins = [
  'http://localhost:5173',
  'https://akelarre-juegos.netlify.app',
];

const allowedOrigins = [
  ...new Set(
    [...defaultOrigins, ...(process.env.CLIENT_URL || '').split(',')]
      .map(normalizeOrigin)
      .filter(Boolean)
  ),
];

app.set('trust proxy', 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      const normalized = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }
      console.warn(`CORS bloqueado: ${origin}`);
      return callback(null, false);
    },
  })
);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'akelarre-api',
    env: process.env.NODE_ENV || 'development',
    cors: allowedOrigins,
  });
});

app.use('/api/juegos', juegosRouter);
app.use('/api/servicios', serviciosRouter);
app.use('/api/contacto', contactoRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    await ensureSeed();
    app.listen(PORT, () => {
      console.log(`API Akelarre en puerto ${PORT}`);
      console.log(`CORS permitido: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

start();
