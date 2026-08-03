import employeeService from "../../../services/employee/employee.service";
import { CreateEmployeeInput, UpdateEmployeeInput } from "../../generated/graphql";
import { requireAuth, requireRole } from "../../../utils/auth";
import { GraphQLContext } from "../../../types/context";
import { Role } from "../../../utils/auth";
import { GraphQLResolveInfo } from "graphql";
type CreateEmpArgs = {
  input: CreateEmployeeInput;
};

type UpdateEmpArgs = {
  id: string;
  input: UpdateEmployeeInput;
};

type EmployeesArgs = {
  first?: number;
  after?: string;
};
export const employeeResolver = {
  Query: {
    employees: (_: unknown, { first = 10, after }: EmployeesArgs, context: GraphQLContext, info: GraphQLResolveInfo) => {
      requireAuth(context);
      return employeeService.getAllEmployee(first, after)
    },
    employee: (_: unknown, { id }: { id: string }, context: GraphQLContext, info: GraphQLResolveInfo) => {
      requireAuth(context);
      return employeeService.getEmployee(id)
    }
  },
  Mutation: {
    createEmployee: (
      _: unknown,
      { input }: CreateEmpArgs,
      context: GraphQLContext
    ) => {
      requireAuth(context);
      requireRole(context, [Role.ADMIN]);
      return employeeService.createEmployee(input);
    },
    updateEmployee: (_: unknown,
      { id, input }: UpdateEmpArgs,
      context: GraphQLContext,
      info: GraphQLResolveInfo) => {     
      requireAuth(context);
      requireRole(context, [Role.ADMIN]);
      return employeeService.updateEmployee(id, input)
    },
    deleteEmployee: (_: unknown, { id }: { id: string }, context: GraphQLContext, info: GraphQLResolveInfo) => {
      requireAuth(context);
      requireRole(context, [Role.ADMIN]);
      return employeeService.deleteEmployee(id)
    }
  },
};