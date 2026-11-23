const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'REQUEST_FAILED' } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function get(path) {
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' },
    });
  } catch {
    throw new ApiError(
      'We could not reach the weather server. Please check that the backend is running and try again.',
      { code: 'NETWORK_ERROR' }
    );
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.error?.message || 'Something went wrong while fetching the weather. Please try again.',
      {
        status: response.status,
        code: payload?.error?.code || 'REQUEST_FAILED',
      }
    );
  }

  if (!payload?.data) {
    throw new ApiError('The weather server returned an unexpected response.', {
      status: response.status,
      code: 'BAD_PAYLOAD',
    });
  }

  return payload.data;
}

export function fetchWeatherBundle(city) {
  const query = encodeURIComponent(city);

  return Promise.all([get(`/api/weather?city=${query}`), get(`/api/forecast?city=${query}`)]).then(
    ([weather, forecast]) => ({ weather, forecast })
  );
}
