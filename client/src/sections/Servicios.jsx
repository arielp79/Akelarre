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

/** Misma nube/estilo que Noches: Eventos → nube4, Instalaciones → nube2 */
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

const cloudCardClass =
  'relative min-w-[80%] shrink-0 snap-center overflow-visible bg-transparent p-5 transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-w-[60%] md:min-w-0';

const cloudImgClass =
  'pointer-events-none absolute left-[calc(50%-20px)] top-[calc(50%-10px)] h-[360%] w-[360%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain';

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
    <section id="servicios" className="ak-section">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl">Nuestros Servicios</h2>
        <p className="mt-2 font-semibold text-ak-ink/80">
          Tres formas de llevar el juego a tu espacio.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {servicios.map((servicio) => {
          const nube =
            NUBE_POR_SLUG[servicio.slug] || NUBE_POR_NOMBRE[servicio.nombre] || null;

          return (
            <article
              key={servicio._id || servicio.slug}
              className={cloudCardClass}
            >
              {nube && (
                <img
                  src={nube}
                  alt=""
                  aria-hidden="true"
                  className={cloudImgClass}
                />
              )}

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
