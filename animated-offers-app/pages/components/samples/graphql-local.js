import {Card, Image, RadioButton, Stack, Spinner, Frame} from "@shopify/polaris";
import * as realmHelper from "../../../helpers/mongodb-realm";
import {ApolloClient, gql, HttpLink, InMemoryCache, useQuery} from "@apollo/client";
import {useCallback, useState} from "react";


const localGraphQLClient = new ApolloClient({
  uri: `/api/graphql?shop=animated-offers-dev.myshopify.com`,
  cache: new InMemoryCache()
});

const GraphQLLocal = () => {

  const GET_USERS = gql`
  {
    getUsers {
      id
      login
    }
  }`;

  // // we pass custom client when making a query to local graphql server
  const {loading, error, data} = useQuery(GET_USERS, {client: localGraphQLClient});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Card sectioned title="GraphQL call to custom graphQL server in /pages/api/graphql folder">
      <b>Github username list (sample of calling external API):</b>
      <ul>
        {data.getUsers.map(user => (
          <li key={user.id}>
            {user.login}
          </li>
        ))}
      </ul>
    </Card>
  )
};

export default GraphQLLocal;
