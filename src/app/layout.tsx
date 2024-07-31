"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useApolloClient } from '../lib/apolloClient';
import store from '../redux/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = useApolloClient();

  return (
    <html lang="en">
      <head>
        <title>Rick and Morty Dashboard</title>
        {/* You can include other meta tags and link tags here */}
      </head>
      <body>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div>{children}</div>
            </ThemeProvider>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default Layout;
