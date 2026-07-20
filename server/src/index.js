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
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'akelarre-api' });
});

app.use('/api/juegos', juegosRouter);
app.use('/api/servicios', serviciosRouter);
app.use('/api/contacto', contactoRouter);

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`API Akelarre en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

start();
