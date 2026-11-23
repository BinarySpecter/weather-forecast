export function formatCityLabel(city, country) {
  if (!city) return 'Unknown location';
  return country ? `${city}, ${country}` : city;
}

export function formatLocalDate(epochMs, offsetSeconds = 0) {
  return new Date(epochMs + offsetSeconds * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

export function formatLocalTime(epochMs, offsetSeconds = 0) {
  return new Date(epochMs + offsetSeconds * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
}

export function formatForecastDay(dateKey, index) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';

  return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  });
}

export function formatForecastDate(dateKey) {
  return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

const BEAUFORT = [
  { limit: 1, label: 'Calm' },
  { limit: 5, label: 'Light air' },
  { limit: 11, label: 'Light breeze' },
  { limit: 19, label: 'Gentle breeze' },
  { limit: 28, label: 'Moderate breeze' },
  { limit: 38, label: 'Fresh breeze' },
  { limit: 49, label: 'Strong breeze' },
  { limit: 61, label: 'Near gale' },
  { limit: 74, label: 'Gale' },
  { limit: 88, label: 'Strong gale' },
];

export function windDescription(kmh) {
  if (typeof kmh !== 'number') return 'No reading';
  const match = BEAUFORT.find((entry) => kmh <= entry.limit);
  return match ? match.label : 'Storm force';
}

export function humidityDescription(percent) {
  if (typeof percent !== 'number') return 'No reading';
  if (percent < 30) return 'Dry air';
  if (percent < 60) return 'Comfortable';
  if (percent < 80) return 'Humid';
  return 'Very humid';
}

export function pressureDescription(hPa) {
  if (typeof hPa !== 'number') return 'No reading';
  if (hPa < 1000) return 'Low pressure';
  if (hPa > 1020) return 'High pressure';
  return 'Normal pressure';
}

export function temperatureDescription(current, feelsLike) {
  if (typeof current !== 'number' || typeof feelsLike !== 'number') return 'No reading';
  const delta = feelsLike - current;
  if (Math.abs(delta) < 1) return 'Matches actual temperature';
  return delta > 0 ? 'Feels warmer than actual' : 'Feels cooler than actual';
}

export function capitalize(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}
