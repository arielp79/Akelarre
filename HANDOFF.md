# Handoff — Akelarre: Juegos en Movimiento

Documento para continuar el trabajo con otro agente o desarrollador.

---

## 1. Qué es el proyecto

Sitio institucional **MERN** (una sola landing) para **Akelarre: Juegos en Movimiento**, según el PRD del repo.

**Estética:** Fredoka/Nunito, fondo cuadriculado, assets dibujados a mano (nubes, botones, esquinas).

**Producción:**

| Recurso | URL |
|---------|-----|
| Repo | https://github.com/arielp79/Akelarre |
| Frontend (Netlify) | https://akelarre-juegos.netlify.app |
| API (Render) | https://akelarre-api.onrender.com |
| Rama principal | `master` (sincronizada con `origin/master`) |

---

## 2. Estructura del monorepo

```
Akelarre/
  client/                 React + Vite + Tailwind
  server/                 Express + Mongoose
  Imagenes Akelarre/      Assets fuente (PNG, PDF, etc.)
  PRD_Akelarre_Juegos_en_Movimiento.md
  mockup.png
  netlify.toml
  render.yaml
  README.md
```

---

## 3. Arranque local

```bash
npm install && npm install --prefix server && npm install --prefix client
copy server\.env.example server\.env
npm run seed      # carga juegos/servicios en MongoDB
npm run dev       # API :4000 + front :5173
```

**Variables de entorno:**

| Archivo | Variables clave |
|---------|-----------------|
| `server/.env` | `PORT=4000`, `MONGODB_URI`, `CLIENT_URL` (puede ser lista separada por comas) |
| `client/.env` | `VITE_API_URL=https://akelarre-api.onrender.com` |
| `netlify.toml` | También define `VITE_API_URL` en build |

---

## 4. Backend (listo y desplegado)

**Modelos:** `Juegos`, `Servicios`, `Contactos`

**Endpoints:**

- `GET /api/juegos` — filtros: `edad`, `duracion`, `jugadores`, `tipo`, `q`
- `GET /api/juegos/random?jugadores=`
- `GET /api/servicios`
- `POST /api/contacto`

**Archivos clave:**

- `server/src/index.js` — CORS, rutas, arranque
- `server/src/seedData.js` — textos oficiales de servicios/juegos
- `server/src/ensureSeed.js` — auto-seed al arrancar si la DB está vacía
- `render.yaml` — deploy en Render

**CORS por defecto:** `http://localhost:5173` y `https://akelarre-juegos.netlify.app` (+ `CLIENT_URL` en env).

---

## 5. Frontend — secciones

`Hero`, `QueEs`, `Servicios`, `Experiencia`, `Requisitos`, `Ludoteca`, `Galeria`, `Contacto`

### Navbar (`client/src/components/Navbar.jsx`)

- Logo PNG grande, posición absoluta (`client/src/assets/logo.png`)
- CTA «Solicitar una Fecha» con imagen `nube3.png`, texto en 2 líneas

### Esquinas (`client/src/components/PageCorners.jsx`)

- Solo **2 esquinas inferiores**: `EsqII.png` (abajo izq), `EsqID.png` (abajo der)
- `mix-blend-screen` para fondo negro del PNG

### Ludoteca (`client/src/sections/Ludoteca.jsx`)

- Consume API; filtros; botón **«¡Sorpréndeme!»** (`GET /api/juegos/random`)
- Badge «¡Más de 80 Juegos!» con `boton3.png`
- Botón Sorpréndeme con `boton2.png`
- **Nota:** al pulsar Sorpréndeme hace `scrollIntoView` hacia la tarjeta (puede sentirse como “subir la página”)

### Servicios (`client/src/sections/Servicios.jsx`) — último trabajo importante

Tres tarjetas con nubes PNG:

| Servicio | PNG |
|----------|-----|
| Noches de Juegos | `nube1.png` |
| Eventos | `nube4.png` |
| Instalaciones Lúdicas | `nube2.png` |

