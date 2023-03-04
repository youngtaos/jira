import AuthenticatedApp from "../src/AuthenticatedApp";
import { useAuth } from "context/auth-context";
import React from "react";
import UnauthenticatedApp from "unauthenticated-app";
import ErrorPage from "components/ErroPage";
import { ErrorBoundary } from "components/error-boundary.tsx";
import styles from "./App.module.scss";

function App() {
  const { user } = useAuth();
  return (
    <div className={styles.App}>
      <ErrorBoundary fallbackRender={ErrorPage}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
