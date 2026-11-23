const CLOUD_SHAPE = (
  <g>
    <circle cx="24" cy="33" r="8.5" />
    <circle cx="35" cy="27" r="11" />
    <circle cx="45" cy="34" r="8" />
    <rect x="21" y="33" width="26" height="10" rx="5" />
  </g>
);

function Cloud({ transform, opacity = 1 }) {
  return (
    <g transform={transform} style={{ fill: 'var(--cloud)' }} opacity={opacity}>
      {CLOUD_SHAPE}
    </g>
  );
}

function Moon({ transform }) {
  return (
    <g transform={transform}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" style={{ fill: 'var(--sun)' }} />
    </g>
  );
}

const SUN = (
  <>
    <g style={{ stroke: 'var(--sun)', fill: 'none' }} strokeWidth="3.2" strokeLinecap="round">
      <path d="M32 7.5v6.5M32 50v6.5M7.5 32H14M50 32h6.5M14.7 14.7l4.6 4.6M44.7 44.7l4.6 4.6M49.3 14.7l-4.6 4.6M19.3 44.7l-4.6 4.6" />
    </g>
    <circle cx="32" cy="32" r="12" style={{ fill: 'var(--sun)' }} />
  </>
);

const PARTLY_DAY = (
  <>
    <g style={{ stroke: 'var(--sun)', fill: 'none' }} strokeWidth="2.6" strokeLinecap="round">
      <path d="M41 7v4M41 33v4M26 22h4M52 22h4M30.4 11.4l2.8 2.8M48.8 29.8l2.8 2.8M51.6 11.4l-2.8 2.8M33.2 29.8l-2.8 2.8" />
    </g>
    <circle cx="41" cy="22" r="7.5" style={{ fill: 'var(--sun)' }} />
    <Cloud transform="translate(-6 8)" />
  </>
);

const PARTLY_NIGHT = (
  <>
    <Moon transform="translate(35 3) scale(1.15)" />
    <Cloud transform="translate(-6 8)" />
  </>
);

const RAIN = (
  <>
    <Cloud transform="translate(0 -7)" />
    <g style={{ stroke: 'var(--rain)', fill: 'none' }} strokeWidth="3.2" strokeLinecap="round">
      <path d="M24 43l-2.5 8M34 43l-2.5 8M44 43l-2.5 8" />
    </g>
  </>
);

const DRIZZLE = (
  <>
    <Cloud transform="translate(0 -7)" />
    <g style={{ stroke: 'var(--rain)', fill: 'none' }} strokeWidth="3" strokeLinecap="round">
      <path d="M28 43l-2 6M40 43l-2 6" />
    </g>
  </>
);

const SNOW = (
  <>
    <Cloud transform="translate(0 -7)" />
    <g style={{ stroke: 'var(--rain)', fill: 'none' }} strokeWidth="2.2" strokeLinecap="round">
      <path d="M24 44v7M20.5 47.5h7M36 44v7M32.5 47.5h7M48 44v7M44.5 47.5h7" />
    </g>
  </>
);

const THUNDER = (
  <>
    <Cloud transform="translate(0 -7)" />
    <path d="M34.5 39l-9 13h6.5l-3.5 10 11-14h-6.5l4-9Z" style={{ fill: 'var(--sun)' }} />
  </>
);

const MIST = (
  <>
    <g style={{ stroke: 'var(--cloud)', fill: 'none' }} strokeWidth="3.2" strokeLinecap="round">
      <path d="M16 24h22M26 33h22M14 42h24M28 51h20" />
    </g>
  </>
);

const CLOUD_ONLY = <Cloud transform="translate(0 -3)" />;

function resolveGlyph(conditionId, isDay) {
  if (!conditionId) return isDay ? SUN : <Moon transform="translate(3.3 3.3) scale(2.4)" />;
  if (conditionId >= 200 && conditionId < 300) return THUNDER;
  if (conditionId >= 300 && conditionId < 400) return DRIZZLE;
  if (conditionId >= 500 && conditionId < 600) return RAIN;
  if (conditionId >= 600 && conditionId < 700) return SNOW;
  if (conditionId >= 700 && conditionId < 800) return MIST;
  if (conditionId === 800) return isDay ? SUN : <Moon transform="translate(3.3 3.3) scale(2.4)" />;
  if (conditionId === 801 || conditionId === 802) return isDay ? PARTLY_DAY : PARTLY_NIGHT;
  return CLOUD_ONLY;
}

export default function WeatherIcon({ conditionId, icon, size = 'lg', label }) {
  const isDay = !icon || icon.endsWith('d');

  return (
    <svg
      className={`weather-icon weather-icon--${size}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      focusable="false"
    >
      {resolveGlyph(conditionId, isDay)}
    </svg>
  );
}
