import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import App from "next/app";
import {AppProvider as PolarisProvider} from "@shopify/polaris";
import {Provider as AppBridgeProvider, useAppBridge} from "@shopify/app-bridge-react";
import {authenticatedFetch} from "@shopify/app-bridge-utils";
import {Redirect} from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function ShopifyApolloProvider(props) {
  const app = useAppBridge();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: 'include',
      headers: {
        "Content-Type": "application/graphql"
      },
      fetch: userLoggedInFetch(app)
    })
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class ReactApp extends App {
  render() {
    const {Component, pageProps, host} = this.props;
    return (
      <PolarisProvider i18n={translations}>
        <AppBridgeProvider config={{apiKey: API_KEY, host: host, forceRedirect: true,}}>
          <ShopifyApolloProvider Component={Component} {...pageProps} />
        </AppBridgeProvider>
      </PolarisProvider>
    );
  }
}

ReactApp.getInitialProps = async ({ctx}) => {
  return {
    host: ctx.query.host,
  };
};

export default ReactApp;
