import authRepository from "../../repositories/auth.repository";
import { CreateUserInput, LoginInput } from "../../graphql/generated/graphql";
import { GraphQLError } from "graphql";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import {
  createUserSchema,
  loginUserSchema,
} from "../../validators/auth.validator";
import { validate } from "../../validators/validate";
class AuthService {
  async login(input: LoginInput) {
    const validateInput = validate(loginUserSchema, input);
    const { email, password } = validateInput;
    const response = await authRepository.getUserByEmail(email);
    if (!response || !(await comparePassword(password, response.password))) {
      throw new GraphQLError("Invalid email or password!", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    const payload = {
      id: response.id,
      email: response.email,
      role:response.role
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const user = {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      role: response.role,
    };
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async createUser(input: CreateUserInput) {
    const validatedInput = validate(createUserSchema, input);
    const existingUser = await authRepository.getUserByEmail(
      validatedInput.email,
    );
    if (existingUser) {
      throw new GraphQLError("Email already exists", {
        extensions: {
          code: "BAD_USER_INPUT",
          http: { status: 409 },
        },
      });
    }
    const hashedPassword = await hashPassword(input.password);
    return authRepository.createUser({
      ...input,
      password: hashedPassword,
    });
  }
}

export default new AuthService();
