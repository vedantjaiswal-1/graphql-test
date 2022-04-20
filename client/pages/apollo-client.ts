import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }: any) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }: any) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/graphql" })]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
