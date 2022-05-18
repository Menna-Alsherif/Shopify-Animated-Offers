import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import schema from "./schema/graphQLSchema";

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
