import { useEffect, useRef, useState } from 'react';
import { getServicios } from '../api';
import nube1 from '../assets/nube1.png';
import nube2 from '../assets/nube2.png';
import nube4 from '../assets/nube4.png';
import sol from '../assets/sol.png';

const FALLBACK = [
  {
    _id: '1',
    nombre: 'Noches de Juegos',
    descripcion:
      'Una noche completa de juego facilitado: recomendamos partidas, explicamos reglas y cuidamos la dinámica para que todos jueguen.',
    slug: 'noches-de-juegos',
  },
  {
    _id: '2',
    nombre: 'Eventos',
    descripcion:
      'Cumpleaños, cierres de año, encuentros institucionales o fiestas: armamos la experiencia lúdica a medida de tu grupo.',
    slug: 'eventos',
  },
  {
    _id: '3',
    nombre: 'Instalaciones Lúdicas',
    descripcion:
      'Montamos una ludoteca viva en tu espacio con materiales, facilitadores y circulación pensada para jugar sin fricción.',
    slug: 'instalaciones-ludicas',
  },
];

/** Misma nube/estilo: Noches→nube1, Eventos→nube4, Instalaciones→nube2 */
const NUBE_POR_SLUG = {
  'noches-de-juegos': nube1,
  eventos: nube4,
  'instalaciones-ludicas': nube2,
};

const NUBE_POR_NOMBRE = {
  'Noches de Juegos': nube1,
  Eventos: nube4,
  'Instalaciones Lúdicas': nube2,
};

const NUBE_POR_INDICE = [nube1, nube4, nube2];

const cloudCardClass =
  'relative z-[1] min-w-[80%] shrink-0 snap-center overflow-visible bg-transparent p-5 transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-w-[60%] md:min-w-0';

/** Tamaño fijo de nube (no %): el texto completo no la agranda ni la achica */
const cloudImgClass =
  'pointer-events-none absolute left-[calc(50%-20px)] top-[calc(50%-10px)] z-0 h-[39.35925rem] w-[67.473rem] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[42.170625rem] sm:w-[73.09575rem]';

const cloudTextClass =
  'relative z-10 flex -translate-x-[20px] -translate-y-[5px] flex-col items-center justify-center text-center';

const FADE_PX = 240;

export default function Servicios() {
  const sectionRef = useRef(null);
  const [servicios, setServicios] = useState(FALLBACK);
  const [ghost, setGhost] = useState({ opacity: 0, blur: 12 });

  useEffect(() => {
    getServicios()
      .then((data) => {
        if (Array.isArray(data) && data.length) setServicios(data);
      })
      .catch(() => {
        /* fallback local */
      });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      // En desktop el sol no usa el efecto fantasma
      if (window.matchMedia('(min-width: 768px)').matches) {
        setGhost({ opacity: 1, blur: 0 });
        return;
      }

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      if (reduceMotion.matches) {
        const visible = rect.bottom > 0 && rect.top < vh;
        setGhost({ opacity: visible ? 1 : 0, blur: 0 });
        return;
      }

      let opacity = 1;
      if (rect.top >= vh || rect.bottom <= 0) {
        opacity = 0;
      } else {
        if (rect.top > vh - FADE_PX) {
          opacity = Math.min(opacity, (vh - rect.top) / FADE_PX);
        }
        if (rect.bottom < FADE_PX) {
          opacity = Math.min(opacity, rect.bottom / FADE_PX);
        }
      }

      opacity = Math.max(0, Math.min(1, opacity));
      setGhost({ opacity, blur: (1 - opacity) * 12 });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="ak-section relative overflow-visible"
    >
      {/* Móvil: sticky a la derecha en toda la sección, aparece/desaparece como fantasma */}
      <div
        className="pointer-events-none sticky top-24 z-0 -mb-[min(72vh,28rem)] flex justify-end md:hidden"
        style={{
          opacity: ghost.opacity,
          filter: `blur(${ghost.blur}px)`,
          willChange: 'opacity, filter',
        }}
      >
        <img
          src={sol}
          alt=""
          aria-hidden="true"
          className="h-auto max-h-[min(72vh,28rem)] w-[min(98vw,30rem)] translate-x-[18%] object-contain"
        />
      </div>

      <div className="relative z-[1] mb-[90px] max-w-2xl">
        <h2 className="text-3xl sm:text-4xl">Nuestros Servicios</h2>
        <p className="mt-2 font-semibold text-ak-ink/80">
          Tres formas de llevar el juego a tu espacio.
        </p>
      </div>

      {/* overflow-visible para que las nubes ×360% no se corten (igual en local y Netlify) */}
      <div className="relative z-[1] grid grid-cols-1 gap-[70px] overflow-visible sm:grid-cols-2 md:grid-cols-3 md:gap-[47px]">
        {/* Desktop: sol detrás entre Eventos (nube4) e Instalaciones (nube2) */}
        <div className="pointer-events-none absolute left-[calc(66.666%+20px)] top-[calc(50%-100px)] z-0 hidden h-[32rem] w-[32rem] max-w-none -translate-x-1/2 -translate-y-1/2 md:block">
          <img
            src={sol}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain"
          />
        </div>

        {servicios.map((servicio, index) => {
          const nube =
            NUBE_POR_SLUG[servicio.slug] ||
            NUBE_POR_NOMBRE[servicio.nombre] ||
            NUBE_POR_INDICE[index] ||
            nube1;

          return (
            <article
              key={servicio._id || servicio.slug}
              className={cloudCardClass}
            >
              <img
                src={nube}
                alt=""
                aria-hidden="true"
                className={
                  nube === nube1
                    ? `${cloudImgClass} scale-[1.057]`
                    : nube === nube4
                      ? `${cloudImgClass} scale-[1.1]`
                      : nube === nube2
                        ? `${cloudImgClass} scale-[0.8925]`
                        : cloudImgClass
                }
              />

              <div className={cloudTextClass}>
                <h3 className="mt-2 text-2xl">{servicio.nombre}</h3>
                <p className="mt-3 font-semibold leading-relaxed text-ak-ink/85">
                  {servicio.descripcion}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
