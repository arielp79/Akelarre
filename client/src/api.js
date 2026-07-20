const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Error en la solicitud');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function getJuegos(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.set(key, value);
    }
  });
  const qs = query.toString();
  return request(`/api/juegos${qs ? `?${qs}` : ''}`);
}

export function getJuegoRandom(jugadores) {
  const query = jugadores ? `?jugadores=${encodeURIComponent(jugadores)}` : '';
  return request(`/api/juegos/random${query}`);
}

export function getServicios() {
  return request('/api/servicios');
}

export function postContacto(payload) {
  return request('/api/contacto', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
