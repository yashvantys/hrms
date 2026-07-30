import { authResolvers } from "./resolver/auth/auth.resolver.js";

export const resolvers = {
  Mutation: {
    ...authResolvers.Mutation,
  },
  Query: {
    ...authResolvers.Query
  }
};