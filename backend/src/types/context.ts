import { Role } from "@prisma/client";
export interface GraphQLContext {
    user: {
        id: string;
        email: string;
        role: Role;
    } | null;
}