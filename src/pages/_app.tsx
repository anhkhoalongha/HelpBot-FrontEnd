import '@/styles/Fonts.css';
import '@/styles/App.css';
import '@/styles/Contact.css';
import 'react-calendar/dist/Calendar.css';
import '@/styles/MiniCalendar.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import theme from '@/theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Horizon UI Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="@/theme-color" content="#000000" />
      </Head>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default MyApp;
