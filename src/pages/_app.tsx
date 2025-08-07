import React from "react";
import { AppProps } from "next/app";
import RootLayout from "./layout";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default App;
