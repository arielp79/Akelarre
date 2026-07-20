import esqII from '../assets/EsqII.png';
import esqID from '../assets/EsqID.png';

const size =
  'h-[28rem] w-[28rem] sm:h-[36rem] sm:w-[36rem] md:h-[44rem] md:w-[44rem] lg:h-[52rem] lg:w-[52rem]';

const CORNERS = [
  {
    src: esqII,
    className: `bottom-[-40px] left-0 -translate-x-[36%] translate-y-[36%] ${size}`,
  },
  {
    src: esqID,
    className: `bottom-[-20px] right-0 translate-x-[36%] translate-y-[36%] ${size}`,
  },
];

export default function PageCorners() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[70]"
      aria-hidden="true"
    >
      {CORNERS.map((corner) => (
        <img
          key={corner.className}
          src={corner.src}
          alt=""
          className={`absolute max-w-none object-contain opacity-95 mix-blend-screen ${corner.className}`}
        />
      ))}
    </div>
  );
}
