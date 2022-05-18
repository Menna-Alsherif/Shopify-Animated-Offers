import {Card, Image, RadioButton, Stack, Spinner, Frame,Heading} from "@shopify/polaris";
import GraphQLLocal from "./graphql-local";
import GraphqlRealm from "./graphql-realm";
import GraphQLShopify from "./graphql-shopify";
import RestLocal from "./rest-local";


const SampleList = () => {


  return (
    <>

      <p><b>Sample queries & API calls</b> <br/><br/></p>

      <GraphqlRealm/>
      <GraphQLShopify/>

      <GraphQLLocal/>

      <RestLocal/>

    </>)

}

export default SampleList;
