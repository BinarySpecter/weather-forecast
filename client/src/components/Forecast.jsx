import WeatherIcon from './WeatherIcon.jsx';
import { ArrowDownIcon, ArrowUpIcon, DropletIcon } from './Icons.jsx';
import { capitalize, formatForecastDate, formatForecastDay } from '../utils/format.js';

export default function Forecast({ forecast }) {
  if (!forecast?.days?.length) return null;

  return (
    <section className="forecast" aria-label="Five day forecast">
      <div className="section-head">
        <h2 className="section-title">5-day forecast</h2>
        <p className="section-sub">
          Daily high and low for {forecast.city}
          {forecast.country ? `, ${forecast.country}` : ''}
        </p>
      </div>

      <div className="forecast__grid">
        {forecast.days.map((day, index) => (
          <article className="day" key={day.date}>
            <header className="day__head">
              <h3 className="day__name">{formatForecastDay(day.date, index)}</h3>
              <p className="day__date">{formatForecastDate(day.date)}</p>
            </header>

            <WeatherIcon
              conditionId={day.condition.id}
              icon={day.condition.icon}
              label={`${capitalize(day.condition.description)} on ${formatForecastDate(day.date)}`}
              size="sm"
            />

            <p className="day__condition">{capitalize(day.condition.main)}</p>

            <div className="day__temps">
              <span className="day__max">
                <ArrowUpIcon size={13} />
                {day.max}°
              </span>
              <span className="day__min">
                <ArrowDownIcon size={13} />
                {day.min}°
              </span>
            </div>

            <p className="day__pop">
              <DropletIcon size={13} />
              {day.precipitationChance ? `${day.precipitationChance}% rain` : 'No rain'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
