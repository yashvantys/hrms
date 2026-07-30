import Fastify from "fastify";
import { ApolloServer } from "@apollo/server";
import fastifyApollo, { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { connectDB } from "./config/database.js";
import { verifyAccessToken } from "./utils/jwt.js";
import { GraphQLContext } from "./types/context";
import cors from "@fastify/cors";
import { Role } from "@prisma/client";


export async function buildApp() {
  const app = Fastify({
    logger: true,
  });
  // cors
  await app.register(cors, {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  });

  // Connect Database
  await connectDB();

  // Create Apollo Server
  const apollo = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: false,
    formatError: (formattedError, error) => {
      console.error(error);
      return formattedError;
    },

  });

  await apollo.start();
  const contextFunction: ApolloFastifyContextFunction<GraphQLContext> = async (request, reply) => {
    const context: GraphQLContext = {
      // add 
      user: null,
      // db: ...,
    };
    // extract and verify token
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      try {
        const payload = verifyAccessToken(token);
        if (payload) {
          context.user = {
            id: payload.id.toString(),
            email: payload.email,
            role: payload.role as Role
          };
        }
      } catch (err) {
        throw new Error("Invalid or expired token");
      }
    }

    return context;
  };
  // Register GraphQL
  await app.register(fastifyApollo(apollo), {
    path: "/graphql",
    context: contextFunction
  });

  return app;
}
