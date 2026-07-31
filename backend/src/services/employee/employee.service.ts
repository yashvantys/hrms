import { GraphQLError } from "graphql/error";
import { CreateEmployeeInput } from "../../graphql/generated/graphql";
import employeeRepository from "../../repositories/employee.repository";
import { createEmployeeSchema } from "../../validators/employee.validator";
import { validate } from "../../validators/validate";
import { hashPassword } from "../../utils/password";
import { CreateUserInput, Role } from "../../graphql/generated/graphql";

class EmployeeService {
    async createEmployee(input: CreateEmployeeInput) {
        try {
            const employeeData = validate(createEmployeeSchema, input);
            const existingEmail = await employeeRepository.findByEmail(employeeData.email);
            if (existingEmail) {
                throw new GraphQLError("Employee email already exists");
            }
            const hashedPassword = await hashPassword("Welcome@123");
            const userData: CreateUserInput = {
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                email: employeeData.email,
                password: hashedPassword,
                role: Role.Employee,
            };
            return employeeRepository.createEmployeeWithUser(
                userData,
                employeeData
            );
        } catch (error) {
            throw error;
        }
    }
}

export default new EmployeeService()