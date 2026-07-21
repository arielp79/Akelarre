# Akelarre: Juegos en Movimiento

Sitio institucional MERN según el [PRD](./PRD_Akelarre_Juegos_en_Movimiento.md). Mockup de referencia: [mockup.png](./mockup.png).

## Requisitos

- Node.js 20+
- MongoDB local o [MongoDB Atlas](https://www.mongodb.com/atlas)

## Setup local

```bash
npm install
npm install --prefix server
npm install --prefix client

copy server\.env.example server\.env
# Editar MONGODB_URI si usás Atlas

npm run seed
npm run dev
```

Frontend: http://localhost:5173  
API health: http://localhost:4000/api/health

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | API + cliente en paralelo |
| `npm run seed` | Resetea e inserta juegos/servicios de ejemplo |
| `npm run build` | Build de producción del cliente |

## API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/juegos` | Catálogo (`edad`, `duracion`, `jugadores`, `tipo`, `q`) |
| `GET` | `/api/juegos/random?jugadores=` | Juego al azar |
| `GET` | `/api/servicios` | Servicios |
| `POST` | `/api/contacto` | Solicitud de contratación |

## Deploy: MongoDB Atlas + Render + Netlify

### 1. MongoDB Atlas

1. Creá un cluster (free M0).
2. **Database Access:** usuario con contraseña.
3. **Network Access:** allow `0.0.0.0/0` (o IPs de Render).
4. **Connect → Drivers** y copiá la URI, por ejemplo:
   `mongodb+srv://USER:PASS@cluster.mongodb.net/akelarre?retryWrites=true&w=majority`

### 2. Backend en Render

El repo incluye [`render.yaml`](./render.yaml).

1. En [Render](https://dashboard.render.com) → **New → Blueprint** (o Web Service) apuntando a `https://github.com/arielp79/Akelarre`.
2. Si es Web Service manual:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. Variables de entorno:
   - `MONGODB_URI` = URI de Atlas
   - `CLIENT_URL` = URL de Netlify (ej. `https://tu-sitio.netlify.app`). Podés sumar local: `https://tu-sitio.netlify.app,http://localhost:5173`
   - `NODE_ENV` = `production`
4. Deploy. Probá: `https://TU-SERVICIO.onrender.com/api/health`
5. Sembrar datos: en el plan free de Render no hay Shell.
   La API hace **auto-seed** al arrancar si juegos/servicios están vacíos.
   Tras el primer deploy con esa lógica, reiniciá el servicio (o esperá el redeploy).

### 3. Frontend en Netlify

1. Site settings → **Environment variables**:
   - `VITE_API_URL` = `https://TU-SERVICIO.onrender.com` (sin barra final)
2. Trigger **Clear cache and deploy site** (Vite embebe la URL en el build).

## Estructura

```
client/   React + Vite + Tailwind → Netlify
server/   Express + Mongoose → Render
```
