import authRepository from "../../repositories/auth.repository";
import bcrypt from "bcrypt";
import { CreateUserInput, LoginInput } from "../../graphql/generated/graphql";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;
class AuthService {
  async comparePassword(password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted);
  }
  async login(input: LoginInput) {
    const { email, password } = input;
    const response = await authRepository.getUserByEmail(email);
    if (
      !response ||
      !(await this.comparePassword(password, response?.password))
    ) {
      throw new GraphQLError("Email or password wrong!", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    const payload = {
      id: response.id,
      email: response.email,
    };
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
    return {
      accessToken,
    };
  }

  async createUser(input: CreateUserInput) {
    const existingUser = await authRepository.getUserByEmail(input.email);
    if (existingUser) {
      throw new GraphQLError("Email already exists", {
        extensions: {
          code: "BAD_USER_INPUT",
          http: { status: 409 },
        },
      });
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    return await authRepository.createUser({
      ...input,
      password: hashedPassword,
    });
  }
}

export default new AuthService();
