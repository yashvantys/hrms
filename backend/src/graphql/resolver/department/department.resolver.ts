import departmentService from "../../../services/department/department.service";
import { GraphQLContext } from "../../../types/context";
import { requireAuth } from "../../../utils/auth";
import { GraphQLResolveInfo } from "graphql";
import { CreateDepartmentInput, UpdateDepartmentInput } from "../../generated/graphql";

export const departmentResolver = {
    Query: {
        departments: (_: unknown, __: unknown, context: GraphQLContext, info: GraphQLResolveInfo) => {
            requireAuth(context);
            return departmentService.getAllDepartments()
        },
        department: (_: unknown, { id }: { id: string }, context: GraphQLContext, info: GraphQLResolveInfo) => {
            requireAuth(context);
            return departmentService.getDepartment(id)
        }
    },
    Mutation: {
        createDepartment: (_: unknown, { input }: { input: CreateDepartmentInput }, context: GraphQLContext, info: GraphQLResolveInfo) => {
            requireAuth(context);
            return departmentService.createDepartment(input)
        },
        updateDepartment: (_: unknown, { id, input }: { id: string, input: UpdateDepartmentInput }, context: GraphQLContext, info: GraphQLResolveInfo) => {
            requireAuth(context);
            return departmentService.updateDepartment(id, input)
        },
        deleteDepartment: (_: unknown, { id }: { id: string }, context: GraphQLContext, info: GraphQLResolveInfo) => {
            requireAuth(context);
            return departmentService.deleteDepartment(id)
        }
    }

}