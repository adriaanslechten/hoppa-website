import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import RootLayout from "./layout";
import { AuthProvider } from "../contexts/AuthContext";
import { store } from "../store/store";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </AuthProvider>
    </Provider>
  );
}

export default App;
