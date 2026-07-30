import { GraphQLError } from "graphql";
import { GraphQLContext } from "../types/context.js";

export enum Role {
    ADMIN = "Admin",
    HR = "HR",
    MANAGER = "Manager",
    EMPLOYEE = "Employee",
}
export function requireAuth(context: GraphQLContext) {
    if (!context.user) {
        throw new GraphQLError("Authentication required", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    }
    return context.user;
}

export function getUser(context: GraphQLContext) {
    return context.user;
}

export function requireRole(context: GraphQLContext, roles: readonly Role[]) {
    const user = requireAuth(context);
    if (!roles.includes(user.role as Role)) {
        throw new GraphQLError("You don't have permission to perform this action", {
            extensions: {
                code: "FORBIDDEN",
                http: { status: 403 },
            },
        });
    }

    return user;
}