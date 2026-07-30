import bcrypt from "bcrypt";
import env from "../config/env";
export const hashPassword = (password: string) =>
  bcrypt.hash(password, env.bcryptRounds);

export const comparePassword = (password: string, encrypted: string) => {
    return bcrypt.compare(password, encrypted);
  }