import { AppProps } from 'next/app';
import Head from 'next/head';

import { Header } from '@components';
import { ThemeProvider } from '@providers/Theme.provider';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Companies</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
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
