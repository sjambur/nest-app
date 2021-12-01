import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetcher from 'isomorphic-fetch';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://nextjs-hasura-react.hasura.app/v1/graphql',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret':
          'OYYoX8f2b8hvRx1iYyv2QaHQOWJcFb32idbaZyb5RflTlbAqA9Wg7N6HYZBdn9ye',
      },
      fetchOptions: { fetch: fetcher },
    }),
    cache: new InMemoryCache(),
  });
};

let apolloClient;

export default function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ? apolloClient : createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
