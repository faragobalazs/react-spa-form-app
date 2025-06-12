import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import "./ErrorBoundary.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary">
      <div className="error-content">
        <h2>Oops! Something went wrong</h2>
        <div className="error-details">
          <p className="error-message">{error.message}</p>
          <button onClick={resetErrorBoundary} className="retry-button">
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
