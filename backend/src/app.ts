import Fastify from "fastify";
import { ApolloServer } from "@apollo/server";
import fastifyApollo from "@as-integrations/fastify";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { connectDB } from "./config/database.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Connect Database
  await connectDB();

  // Create Apollo Server
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: false,
    formatError: (formattedError, error) => {
      console.error(error);
      return formattedError;
    },
  });  

  await apollo.start();

  // Register GraphQL
  await app.register(fastifyApollo(apollo), {
    path: "/graphql",
  });

  return app;
}
