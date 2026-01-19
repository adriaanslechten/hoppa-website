import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import RootLayout from "./layout";
import { AuthProvider } from "../contexts/AuthContext";
import { store } from "../store/store";
import CookieConsent from "../components/CookieConsent";
import { usePageTracking } from "../analytics/hooks";
import "../styles/global.css";

function AppContent({ Component, pageProps }: AppProps) {
  // Track page views after analytics is initialized
  usePageTracking();

  return (
    <>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      <CookieConsent />
    </>
  );
}

function App(props: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
