import { AppProps } from 'next/app';
import Head from 'next/head';

import { Header } from '@components';
import { ThemeProvider } from '@providers/Theme.provider';

if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED === 'true') {
  require('./__mocks__');
}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Companies</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="viewport"
        content="initial-scale=1, viewport-fit=cover, user-scalable=no"
      />
    </Head>

    <ThemeProvider>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  </>
);

export default App;
