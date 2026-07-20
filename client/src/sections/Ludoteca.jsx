import { useEffect, useMemo, useState } from 'react';
import { getJuegoRandom, getJuegos } from '../api';

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
        <span className="inline-flex w-fit items-center rounded-full border-[3px] border-ak-ink bg-ak-yellow px-4 py-2 font-display text-sm font-bold shadow-[3px_3px_0_0_#111]">
          ¡Más de 80 Juegos!
        </span>
      </div>

      <div className="ak-card mb-6 grid gap-3 bg-white/90 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col gap-1 text-sm font-bold">
          Buscar
          <input
            className="ak-input"
            type="search"
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
            placeholder="Nombre o descripción"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Tipo
          <select
            className="ak-input"
            value={filters.tipo}
            onChange={(e) => updateFilter('tipo', e.target.value)}
          >
            {TIPOS.map((tipo) => (
              <option key={tipo.value || 'all'} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Jugadores
          <input
            className="ak-input"
            type="number"
            min="1"
            value={filters.jugadores}
            onChange={(e) => updateFilter('jugadores', e.target.value)}
            placeholder="Ej. 4"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Edad mínima ≤
          <input
            className="ak-input"
            type="number"
            min="0"
            value={filters.edad}
            onChange={(e) => updateFilter('edad', e.target.value)}
            placeholder="Ej. 10"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Duración ≤ (min)
          <input
            className="ak-input"
            type="number"
            min="1"
            value={filters.duracion}
            onChange={(e) => updateFilter('duracion', e.target.value)}
            placeholder="Ej. 30"
          />
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button type="button" className="ak-btn-accent" onClick={handleSorprendeme}>
          ¡Sorpréndeme!
        </button>
        <p className="font-semibold text-ak-ink/70">{countLabel}</p>
        {surpriseMsg && (
          <p className="font-display font-bold text-ak-purple">{surpriseMsg}</p>
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
