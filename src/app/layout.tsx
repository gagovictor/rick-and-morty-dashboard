"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useApolloClient } from '../lib/apolloClient'; // Adjust path if needed
import store from '../redux/store'; // Import your Redux store

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = useApolloClient(); // Hook to get Apollo Client instance

  return (
    <html>
      <head>
        <title>Rick and Morty Dashboard</title>
        {/* You can include other meta tags and link tags here */}
      </head>
      <body>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <div>{children}</div>
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default Layout;
