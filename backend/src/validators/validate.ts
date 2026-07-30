import { ZodType, z } from "zod";
import { GraphQLError } from "graphql";

export function validate<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new GraphQLError("Validation failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        validationErrors: z.flattenError(result.error),
      },
    });
  }

  return result.data;
}
