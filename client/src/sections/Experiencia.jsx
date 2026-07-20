const ITEMS = [
  { title: '3 facilitadores especializados', icon: '👤' },
  { title: 'Recomiendan juegos', icon: '✋' },
  { title: '4 horas de juego continuo', icon: '⏱' },
  { title: 'Supervisan cuidado de materiales', icon: '🗄' },
];

export default function Experiencia() {
  return (
    <section className="ak-section pt-4">
      <h2 className="mb-6 text-3xl sm:text-4xl">La Experiencia Facilitada</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="ak-card flex flex-col items-center gap-3 p-5 text-center hover:bg-ak-cyan/20">
            <span className="text-3xl" aria-hidden="true">
              {item.icon}
            </span>
            <p className="font-display text-lg font-bold leading-snug">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
