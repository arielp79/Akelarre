import logoImg from '../assets/logo.png';

export default function Logo({ compact = false }) {
  return (
    <a
      href="#inicio"
      className="inline-flex items-center no-underline drop-shadow-md"
      aria-label="Akelarre inicio"
    >
      <img
        src={logoImg}
        alt="Akelarre · Juegos en Movimiento"
        className={
          compact
            ? 'h-44 w-auto object-contain sm:h-48'
            : 'h-52 w-auto object-contain md:h-60'
        }
      />
    </a>
  );
}
