import { MapPinIcon, SunIcon } from './Icons.jsx';

const SUGGESTIONS = ['Delhi', 'Mumbai', 'London', 'New York', 'Tokyo'];

export default function EmptyState({ onPick }) {
  return (
    <section className="empty" aria-label="No city selected">
      <span className="empty__icon" aria-hidden="true">
        <SunIcon size={34} />
      </span>
      <h1 className="empty__title">Weather, without the noise.</h1>
      <p className="empty__text">
        Search any city to see current conditions, feels-like temperature, humidity, wind, pressure
        and a five-day outlook.
      </p>
      <div className="empty__suggestions">
        <span className="empty__suggestions-label">
          <MapPinIcon size={14} />
          Popular searches
        </span>
        <div className="empty__chips">
          {SUGGESTIONS.map((city) => (
            <button type="button" className="chip chip--action" key={city} onClick={() => onPick(city)}>
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
