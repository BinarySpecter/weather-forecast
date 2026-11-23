import { AlertIcon, RefreshIcon } from './Icons.jsx';

export default function ErrorBanner({ error, onRetry, canRetry }) {
  return (
    <div className="alert" role="alert">
      <span className="alert__icon" aria-hidden="true">
        <AlertIcon size={20} />
      </span>
      <div className="alert__body">
        <p className="alert__title">We couldn&rsquo;t load that weather</p>
        <p className="alert__message">{error?.message}</p>
      </div>
      {canRetry && (
        <button type="button" className="button button--ghost" onClick={onRetry}>
          <RefreshIcon size={16} />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
