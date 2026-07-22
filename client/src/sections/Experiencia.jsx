import card1 from '../assets/card1.png';
import card2 from '../assets/card2.png';
import card3 from '../assets/card3.png';
import card4 from '../assets/card4.png';

const ITEMS = [
  {
    title: '3 facilitadores especializados',
    cardSrc: card1,
  },
  {
    title: 'Recomiendan juegos',
    cardSrc: card2,
  },
  {
    title: '4 horas de juego continuo',
    cardSrc: card3,
  },
  {
    title: 'Supervisan cuidado de materiales',
    cardSrc: card4,
    textClass: 'translate-x-[10px] translate-y-[10px]',
  },
];

export default function Experiencia() {
  return (
    <section className="ak-section">
      <h2 className="mb-[calc(1.5rem+20px)] text-3xl sm:text-4xl">La Experiencia Facilitada</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="relative flex min-h-[9.5rem] items-center justify-center overflow-visible p-5 text-center transition duration-200 hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              <img
                src={item.cardSrc}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[280%] w-[280%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-screen"
              />
              <p
                className={`absolute inset-x-[8%] bottom-[4%] z-20 font-display text-lg font-bold leading-snug text-ak-ink ${item.textClass || ''}`}
              >
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
