import { MoonIcon, SunIcon } from './Icons.jsx';

export default function TopBar({ theme, onToggleTheme }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand__mark" aria-hidden="true">
          <SunIcon size={20} />
        </span>
        <span className="brand__text">
          <span className="brand__name">Skycast</span>
          <span className="brand__tag">Weather forecast</span>
        </span>
      </div>

      <div className="topbar__actions">
        <span className="unit-pill" title="All temperatures are shown in Celsius">
          °C
        </span>
        <button
          type="button"
          className="icon-button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
      </div>
    </header>
  );
}
