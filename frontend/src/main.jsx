import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Loader } from "./components/Loader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </RecoilRoot>
    </ErrorBoundary>
  </StrictMode>
);
