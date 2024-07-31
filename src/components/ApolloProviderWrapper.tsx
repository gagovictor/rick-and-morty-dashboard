"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from '../lib/apolloClient';

const ApolloProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = useApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
