import ApolloClient from "@apollo/client";

// TODO: api version in line 8 to read from env vars
export const createClient = (shop, accessToken) => {
  console.log(`createClient called ======>`)
  return new ApolloClient({
    uri: `https://${shop}/admin/api/2021-07/graphql.json`,
    request: operation => {
      operation.setContext({
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "User-Agent": `shopify-app-node ${
            process.env.npm_package_version
          } | Shopify App CLI`
        }
      });
    }
  });
};
