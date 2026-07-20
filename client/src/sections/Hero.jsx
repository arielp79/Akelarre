export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-ak-purple via-ak-blue to-ak-orange opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.35),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="ak-section relative z-10 grid items-center gap-8 py-16 md:grid-cols-[minmax(0,280px)_1fr] md:py-24">
        <div className="ak-card mx-auto w-full max-w-xs -rotate-2 overflow-hidden bg-white p-3">
          <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-ak-yellow via-ak-fuchsia to-ak-blue" />
          <p className="mt-2 text-center font-display text-sm font-bold">
            Jugar juntos
          </p>
        </div>

        <div className="space-y-6 text-center md:text-left">
          <p className="inline-block rounded-full border-[3px] border-ak-ink bg-white px-3 py-1 font-display text-xs font-bold shadow-[2px_2px_0_0_#111]">
            Akelarre · Juegos en Movimiento
          </p>
          <h1 className="text-3xl leading-tight text-white drop-shadow-[2px_2px_0_#111] sm:text-4xl lg:text-5xl">
            Transformamos cualquier espacio en una experiencia de juego
          </h1>
          <p className="max-w-xl font-bold text-white/95 md:text-lg">
            Encuentro y diversión para todas las edades con juegos de mesa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a href="#contacto" className="ak-btn-accent">
              Contratar
            </a>
            <a href="#juegos" className="ak-btn-primary">
              Descubre el Juego
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
