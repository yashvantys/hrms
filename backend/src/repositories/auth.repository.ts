import { Prisma, User, Role as PrismaRole } from "@prisma/client";
import { prisma } from "../config/database";
import { CreateUserInput } from "../graphql/generated/graphql";

export class AuthRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
  async createUser(input: CreateUserInput): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...input,
      role: input.role as PrismaRole,
    };
    return prisma.user.create({ data });
  }
}

export default new AuthRepository();
