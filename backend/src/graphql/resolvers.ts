import { attendanceResolvers } from "./resolver/attendance/attendance.resolver.js";
import { authResolvers } from "./resolver/auth/auth.resolver.js";
import { departmentResolver } from "./resolver/department/department.resolver.js";
import { employeeResolver } from "./resolver/employee/employee.resolver.js";

export const resolvers = {
  Mutation: {
    ...authResolvers.Mutation,
    ...employeeResolver.Mutation,
    ...departmentResolver.Mutation,
    ...attendanceResolvers.Mutation
  },
  Query: {
    ...authResolvers.Query,
    ...employeeResolver.Query,
    ...departmentResolver.Query,
    ...attendanceResolvers.Query
  }
};