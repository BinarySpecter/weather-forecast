import { config } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const ENDPOINTS = {
  current: '/weather',
  forecast: '/forecast',
};

const MISSING_KEY_MESSAGE =
  'The weather service is not configured on this server. Please set OPENWEATHER_API_KEY and restart the backend.';

function assertApiKey() {
  if (!config.openWeatherApiKey) {
    throw new AppError(503, MISSING_KEY_MESSAGE, 'WEATHER_API_KEY_MISSING');
  }
}

function mapUpstreamStatus(status, city) {
  if (status === 401) {
    return new AppError(
      503,
      'The weather service rejected the server credentials. Please verify OPENWEATHER_API_KEY.',
      'WEATHER_API_UNAUTHORIZED'
    );
  }

  if (status === 404) {
    return new AppError(
      404,
      `We couldn't find "${city}". Check the spelling and try again.`,
      'CITY_NOT_FOUND'
    );
  }

  if (status === 429) {
    return new AppError(
      429,
      'The weather service is receiving too many requests right now. Please wait a moment and try again.',
      'WEATHER_API_RATE_LIMITED'
    );
  }

  if (status >= 500) {
    return new AppError(
      502,
      'The weather service is currently unavailable. Please try again shortly.',
      'WEATHER_API_UNAVAILABLE'
    );
  }

  return new AppError(
    502,
    'The weather service returned an unexpected response. Please try again.',
    'WEATHER_API_BAD_RESPONSE'
  );
}

async function request(endpoint, city) {
  assertApiKey();

  const url = new URL(`${config.openWeatherBaseUrl}${endpoint}`);
  url.searchParams.set('q', city);
  url.searchParams.set('appid', config.openWeatherApiKey);
  url.searchParams.set('units', 'metric');

  let response;

  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(config.requestTimeoutMs),
    });
  } catch (error) {
    const isTimeout = error?.name === 'TimeoutError' || error?.name === 'AbortError';

    if (isTimeout) {
      throw new AppError(
        504,
        'The weather service took too long to respond. Please try again.',
        'WEATHER_API_TIMEOUT'
      );
    }

    throw new AppError(
      502,
      'We could not reach the weather service. Please check your connection and try again.',
      'WEATHER_API_UNREACHABLE'
    );
  }

  if (!response.ok) {
    throw mapUpstreamStatus(response.status, city);
  }

  try {
    return await response.json();
  } catch {
    throw new AppError(
      502,
      'The weather service returned an unreadable response. Please try again.',
      'WEATHER_API_BAD_RESPONSE'
    );
  }
}

export function fetchCurrentWeather(city) {
  return request(ENDPOINTS.current, city);
}

export function fetchForecast(city) {
  return request(ENDPOINTS.forecast, city);
}
