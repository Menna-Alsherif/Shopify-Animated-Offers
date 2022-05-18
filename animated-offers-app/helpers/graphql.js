import { ApolloClient, InMemoryCache } from "@apollo/client";

export function getApolloClient() {
  return new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });
}
