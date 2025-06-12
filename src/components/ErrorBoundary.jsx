import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

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
      <style jsx>{`
        .error-boundary {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 20px;
        }
        .error-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          text-align: center;
        }
        h2 {
          color: #dc3545;
          margin-bottom: 1rem;
        }
        .error-details {
          margin-top: 1rem;
        }
        .error-message {
          color: #6c757d;
          margin-bottom: 1.5rem;
          font-family: monospace;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
        }
        .retry-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s;
        }
        .retry-button:hover {
          background-color: #0056b3;
        }
      `}</style>
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
