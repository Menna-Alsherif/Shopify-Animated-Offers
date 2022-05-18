import {Card, Image, RadioButton, Stack, Spinner, Frame} from "@shopify/polaris";
import * as realmHelper from "../../../helpers/mongodb-realm";
import {gql, useQuery} from "@apollo/client";
import {useCallback, useState} from "react";


const GraphQLShopify = () => {

  const GET_PRODUCTS = gql`
    {
      products(first:5){
        edges{
          node{
            id
            title
          }
        }
      }
    }`;

  // we don't pass custom client as the app use Shopify Apollo provider which contains a default query for all components
  const {loading, error, data} = useQuery(GET_PRODUCTS);


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      <Card sectioned title="GraphQL call to shopify graphQL endpoint">
        <b>product list:</b>
        <ul>
          {data.products.edges.map(product => (
            <li key={product.node.id}>
              {product.node.title}
            </li>
          ))}
        </ul>
      </Card>
  )
};

export default GraphQLShopify;
