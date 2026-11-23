import { useCallback, useEffect, useRef, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import SearchBar from './components/SearchBar.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import Forecast from './components/Forecast.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';
import EmptyState from './components/EmptyState.jsx';
import { fetchWeatherBundle } from './services/weatherApi.js';
import './App.css';

const LAST_CITY_KEY = 'skycast:last-city';
const THEME_KEY = 'skycast:theme';

function readStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function readStoredCity() {
  return localStorage.getItem(LAST_CITY_KEY) || '';
}

export default function App() {
  const [query, setQuery] = useState(readStoredCity);
  const [lastCity, setLastCity] = useState(readStoredCity);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState('');
  const [theme, setTheme] = useState(readStoredTheme);

  const requestRef = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const search = useCallback(async (rawCity) => {
    const city = String(rawCity ?? '').trim().replace(/\s+/g, ' ');

    if (!city) {
      setInputError('Enter a city name to search.');
      return;
    }

    setInputError('');
    setStatus('loading');
    setError(null);

    const requestId = requestRef.current + 1;
    requestRef.current = requestId;

    try {
      const bundle = await fetchWeatherBundle(city);
      if (requestId !== requestRef.current) return;

      setWeather(bundle.weather);
      setForecast(bundle.forecast);
      setStatus('ready');

      const resolvedCity = bundle.weather.city || city;
      setLastCity(resolvedCity);
      setQuery(resolvedCity);
      localStorage.setItem(LAST_CITY_KEY, resolvedCity);
      document.title = `${resolvedCity} · Skycast`;
    } catch (requestError) {
      if (requestId !== requestRef.current) return;
      setStatus('error');
      setError(requestError);
    }
  }, []);

  useEffect(() => {
    const storedCity = readStoredCity();
    if (storedCity) search(storedCity);
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(query);
  };

  const handleToggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const isLoading = status === 'loading';
  const canRetry = Boolean(lastCity || query.trim());

  return (
    <div
      className="app"
      data-condition={(weather?.condition?.main || 'default').toLowerCase()}
      data-status={status}
    >
      <div className="ambient" aria-hidden="true" />

      <div className="shell">
        <TopBar theme={theme} onToggleTheme={handleToggleTheme} />

        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            if (inputError) setInputError('');
          }}
          onSubmit={handleSubmit}
          disabled={isLoading}
          error={inputError}
          lastCity={lastCity}
          onUseLastCity={() => {
            setQuery(lastCity);
            search(lastCity);
          }}
        />

        <main className="content">
          {status === 'error' && error && (
            <ErrorBanner
              error={error}
              canRetry={canRetry}
              onRetry={() => search(lastCity || query)}
            />
          )}

          {isLoading && <LoadingState />}

          {status === 'idle' && <EmptyState onPick={search} />}

          {weather && status === 'ready' && (
            <>
              <CurrentWeather weather={weather} />
              <StatsGrid weather={weather} />
              {forecast && <Forecast forecast={forecast} />}
            </>
          )}
        </main>

        <footer className="footer">
          <span>Weather data by OpenWeatherMap</span>
          <span className="footer__dot" aria-hidden="true" />
          <span>Skycast · Full stack demo</span>
        </footer>
      </div>
    </div>
  );
}
