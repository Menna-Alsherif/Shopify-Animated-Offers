import "isomorphic-fetch";
import {gql} from "@apollo/client";

import Shopify  from "@shopify/shopify-api";

export const registerScriptTag = async (ctx) => {

  const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  const SCRIPT_GET = gql `{
          scriptTags(first:10) {
            edges {
              node {
                id
              }
            }
          }
        }`;


  const getRes = await client.query({data: SCRIPT_GET});

  console.log('==============')
  console.log(getRes)
  console.log('===============')

  return {};


  const SCRIPT_CREATE = gql`
      mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
          scriptTag {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
  `;


  // return await client
  //   .mutate({
  //     mutation: SCRIPT_CREATE ,
  //   })
  //   .then((response) => response.data);
};
