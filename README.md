# Akelarre: Juegos en Movimiento

Sitio institucional MERN según el [PRD](./PRD_Akelarre_Juegos_en_Movimiento.md). Mockup de referencia: [mockup.png](./mockup.png).

## Requisitos

- Node.js 20+
- MongoDB local o [MongoDB Atlas](https://www.mongodb.com/atlas)

## Setup

```bash
# Dependencias (si aún no están)
npm install
npm install --prefix server
npm install --prefix client

# Configurar entorno del API
copy server\.env.example server\.env
# Editar MONGODB_URI si usás Atlas

# Cargar catálogo de ejemplo
npm run seed

# Levantar API (puerto 4000) + frontend (puerto 5173)
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

## Estructura

```
client/   React + Vite + Tailwind
server/   Express + Mongoose
```
