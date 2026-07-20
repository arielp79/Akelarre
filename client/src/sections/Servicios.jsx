import { useEffect, useState } from 'react';
import { getServicios } from '../api';

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

const ACCENTS = ['bg-ak-orange', 'bg-ak-fuchsia', 'bg-ak-blue'];

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
        {servicios.map((servicio, index) => (
          <article
            key={servicio._id || servicio.slug}
            className={`ak-card min-w-[80%] shrink-0 snap-center p-5 sm:min-w-[60%] md:min-w-0 ${ACCENTS[index % ACCENTS.length]}/20 hover:bg-white`}
          >
            <div
              className={`mb-4 h-3 w-16 rounded-full border-2 border-ak-ink ${ACCENTS[index % ACCENTS.length]}`}
            />
            <h3 className="text-2xl">{servicio.nombre}</h3>
            <p className="mt-3 font-semibold leading-relaxed text-ak-ink/85">
              {servicio.descripcion}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
