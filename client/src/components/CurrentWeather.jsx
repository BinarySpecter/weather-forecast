import { MapPinIcon } from './Icons.jsx';
import WeatherIcon from './WeatherIcon.jsx';
import { capitalize, formatCityLabel, formatLocalDate, formatLocalTime } from '../utils/format.js';

export default function CurrentWeather({ weather }) {
  const { condition, temperature } = weather;

  return (
    <section className="hero" aria-label="Current weather">
      <div className="hero__body">
        <p className="hero__place">
          <MapPinIcon size={16} />
          <span>{formatCityLabel(weather.city, weather.country)}</span>
        </p>
        <p className="hero__timestamp">
          {formatLocalDate(weather.observedAt, weather.timezoneOffset)} ·{' '}
          {formatLocalTime(weather.observedAt, weather.timezoneOffset)} local
        </p>

        <div className="hero__temperature">
          <span className="hero__value">{temperature.current}</span>
          <span className="hero__unit">°C</span>
        </div>

        <p className="hero__condition">
          {capitalize(condition.description)}
          <span className="hero__feels">Feels like {temperature.feelsLike}°</span>
        </p>

        <div className="hero__range">
          <span>H {temperature.max}°</span>
          <span className="hero__range-divider" aria-hidden="true" />
          <span>L {temperature.min}°</span>
        </div>
      </div>

      <div className="hero__aside">
        <WeatherIcon
          conditionId={condition.id}
          icon={condition.icon}
          label={`${capitalize(condition.description)} conditions`}
          size="lg"
        />
        <p className="hero__condition-label">{condition.main}</p>
        <p className="hero__daylight">
          {weather.isDay ? 'Daytime right now' : 'Night-time right now'}
        </p>
      </div>
    </section>
  );
}
