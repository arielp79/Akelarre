const REQUISITOS = [
  { title: 'Mesas y sillas suficientes', color: 'bg-ak-orange', icon: '🪑' },
  { title: 'Buena iluminación', color: 'bg-ak-yellow', icon: '💡' },
  { title: 'Espacio para circulación', color: 'bg-ak-cyan', icon: '🗺' },
  { title: 'Punto de apoyo para materiales', color: 'bg-ak-green', icon: '📦' },
];

export default function Requisitos() {
  return (
    <section id="requisitos" className="ak-section">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl">Prepara Tu Espacio</h2>
        <p className="mt-2 font-semibold text-ak-ink/80">
          Duración típica: 4 horas de juego continuo. Con estos requisitos, la
          experiencia fluye.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REQUISITOS.map((item) => (
          <article
            key={item.title}
            className={`ak-card ${item.color} p-5 text-center hover:brightness-105`}
          >
            <span className="text-4xl" aria-hidden="true">
              {item.icon}
            </span>
            <h3 className="mt-3 text-xl leading-snug">{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