**Estado actual (commit `3d5663c`):**

- Tamaño nube fijo: `h-[39.35925rem] w-[67.473rem]` (sm: `42.17rem × 73.09rem`)
- Posición nube: `left-[calc(50%-20px)] top-[calc(50%-10px)]`
- Texto: `-translate-x-[20px] -translate-y-[5px]`, centrado
- Separación tarjetas: `gap-[47px]` mobile, `gap-[31px]` desktop
- Título separado de nubes: `mb-[90px]`
- Grilla: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3`, `overflow-visible`
- `nube1` tiene `scale-[1.057]` extra por ser más chica en el archivo

**Problemas ya resueltos en esta sección:**

1. Fondo blanco rectangular en PNGs → flood-fill desde bordes (blanco exterior transparente, interior opaco)
2. CORS Netlify vs local
3. Nubes crecían al cargar API → tamaño fijo en `rem`, no `%`
4. Textos locales cortos vs API largos → `FALLBACK` alineado con `seedData.js`

---

## 6. Git — estado actual

**Último commit:** `3d5663c` — *Finalize service clouds sizing, spacing, and title separation.*

**Cambios sin commitear:**

```
M .gitignore
M README.md
M package.json
M render.yaml
?? Imagenes Akelarre/boton.png
?? Imagenes Akelarre/botonblanco.png
?? Imagenes Akelarre/botón2.png
?? Imagenes Akelarre/botón3.png
?? Imagenes Akelarre/circulo.png
?? Imagenes Akelarre/nube2.png
?? Imagenes Akelarre/nube4.png
```

> El build usa copias en `client/src/assets/`, no directamente `Imagenes Akelarre/`.

**Regla del usuario:** **NO hacer commit/push** salvo que lo pida explícitamente.

---

## 7. Gotchas conocidos

1. **Render free:** sin Shell → seed manual imposible; depender del auto-seed
2. **Netlify:** hubo límite de créditos operativos (deploys pausados); luego se rehabilitó
3. **CORS:** si cambia la URL del front, actualizar `CLIENT_URL` en Render o defaults en `index.js`
4. **Nubes con `%`:** el tamaño depende del alto de la tarjeta (texto API); usar `rem` fijo
5. **PNG con fondo blanco:** procesar con flood-fill desde bordes, no quitar todo el blanco
6. **Sorpréndeme:** scroll automático a la tarjeta elegida

---

## 8. Pendiente / fuera de alcance MVP

- Video Hero real (ahora gradiente/placeholder)
- Galería con fotos/logos reales (placeholders)
- Catálogo real +80 juegos (hay 16 de seed)
- Portadas de juegos con imágenes reales
- Feed embebido de Instagram
- Panel admin
- Dominio propio (se puede conectar a Netlify u otro hosting)
- E-commerce, auth, PWA QR

---

## 9. Archivos clave para seguir editando UI

| Archivo | Qué editar |
|---------|------------|
| `client/src/sections/Servicios.jsx` | Nubes de servicios |
| `client/src/sections/Ludoteca.jsx` | Ludoteca y botones custom |
| `client/src/components/Navbar.jsx` | Header, logo, CTA nube |
| `client/src/components/PageCorners.jsx` | Esquinas inferiores |
| `client/src/index.css` | Tokens y estilos globales |
| `server/src/seedData.js` | Textos oficiales de servicios/juegos |

---

## 10. Prompt para el siguiente agente

Copia esto al inicio del chat:

```
Continúa el proyecto Akelarre (MERN, landing institucional).
Repo: C:\Proyectos\Akelarre
Front: https://akelarre-juegos.netlify.app
API: https://akelarre-api.onrender.com
Último commit: 3d5663c (servicios con nubes afinadas).
Lee HANDOFF.md antes de empezar.
NO commitear salvo que yo lo pida.
```
