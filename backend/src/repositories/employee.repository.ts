import { Role as PrismaRole } from "@prisma/client";
import { prisma } from "../config/database";
import { CreateEmployeeInput, CreateUserInput } from "../graphql/generated/graphql";


export class EmployeeRepository {
    async findByEmail(email: string) {
        return prisma.employee.findUnique({ where: { email } })
    }

    async createEmployeeWithUser(userInput: CreateUserInput, employeeInput: CreateEmployeeInput) {
        return prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    ...userInput,
                    role: userInput.role as PrismaRole,
                },
            });
            const employeeCode = await this.generateEmployeeCode();
            const employee = await tx.employee.create({
                data: {
                    ...employeeInput,
                    employeeCode,
                    userId: user.id,
                },
            });

            return employee;
        });
    }
    async generateEmployeeCode() {
        const lastEmployee = await prisma.employee.findFirst({
            orderBy: {
                id: "desc",
            },
        });
        const nextId = lastEmployee ? lastEmployee.id + 1 : 1;
        return `EMP${String(nextId).padStart(4, "0")}`;
    }
}

export default new EmployeeRepository()