export default function LoadingState() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="sr-only">Fetching the latest weather…</span>

      <div className="skeleton skeleton--hero" aria-hidden="true">
        <div className="skeleton__lines">
          <span className="skeleton__line skeleton__line--sm" />
          <span className="skeleton__line skeleton__line--xs" />
          <span className="skeleton__line skeleton__line--xl" />
          <span className="skeleton__line skeleton__line--md" />
        </div>
        <span className="skeleton__circle" />
      </div>

      <div className="skeleton-row" aria-hidden="true">
        {[0, 1, 2, 3].map((item) => (
          <span className="skeleton skeleton--tile" key={item} />
        ))}
      </div>

      <div className="skeleton-row skeleton-row--forecast" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((item) => (
          <span className="skeleton skeleton--day" key={item} />
        ))}
      </div>
    </div>
  );
}
