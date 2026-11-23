const CARDINALS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

const toCardinal = (degrees) => {
  if (typeof degrees !== 'number' || Number.isNaN(degrees)) return null;
  return CARDINALS[Math.round(degrees / 22.5) % 16];
};

const round = (value, precision = 0) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return null;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};

const mapCondition = (weather = []) => {
  const primary = weather[0] || {};
  return {
    id: primary.id ?? null,
    main: primary.main || 'Unknown',
    description: primary.description || 'No description available',
    icon: primary.icon || '01d',
  };
};

export function mapCurrentWeather(raw) {
  const sunrise = raw.sys?.sunrise ? raw.sys.sunrise * 1000 : null;
  const sunset = raw.sys?.sunset ? raw.sys.sunset * 1000 : null;
  const observedAt = (raw.dt ?? Math.floor(Date.now() / 1000)) * 1000;

  return {
    city: raw.name,
    country: raw.sys?.country || '',
    coordinates: {
      lat: round(raw.coord?.lat, 4),
      lon: round(raw.coord?.lon, 4),
    },
    timezoneOffset: raw.timezone ?? 0,
    observedAt,
    isDay: sunrise && sunset ? observedAt >= sunrise && observedAt < sunset : true,
    temperature: {
      current: round(raw.main?.temp),
      feelsLike: round(raw.main?.feels_like),
      min: round(raw.main?.temp_min),
      max: round(raw.main?.temp_max),
      unit: 'C',
    },
    humidity: raw.main?.humidity ?? null,
    pressure: raw.main?.pressure ?? null,
    wind: {
      speedMs: round(raw.wind?.speed, 1),
      speedKmh: round((raw.wind?.speed ?? 0) * 3.6, 1),
      gustKmh: raw.wind?.gust ? round(raw.wind.gust * 3.6, 1) : null,
      directionDeg: raw.wind?.deg ?? null,
      direction: toCardinal(raw.wind?.deg),
    },
    condition: mapCondition(raw.weather),
    clouds: raw.clouds?.all ?? null,
    visibilityKm: raw.visibility ? round(raw.visibility / 1000, 1) : null,
    sunrise,
    sunset,
  };
}

function dominantCondition(entries) {
  const counts = new Map();

  for (const entry of entries) {
    const condition = entry.weather?.[0];
    if (!condition) continue;

    const current = counts.get(condition.id) || { count: 0, condition };
    current.count += 1;
    counts.set(condition.id, current);
  }

  const winner = [...counts.values()].sort((a, b) => b.count - a.count)[0];
  if (!winner) return mapCondition([]);

  return {
    id: winner.condition.id,
    main: winner.condition.main,
    description: winner.condition.description,
    icon: `${winner.condition.icon.slice(0, 2)}d`,
  };
}

export function mapForecast(raw) {
  const offset = raw.city?.timezone ?? 0;
  const grouped = new Map();

  for (const entry of raw.list || []) {
    const localDate = new Date((entry.dt + offset) * 1000).toISOString().slice(0, 10);
    const bucket = grouped.get(localDate) || { date: localDate, entries: [] };
    bucket.entries.push(entry);
    grouped.set(localDate, bucket);
  }

  const days = [...grouped.values()].slice(0, 5).map(({ date, entries }) => {
    const temps = entries.map((entry) => entry.main?.temp).filter((value) => typeof value === 'number');
    const humidities = entries.map((entry) => entry.main?.humidity).filter((value) => typeof value === 'number');
    const winds = entries.map((entry) => entry.wind?.speed).filter((value) => typeof value === 'number');
    const pops = entries.map((entry) => entry.pop).filter((value) => typeof value === 'number');

    return {
      date,
      min: temps.length ? round(Math.min(...temps)) : null,
      max: temps.length ? round(Math.max(...temps)) : null,
      humidity: humidities.length
        ? round(humidities.reduce((sum, value) => sum + value, 0) / humidities.length)
        : null,
      windKmh: winds.length ? round((winds.reduce((sum, value) => sum + value, 0) / winds.length) * 3.6, 1) : null,
      precipitationChance: pops.length ? Math.round(Math.max(...pops) * 100) : null,
      condition: dominantCondition(entries),
      unit: 'C',
    };
  });

  return {
    city: raw.city?.name,
    country: raw.city?.country || '',
    coordinates: {
      lat: round(raw.city?.coord?.lat, 4),
      lon: round(raw.city?.coord?.lon, 4),
    },
    timezoneOffset: offset,
    days,
  };
}
