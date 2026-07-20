export default function QueEs() {
  return (
    <section id="nosotros" className="ak-section">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl">¿Qué es Akelarre?</h2>
          <p className="text-lg font-bold text-ak-purple">
            Creemos que jugar no es solo para la infancia. El juego es una
            práctica social y afectiva.
          </p>
          <p className="font-semibold leading-relaxed text-ak-ink/85">
            Ofrecemos una propuesta lúdica y recreativa para todas las edades:
            juegos cooperativos, dinámicos y estratégicos, acompañados por un
            equipo que facilita, recomienda y cuida la experiencia.
          </p>
          <div className="ak-card bg-ak-yellow/40 p-4">
            <p className="font-display text-lg font-bold">Hablemos de Juego</p>
            <p className="font-semibold">Nicolás y Khrysé</p>
            <p className="mt-2 text-sm font-semibold text-ak-ink/80">
              Junto a 3 facilitadores especializados que acompañan cada mesa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {['bg-ak-orange', 'bg-ak-blue', 'bg-ak-green'].map((color, i) => (
            <div
              key={color}
              className={`ak-card flex aspect-square items-center justify-center ${color} ${i === 1 ? 'translate-y-4' : ''}`}
              aria-hidden="true"
            >
              <span className="font-display text-3xl text-white">♟</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
