# Handoff 2 — Akelarre: Juegos en Movimiento

Documento para continuar con **otro agente**. Complementa (y en UI actualiza) a `HANDOFF.md`.

**Fecha:** 2026-07-23  
**Workspace:** `C:\Proyectos\Akelarre`  
**Rama:** `master`  
**Regla del usuario:** **NO commit / NO push** salvo pedido explícito. Responder en **español**.

---

## 1. Producción (igual que HANDOFF)

| Recurso | URL |
|---------|-----|
| Repo | https://github.com/arielp79/Akelarre |
| Frontend (Netlify) | https://akelarre-juegos.netlify.app |
| API (Render) | https://akelarre-api.onrender.com |

```bash
npm install && npm install --prefix server && npm install --prefix client
copy server\.env.example server\.env
npm run seed
npm run dev   # API :4000 + front :5173
```

Vite: `client/vite.config.js` tiene `server.host: true` (útil para probar en celular por LAN).

---

## 2. Qué cambió desde HANDOFF.md

`HANDOFF.md` quedó desactualizado en tipografía y en varios detalles de UI. Resumen de trabajo reciente:

### Tipografía
- **Balsamiq Sans** (400/700) en `client/src/index.css` (`--font-display` / `--font-body`).
- Ya no se usan Fredoka/Nunito.

### Experiencia Facilitada (`client/src/sections/Experiencia.jsx`)
- Tarjetas con PNG `card1`–`card4` (sin emojis / sin `botonblanco2`).
- Textos sobre/dentro de la card; **card4** con offset `translate-x-[10px] translate-y-[10px]`.
- Imágenes con `mix-blend-screen`, escaladas ~280%.

### Servicios (`client/src/sections/Servicios.jsx`)
- Nubes: Noches→`nube1`, Eventos→`nube4`, Instalaciones→`nube2`.
- Escalas relativas: `nube1` `scale-[1.057]`, `nube4` `scale-[1.1]`, `nube2` `scale-[0.8925]`.
- Tamaño fijo en rem (no `%`) para que el texto API no deforme la nube.
- **Sol** (`sol.png`) detrás, entre Eventos e Instalaciones — **solo desktop** (`hidden md:block`).
- Sticky/fade del sol en móvil: **probado y revertido** (no reintroducir sin pedirlo).

### Espaciado global
- `.ak-section` usa `padding-block: 3rem` unificado en `index.css`.

### Ludoteca — filtros (trabajo activo / último foco)
Evolución:
1. PNG `card5` / `card6` con offsets fijos → **mal en móvil**.
2. Opción A: CSS puro irregular → descartada a favor de B.
3. **Opción B (actual):** fondos SVG escalables.

**Estado actual:**
- `client/src/assets/card5.svg` — panel contenedor de filtros (pastilla irregular).
- `client/src/assets/card6.svg` — cada input/select.
- Clases CSS: `.ak-filter-panel` y `.ak-filter-input` en `client/src/index.css`.
- Markup: `client/src/sections/Ludoteca.jsx` (sin `<img>` de card5/6; solo clases).
- `background-size: 100% 100%`, `preserveAspectRatio="none"` en los SVG.
- Paths **más irregulares** (último pedido del usuario: “lo quiero más irregular”) + padding un poco mayor para que el texto no roce el borde.
- Focus: outline púrpura (`--color-ak-purple`).
- Hover panel: `translateY(-3px)` si no hay `prefers-reduced-motion`.

PNG legacy aún en assets (`card5.png`, `card6.png`, `card6-source.png`) — **no usados** por el markup actual de filtros.

---

## 3. Archivos tocados / clave ahora

| Archivo | Rol |
|---------|-----|
| `client/src/index.css` | Tipografía Balsamiq, `.ak-section`, `.ak-filter-panel`, `.ak-filter-input` |
| `client/src/assets/card5.svg` | Fondo panel filtros Ludoteca |
| `client/src/assets/card6.svg` | Fondo campos filtro |
| `client/src/sections/Ludoteca.jsx` | Usa clases `ak-filter-*` |
| `client/src/sections/Servicios.jsx` | Nubes + sol |
| `client/src/sections/Experiencia.jsx` | Cards 1–4 |
| `client/vite.config.js` | `host: true` |

Backend (sin cambios recientes de UI): ver `HANDOFF.md` §4.

---

## 4. Git — estado probable (verificar con `git status`)

Cambios locales frecuentes **sin commit** (no asumir limpio):

- Modificados típicos: `.gitignore`, `README.md`, `package.json`, `render.yaml`, y todo el trabajo UI de client (CSS, SVG, secciones).
- Untracked: `HANDOFF.md`, `HANDOFF2.md`, carpeta `Imagenes Akelarre/`, a veces `scripts/` o backups PNG.

> El build usa `client/src/assets/`, no `Imagenes Akelarre/` directamente.

**Verificar siempre** antes de tocar:

```bash
git status -sb
git log -10 --oneline
git diff --stat
```

---

## 5. Gotchas (actualizar lista)

1. **Nubes con `%`:** no; tamaño en `rem` fijo.
2. **PNG blanco exterior:** flood-fill desde bordes (interior blanco opaco).
3. **Filtros Ludoteca:** no volver a offsets fijos en px para “centrar” el PNG; el SVG debe escalar.
4. **`preserveAspectRatio="none"`:** deforma el trazo al estirar; si se ve demasiado “aplastado”, ajustar viewBox/padding o path, no offsets absolutos.
5. **Sol móvil:** no sticky (ya revertido).
6. **Sorpréndeme:** hace `scrollIntoView` a la tarjeta (puede “subir” la página).
7. **CORS / Render free / Netlify créditos:** ver `HANDOFF.md` §7.
8. **No commit** sin pedido explícito del usuario.

---

## 6. Pendiente inmediato (UI)

Prioridad sugerida al retomar:

1. **Validar filtros Ludoteca** en desktop + móvil (forma irregular, padding, focus, select nativo).
2. Si el usuario pide más/menos irregularidad → editar paths de `card5.svg` / `card6.svg` (no CSS border-radius).
3. Revisar si el outline de focus choca visualmente con el trazo dibujado; posibles alternativas: stroke SVG vía filtro CSS o ring más suave.
4. Resto MVP (video Hero, galería real, +80 juegos, Instagram, admin, dominio): igual que `HANDOFF.md` §8.

---

## 7. Contexto del último mensaje del usuario

> «lo quiero más irregular» → aplicado en SVG de filtros.  
> «haz un handoff2…» → este documento.

No hubo commit de esos cambios en esa sesión.

---

## 8. Prompt para el siguiente agente

```
Continúa el proyecto Akelarre (MERN, landing institucional).
Repo: C:\Proyectos\Akelarre
Front: https://akelarre-juegos.netlify.app
API: https://akelarre-api.onrender.com

Lee HANDOFF2.md (y HANDOFF.md solo como contexto backend/estructura).
Estado UI reciente:
- Tipografía Balsamiq Sans
- Experiencia con card1–card4 PNG
- Servicios: nubes + sol desktop
- Ludoteca filtros: opción B con card5.svg / card6.svg (paths irregulares) + clases .ak-filter-panel / .ak-filter-input

Último foco: afinar irregularidad de los SVG de filtros.
NO commitear ni pushear salvo que yo lo pida.
Responde en español.
```
