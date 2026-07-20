const PLACEHOLDERS = [
  'bg-ak-orange',
  'bg-ak-purple',
  'bg-ak-blue',
  'bg-ak-green',
  'bg-ak-fuchsia',
  'bg-ak-yellow',
];

export default function Galeria() {
  return (
    <section id="galeria" className="ak-section">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl">Galería y Clientes</h2>
        <p className="mt-2 font-semibold text-ak-ink/80">
          Momentos de juego e instituciones que ya compartieron la mesa con
          nosotros.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {PLACEHOLDERS.map((color, index) => (
          <div
            key={color}
            className={`ak-card aspect-[4/3] ${color}/70 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {['Escuela', 'Centro Cultural', 'Empresa', 'Club'].map((name) => (
          <span
            key={name}
            className="ak-border rounded-full bg-white px-4 py-2 font-display text-sm font-bold shadow-[2px_2px_0_0_#111]"
          >
            {name}
          </span>
        ))}
      </div>

      <p id="imagen" className="mt-8 max-w-3xl text-sm font-semibold text-ak-ink/75">
        <strong className="font-display">Derechos de imagen:</strong> las
        fotografías y videos publicados corresponden a experiencias reales. Se
        cuenta con el consentimiento de las personas identificables (o de sus
        tutores, en caso de menores). Si preferís no figurar, escribinos a{' '}
        <a className="underline" href="mailto:akelarre.juegos.nqn@gmail.com">
          akelarre.juegos.nqn@gmail.com
        </a>{' '}
        para solicitar la baja del material.
      </p>
    </section>
  );
}
