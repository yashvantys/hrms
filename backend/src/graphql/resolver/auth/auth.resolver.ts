import authService from "../../../services/auth/auth.service";
import { GraphQLContext } from "../../../types/context";
import { LoginInput, CreateUserInput } from "../../generated/graphql";

type LoginArgs = {
  input: LoginInput;
};
type CreateUserArgs = {
  input: CreateUserInput;
};
export const authResolvers = {
  Mutation: {
    login: async (_: unknown, { input }: LoginArgs) => {
      return await authService.login(input);
    },
    createUser: async (_: unknown, { input }: CreateUserArgs) => {
      return await authService.createUser(input);
    },
  },
  Query: {
    me: async (_: unknown, { }, context: GraphQLContext) => {     
      return context.user;
    }
  }
};
