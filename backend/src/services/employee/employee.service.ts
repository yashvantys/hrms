import { GraphQLError } from "graphql/error";
import { CreateEmployeeInput, EmployeeSearchInput, EmployeeSortField, UpdateEmployeeInput } from "../../graphql/generated/graphql";
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
    async getAllEmployee(input: EmployeeSearchInput) {
        return employeeRepository.employees(input)
    }
    async getEmployee(id: string) {
        return employeeRepository.employee(id)
    }
    async updateEmployee(id: string, input: Partial<UpdateEmployeeInput>) {
        const getEmployee = await employeeRepository.findById(id);
        if (!getEmployee) {
            throw new GraphQLError("Employee not found", {
                extensions: {
                    code: "NOT_FOUND",
                    http: {
                        status: 404,
                    },
                },
            });
        }
        return await employeeRepository.updateEmployee(id, input);
    }
    async deleteEmployee(id: string) {
        const getEmployee = await employeeRepository.findById(id);
        if (!getEmployee) {
            throw new GraphQLError("Employee not found", {
                extensions: {
                    code: "NOT_FOUND",
                    http: {
                        status: 404,
                    },
                },
            });
        }
        const employee = await employeeRepository.deleteEmployee(id);
        return {
            success: true,
            message: "Employee deleted successfully",
            deletedId: employee.id.toString(),
        };

    }
}

export default new EmployeeService()