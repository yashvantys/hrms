import employeeService from "../../../services/employee/employee.service";
import { CreateEmployeeInput } from "../../generated/graphql";
import { requireAuth, requireRole } from "../../../utils/auth";
import { GraphQLContext } from "../../../types/context";
import { Role } from "../../../utils/auth";
type CreateEmpArgs = {
  input: CreateEmployeeInput;
};

export const employeeResolver = {
  Query: {},
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
  },
};