import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Loader } from "./components/Loader";
import { PrimeReactProvider } from "primereact/api";

//primeicons
import "primeicons/primeicons.css";

//primeflex
import "primeflex/primeflex.css";

//primereact themes - both light and dark
import "primereact/resources/themes/viva-light/theme.css";
import "primereact/resources/themes/viva-dark/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <PrimeReactProvider>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </PrimeReactProvider>
      </RecoilRoot>
    </ErrorBoundary>
  </StrictMode>
);
