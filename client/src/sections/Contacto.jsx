import { useState } from 'react';
import { postContacto } from '../api';

const TIPOS_EVENTO = [
  'Noche de juegos',
  'Evento / cumpleaños',
  'Instalación lúdica',
  'Otro',
];

const INITIAL = {
  nombre: '',
  telefono: '',
  tipoEvento: '',
  cantidadAsistentes: '',
  fecha: '',
  email: '',
  mensaje: '',
};

export default function Contacto() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateClient() {
    const next = [];
    if (!form.nombre.trim()) next.push('El nombre es obligatorio');
    if (!form.telefono.trim()) next.push('El teléfono es obligatorio');
    if (!form.tipoEvento) next.push('Elegí un tipo de evento');
    if (!form.cantidadAsistentes || Number(form.cantidadAsistentes) < 1) {
      next.push('Indicá la cantidad de asistentes');
    }
    if (!form.fecha) next.push('La fecha es obligatoria');
    return next;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    const clientErrors = validateClient();
    setErrors(clientErrors);
    if (clientErrors.length) return;

    setSending(true);
    try {
      const data = await postContacto({
        ...form,
        cantidadAsistentes: Number(form.cantidadAsistentes),
      });
      setStatus({ type: 'ok', message: data.message });
      setForm(INITIAL);
      setErrors([]);
    } catch (err) {
      setErrors(err.data?.errores || []);
      setStatus({
        type: 'error',
        message: err.message || 'No se pudo enviar la solicitud',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="ak-section">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl">Contrataciones</h2>
        <p className="mt-2 font-semibold text-ak-ink/80">
          Contanos tu idea y coordinamos una fecha. También podés escribir a{' '}
          <a className="underline" href="mailto:akelarre.juegos.nqn@gmail.com">
            akelarre.juegos.nqn@gmail.com
          </a>{' '}
          o seguirnos en{' '}
          <a
            className="underline"
            href="https://instagram.com/Akelarre.juegos"
            target="_blank"
            rel="noreferrer"
          >
            @Akelarre.juegos
          </a>
          .
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="ak-card mx-auto max-w-2xl space-y-4 bg-white p-5 sm:p-8"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-bold">
            Nombre *
            <input
              className="ak-input"
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              autoComplete="name"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-bold">
            Teléfono *
            <input
              className="ak-input"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={onChange}
              autoComplete="tel"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm font-bold">
            Tipo de evento *
            <select
              className="ak-input"
              name="tipoEvento"
              value={form.tipoEvento}
              onChange={onChange}
              required
            >
              <option value="">Elegí una opción</option>
              {TIPOS_EVENTO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-bold">
            Cantidad de asistentes *
            <input
              className="ak-input"
              name="cantidadAsistentes"
              type="number"
              min="1"
              value={form.cantidadAsistentes}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Fecha *
          <input
            className="ak-input"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={onChange}
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Email
          <input
            className="ak-input"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold">
          Mensaje
          <textarea
            className="ak-input min-h-28"
            name="mensaje"
            value={form.mensaje}
            onChange={onChange}
          />
        </label>

        {errors.length > 0 && (
          <ul className="list-disc space-y-1 rounded-xl border-[3px] border-ak-ink bg-ak-orange/20 p-3 pl-8 text-sm font-semibold">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {status.message && (
          <p
            className={`rounded-xl border-[3px] border-ak-ink p-3 font-semibold ${
              status.type === 'ok' ? 'bg-ak-green/30' : 'bg-ak-fuchsia/30'
            }`}
          >
            {status.message}
          </p>
        )}

        <button type="submit" className="ak-btn-teal" disabled={sending}>
          {sending ? 'Enviando…' : 'Solicitar una Fecha'}
        </button>

        <p id="privacidad" className="text-xs font-semibold leading-relaxed text-ak-ink/75">
          <strong className="font-display">Aviso de Privacidad:</strong> al
          enviar este formulario aceptás el tratamiento de tus datos personales
          (Nombre, Teléfono y demás campos indicados) con la finalidad de
          gestionar tu solicitud de fecha/contratación y responderte. Los datos
          se conservarán solo el tiempo necesario para esa gestión. Podés
          ejercer tus derechos de acceso, rectificación, actualización o
          supresión (Ley 25.326) escribiendo a{' '}
          <a className="underline" href="mailto:akelarre.juegos.nqn@gmail.com">
            akelarre.juegos.nqn@gmail.com
          </a>
          .
        </p>
      </form>
    </section>
  );
}
