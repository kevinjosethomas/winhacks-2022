import { Fragment } from "react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "ui/styles/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </Fragment>
  );
}

export default App;
