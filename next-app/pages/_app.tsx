
"use client";
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import DrawerAppBar from '../components/ResponsiveAppBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';

//Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const navItems = [{ text: 'Home', href: '/' }, { text: 'Saved Companies', href: '/companies' }];

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DrawerAppBar navItems={navItems} />
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <ToastContainer position='bottom-right' hideProgressBar />
        </ThemeProvider>
      </CacheProvider>
  );
}


