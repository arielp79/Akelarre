import { useEffect, useMemo, useState } from 'react';
import { getJuegoRandom, getJuegos } from '../api';
import boton2 from '../assets/boton2.png';
import boton3 from '../assets/boton3.png';
import card5 from '../assets/card5.png';
import card6 from '../assets/card6.png';

const TIPOS = [
  { value: '', label: 'Todos' },
  { value: 'cooperativo', label: 'Cooperativos' },
  { value: 'estrategico', label: 'Estratégicos' },
  { value: 'rapido', label: 'Rápidos' },
  { value: 'grupos_grandes', label: 'Para grupos grandes' },
];

const COLORS = [
  'bg-ak-orange',
  'bg-ak-fuchsia',
  'bg-ak-purple',
  'bg-ak-blue',
  'bg-ak-green',
  'bg-ak-yellow',
  'bg-ak-cyan',
];

const filterFieldClass =
  'relative z-10 w-full appearance-none border-0 bg-transparent px-5 py-3 font-body text-sm font-semibold outline-none focus:ring-0';

function FilterField({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-bold">
      {label}
      <span className="relative flex min-h-12 items-center overflow-visible">
        <img
          src={card6}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%-40px-21rem-125px)] top-1/2 z-0 h-[14rem] w-[42rem] max-w-none origin-left -translate-y-1/2 scale-x-[1.5] object-contain"
        />
        <span className="relative z-10 w-full">{children}</span>
      </span>
    </label>
  );
}
export default function Ludoteca() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [highlightId, setHighlightId] = useState(null);
  const [surpriseMsg, setSurpriseMsg] = useState('');
  const [filters, setFilters] = useState({
    q: '',
    tipo: '',
    jugadores: '',
    edad: '',
    duracion: '',
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getJuegos(filters)
      .then((data) => {
        if (!cancelled) setJuegos(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) {
          setError('No pudimos cargar la ludoteca. ¿Está corriendo la API y MongoDB?');
          setJuegos([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters]);

  const countLabel = useMemo(() => {
    if (loading) return 'Cargando…';
    return `${juegos.length} juego${juegos.length === 1 ? '' : 's'}`;
  }, [juegos.length, loading]);

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSorprendeme() {
    setSurpriseMsg('');
    try {
      const juego = await getJuegoRandom(filters.jugadores || undefined);
      setHighlightId(juego._id);
      setSurpriseMsg(`¡Salió ${juego.nombre}!`);
      const el = document.getElementById(`juego-${juego._id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (!juegos.some((j) => j._id === juego._id)) {
        setJuegos((prev) => [juego, ...prev]);
      }
    } catch (err) {
      setSurpriseMsg(
        err.data?.message ||
          'No hay juegos compatibles. Probá ajustar la cantidad de jugadores.'
      );
    }
  }

  return (
    <section id="juegos" className="ak-section">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl">Ludoteca</h2>
          <p className="mt-2 font-semibold text-ak-ink/80">
            Más de 80 juegos. Filtrá y descubrí tu próxima partida.
          </p>
        </div>
        <span className="relative inline-flex h-[5.25rem] w-[21rem] shrink-0 items-center justify-center self-end sm:h-24 sm:w-96">
          <img
            src={boton3}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen"
          />
          <span className="relative z-10 px-3 text-center font-display text-sm font-bold text-ak-ink sm:text-base">
            ¡Más de 80 Juegos!
          </span>
        </span>
      </div>

      <div className="relative z-10 mb-6 mt-[30px] overflow-visible p-4 transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <img
          src={card5}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%+40px)] top-[calc(50%+100px)] z-0 h-[660%] w-[480%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen sm:h-[720%] sm:w-[450%]"
        />
        <div className="relative z-10 grid translate-y-[10px] gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <FilterField label="Buscar">
            <input
              className={filterFieldClass}
              type="search"
              value={filters.q}
              onChange={(e) => updateFilter('q', e.target.value)}
              placeholder="Nombre o descripción"
            />
          </FilterField>

          <FilterField label="Tipo">
            <select
              className={filterFieldClass}
              value={filters.tipo}
              onChange={(e) => updateFilter('tipo', e.target.value)}
            >
              {TIPOS.map((tipo) => (
                <option key={tipo.value || 'all'} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Jugadores">
            <input
              className={filterFieldClass}
              type="number"
              min="1"
              value={filters.jugadores}
              onChange={(e) => updateFilter('jugadores', e.target.value)}
              placeholder="Ej. 4"
            />
          </FilterField>

          <FilterField label="Edad mínima ≤">
            <input
              className={filterFieldClass}
              type="number"
              min="0"
              value={filters.edad}
              onChange={(e) => updateFilter('edad', e.target.value)}
              placeholder="Ej. 10"
            />
          </FilterField>

          <FilterField label="Duración ≤ (min)">
            <input
              className={filterFieldClass}
              type="number"
              min="1"
              value={filters.duracion}
              onChange={(e) => updateFilter('duracion', e.target.value)}
              placeholder="Ej. 30"
            />
          </FilterField>
        </div>
      </div>

      <div className="relative z-10 mb-4 mt-[60px] flex flex-wrap items-center gap-3 overflow-visible">
        <button
          type="button"
          onClick={handleSorprendeme}
          className="relative inline-flex h-11 w-44 shrink-0 items-center justify-center overflow-visible transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-12 sm:w-48"
        >
          <img
            src={boton2}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[15.75rem] w-[63rem] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen sm:h-[18rem] sm:w-[72rem]"
          />
          <span className="relative z-10 px-3 text-center font-display text-sm font-bold text-ak-ink sm:text-base">
            ¡Sorpréndeme!
          </span>
        </button>
        <p className="relative z-10 font-semibold text-ak-ink/70">{countLabel}</p>
        {surpriseMsg && (
          <p className="relative z-10 font-display font-bold text-ak-purple">{surpriseMsg}</p>
        )}
      </div>

      {error && (
        <p className="mb-4 rounded-xl border-[3px] border-ak-ink bg-ak-orange/30 p-3 font-semibold">
          {error}
        </p>
      )}

      {!loading && !error && juegos.length === 0 && (
        <p className="font-semibold">No hay juegos con esos filtros. Probá otros valores.</p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {juegos.map((juego, index) => (
          <article
            key={juego._id}
            id={`juego-${juego._id}`}
            className={`ak-card overflow-hidden p-2 hover:bg-ak-fuchsia/20 ${
              highlightId === juego._id ? 'ring-4 ring-ak-purple' : ''
            }`}
          >
            <div
              className={`flex aspect-square items-center justify-center rounded-xl border-2 border-ak-ink ${COLORS[index % COLORS.length]}`}
            >
              <span className="px-2 text-center font-display text-sm font-bold text-white drop-shadow">
                {juego.nombre}
              </span>
            </div>
            <div className="mt-2 space-y-1 p-1">
              <h3 className="line-clamp-2 text-base leading-tight">{juego.nombre}</h3>
              <p className="flex flex-wrap gap-2 text-xs font-bold text-ak-ink/70">
                <span>👥 {juego.jugadoresMin}–{juego.jugadoresMax}</span>
                <span>⏱ {juego.duracionMinutos}′</span>
                <span>+{juego.edadMinima}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
