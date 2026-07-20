import { useEffect, useState } from 'react';
import Logo from './Logo';
import nube3 from '../assets/nube3.png';

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#juegos', label: 'Juegos' },
  { href: '#servicios', label: 'Nuestros Servicios' },
  { href: '#requisitos', label: 'Requisitos' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b-[3px] border-ak-ink bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-22 w-full max-w-7xl items-center px-3 sm:px-4 lg:px-6">
        {/* Logo: más a la izquierda */}
        <div className="pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1 md:translate-x-0 lg:left-0">
          <Logo compact />
        </div>

        {/* Menú: centrado en el header */}
        <nav
          className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex lg:gap-8"
          aria-label="Principal"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-display text-[1.1484375rem] font-semibold text-ak-ink hover:text-ak-purple hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Nube CTA: más a la derecha */}
        <div className="relative z-10 ml-auto flex items-center">
          <a
            href="#contacto"
            className="relative hidden h-[18.04275rem] w-[18.04275rem] translate-x-4 items-center justify-center transition hover:-translate-y-0.5 sm:flex md:h-[19.683rem] md:w-[19.683rem] md:translate-x-6 lg:translate-x-8"
          >
            <img
              src={nube3}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain drop-shadow-md"
            />
            <span className="relative z-10 flex max-w-[85%] flex-col items-center text-center font-display text-[14.96px] font-bold leading-tight text-black md:text-[16.83px]">
              <span>Solicitar</span>
              <span>una Fecha</span>
            </span>
          </a>

          <button
            type="button"
            className="ak-btn bg-ak-yellow px-2.5 py-1 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="relative z-30 border-t-[3px] border-ak-ink bg-white px-4 py-4 md:hidden"
          aria-label="Móvil"
        >
          <ul className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-display text-[1.4765625rem] font-bold"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="ak-btn-accent w-full"
                onClick={() => setOpen(false)}
              >
                Contratar
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
