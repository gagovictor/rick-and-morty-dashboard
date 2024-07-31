
import { ApolloClient, InMemoryCache } from '@apollo/client';

let apolloClient: ApolloClient<any> | undefined;

function createApolloClient() {
  return new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });
}

export function useApolloClient() {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
}