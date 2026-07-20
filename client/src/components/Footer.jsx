export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ak-ink bg-white">
      <div className="ak-section flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold">Akelarre</p>
          <p className="max-w-md font-semibold text-ak-ink/80">
            Juegos en Movimiento · Neuquén y alrededores
          </p>
          <div className="flex flex-col gap-1 font-semibold">
            <a
              className="hover:text-ak-purple"
              href="mailto:akelarre.juegos.nqn@gmail.com"
            >
              akelarre.juegos.nqn@gmail.com
            </a>
            <a
              className="hover:text-ak-fuchsia"
              href="https://instagram.com/Akelarre.juegos"
              target="_blank"
              rel="noreferrer"
            >
              @Akelarre.juegos
            </a>
          </div>
        </div>

        <div className="space-y-2 text-sm font-semibold">
          <a href="#privacidad" className="block hover:underline">
            Aviso de Privacidad
          </a>
          <a href="#imagen" className="block hover:underline">
            Derechos de imagen
          </a>
        </div>

        <p
          className="font-display text-4xl font-bold leading-none sm:text-5xl"
          aria-hidden="true"
        >
          <span className="text-ak-orange">G</span>
          <span className="text-ak-fuchsia">R</span>
          <span className="text-ak-purple">A</span>
          <span className="text-ak-blue">C</span>
          <span className="text-ak-green">I</span>
          <span className="text-ak-yellow">A</span>
          <span className="text-ak-cyan">S</span>
        </p>
      </div>
    </footer>
  );
}
