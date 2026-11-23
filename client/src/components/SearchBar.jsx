import { ClockIcon, SearchIcon } from './Icons.jsx';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  disabled,
  error,
  lastCity,
  onUseLastCity,
}) {
  return (
    <section className="search" aria-label="City search">
      <form className="search__form" role="search" onSubmit={onSubmit} noValidate>
        <label className="sr-only" htmlFor="city-search">
          City name
        </label>
        <span className="search__icon" aria-hidden="true">
          <SearchIcon size={18} />
        </span>
        <input
          id="city-search"
          className="search__input"
          type="search"
          name="city"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search a city — Delhi, London, Tokyo"
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'city-search-error' : 'city-search-hint'}
        />
        <button type="submit" className="button button--primary" disabled={disabled}>
          {disabled ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span>Searching</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      <div className="search__meta">
        {error ? (
          <p id="city-search-error" className="search__error" role="alert">
            {error}
          </p>
        ) : (
          <p id="city-search-hint" className="search__hint">
            Current conditions and a 5-day outlook, in Celsius.
          </p>
        )}

        {lastCity && (
          <button type="button" className="chip" onClick={onUseLastCity} disabled={disabled}>
            <ClockIcon size={14} />
            <span>
              Last searched: <strong>{lastCity}</strong>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
