import "@/styles/globals.scss";
import "@/styles/common.scss";
import "@/styles/component.scss";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import type { AppProps } from "next/app";
import Providers from "@/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}