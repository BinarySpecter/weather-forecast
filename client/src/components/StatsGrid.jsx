import { DropletIcon, GaugeIcon, ThermometerIcon, WindIcon } from './Icons.jsx';
import {
  humidityDescription,
  pressureDescription,
  temperatureDescription,
  windDescription,
} from '../utils/format.js';

export default function StatsGrid({ weather }) {
  const { temperature, humidity, wind, pressure } = weather;

  const stats = [
    {
      key: 'feels',
      label: 'Feels like',
      value: temperature.feelsLike,
      unit: '°C',
      note: temperatureDescription(temperature.current, temperature.feelsLike),
      icon: <ThermometerIcon size={18} />,
    },
    {
      key: 'humidity',
      label: 'Humidity',
      value: humidity,
      unit: '%',
      note: humidityDescription(humidity),
      icon: <DropletIcon size={18} />,
    },
    {
      key: 'wind',
      label: 'Wind',
      value: wind.speedKmh,
      unit: 'km/h',
      note: [wind.direction, windDescription(wind.speedKmh)].filter(Boolean).join(' · '),
      icon: <WindIcon size={18} />,
    },
    {
      key: 'pressure',
      label: 'Pressure',
      value: pressure,
      unit: 'hPa',
      note: pressureDescription(pressure),
      icon: <GaugeIcon size={18} />,
    },
  ];

  return (
    <section className="stats" aria-label="Weather details">
      {stats.map((stat) => (
        <article className="stat" key={stat.key}>
          <div className="stat__head">
            <span className="stat__icon" aria-hidden="true">
              {stat.icon}
            </span>
            <span className="stat__label">{stat.label}</span>
          </div>
          <p className="stat__value">
            {stat.value ?? '—'}
            <span className="stat__unit">{stat.unit}</span>
          </p>
          <p className="stat__note">{stat.note}</p>
        </article>
      ))}
    </section>
  );
}
