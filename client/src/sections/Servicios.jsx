import { useEffect, useState } from 'react';
import { getServicios } from '../api';
import nube1 from '../assets/nube1.png';
import nube2 from '../assets/nube2.png';
import nube4 from '../assets/nube4.png';

const FALLBACK = [
  {
    _id: '1',
    nombre: 'Noches de Juegos',
    descripcion:
      'Una noche completa de juego facilitado: recomendamos partidas, explicamos reglas y cuidamos la dinámica.',
    slug: 'noches-de-juegos',
  },
  {
    _id: '2',
    nombre: 'Eventos',
    descripcion:
      'Cumpleaños, cierres de año o encuentros institucionales: armamos la experiencia a medida.',
    slug: 'eventos',
  },
  {
    _id: '3',
    nombre: 'Instalaciones Lúdicas',
    descripcion:
      'Montamos una ludoteca viva en tu espacio con materiales y facilitadores.',
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
  'relative min-h-[12rem] min-w-[80%] shrink-0 snap-center overflow-visible bg-transparent p-5 transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-w-[60%] md:min-w-0';

/** 360% de la tarjeta; min-h + line-clamp evitan que el texto de la API agrande la nube */
const cloudImgClass =
  'pointer-events-none absolute left-[calc(50%-20px)] top-[calc(50%-10px)] z-0 h-[360%] w-[360%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain';

const cloudTextClass =
  'relative z-10 flex -translate-x-[20px] -translate-y-[10px] flex-col items-center justify-center text-center';

export default function Servicios() {
  const [servicios, setServicios] = useState(FALLBACK);

  useEffect(() => {
    getServicios()
      .then((data) => {
        if (Array.isArray(data) && data.length) setServicios(data);
      })
      .catch(() => {
        /* fallback local */
      });
  }, []);

  return (
    <section id="servicios" className="ak-section overflow-visible">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl">Nuestros Servicios</h2>
        <p className="mt-2 font-semibold text-ak-ink/80">
          Tres formas de llevar el juego a tu espacio.
        </p>
      </div>

      {/* overflow-visible para que las nubes ×360% no se corten (igual en local y Netlify) */}
      <div className="grid grid-cols-1 gap-8 overflow-visible sm:grid-cols-2 md:grid-cols-3 md:gap-4">
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
                className={cloudImgClass}
              />

              <div className={cloudTextClass}>
                <h3 className="mt-2 text-2xl">{servicio.nombre}</h3>
                <p className="mt-3 line-clamp-3 font-semibold leading-relaxed text-ak-ink/85">
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
